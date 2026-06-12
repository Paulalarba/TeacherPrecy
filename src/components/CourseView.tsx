import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Play, BookOpen, FileText } from "lucide-react";
import { content } from "../data";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface CourseViewProps {
  user: { name: string; email: string } | null;
}

export function CourseView({ user }: CourseViewProps) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [videoFinished, setVideoFinished] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

  const course = content.academy.find((c) => c.id === courseId);
  const lessons = course?.lessons || [];
  const currentLesson = lessons[currentLessonIndex];

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [currentLessonIndex]);

  const initPlayer = () => {
    if (!currentLesson) return;
    
    // Clear previous iframe if any
    if (iframeRef.current) {
      iframeRef.current.innerHTML = '<div id="youtube-player"></div>';
    }

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "100%",
      width: "100%",
      videoId: currentLesson.youtubeId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onStateChange: (event: any) => {
          // YT.PlayerState.ENDED is 0
          if (event.data === 0) {
            setVideoFinished(true);
          }
        },
      },
    });
  };

  const handleQuizSubmit = () => {
    if (quizAnswer === null) return;
    
    setQuizSubmitted(true);
    if (quizAnswer === currentLesson.quiz.correctAnswer) {
      setQuizPassed(true);
    } else {
      setQuizPassed(false);
    }
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setVideoFinished(false);
      setQuizAnswer(null);
      setQuizSubmitted(false);
      setQuizPassed(false);
    } else {
      // Course complete
      navigate("/dashboard");
    }
  };

  if (!course || !currentLesson) {
    return (
      <div className="container" style={{ paddingBlock: "var(--space-12)", textAlign: "center" }}>
        <h2>Course not found</h2>
        <Link to="/academy" className="btn btn-primary">Back to Academy</Link>
      </div>
    );
  }

  return (
    <div className="course-view-container">
      <div className="course-header">
        <div className="container">
          <Link to="/dashboard" className="back-link">
            <ChevronLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="course-info">
            <span className="eyebrow">{course.category}</span>
            <h1>{course.title}</h1>
            <div className="course-progress-wrapper">
              <div className="progress-label">
                <span>Course Progress</span>
                <span>{Math.round(((currentLessonIndex + (quizPassed ? 1 : 0)) / lessons.length) * 100)}%</span>
              </div>
              <div className="course-progress-bar">
                <div 
                  className="course-progress-fill" 
                  style={{ width: `${((currentLessonIndex + (quizPassed ? 1 : 0)) / lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="course-content container">
        {!user && (
          <div className="login-reminder-banner reveal-in">
            <div className="reminder-icon">
              <AlertCircle size={20} />
            </div>
            <div className="reminder-text">
              <strong>Progress not being saved</strong>
              <p>Sign in to your account to save your course progress and earn your certificate.</p>
            </div>
            <Link to="/portal" className="btn btn-primary" style={{ padding: "8px 16px", minHeight: "36px", fontSize: "14px" }}>
              Sign In / Register
            </Link>
          </div>
        )}
        <div className="course-grid">
          {/* Main Player Area */}
          <div className="player-column">
            <div className="video-aspect-ratio" ref={iframeRef}>
              <div id="youtube-player"></div>
            </div>

            <div className="lesson-meta">
              <h2>{currentLesson.title}</h2>
              <div className="lesson-nav-controls">
                <button 
                  className="btn btn-quiet" 
                  disabled={currentLessonIndex === 0}
                  onClick={() => setCurrentLessonIndex(prev => prev - 1)}
                >
                  <ChevronLeft size={18} />
                  <span>Previous</span>
                </button>
                
                <button 
                  className="btn btn-primary" 
                  disabled={!quizPassed}
                  onClick={nextLesson}
                  title={!quizPassed ? "Complete the quiz to proceed" : ""}
                >
                  <span>{currentLessonIndex === lessons.length - 1 ? "Finish Course" : "Next Topic"}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {currentLesson.transcript && (
              <div className="lesson-transcript">
                <div className="transcript-header">
                  <FileText size={16} />
                  <span>Lesson Transcript & Notes</span>
                </div>
                <div className="transcript-content">
                  {currentLesson.transcript}
                </div>
              </div>
            )}

            {/* Quiz Section */}
            {(videoFinished || quizPassed) && (
              <div className={`quiz-panel reveal-in ${quizPassed ? 'passed' : ''}`}>
                <div className="quiz-header">
                  <BookOpen size={20} />
                  <h3>Knowledge Check</h3>
                </div>
                
                {!quizPassed ? (
                  <div className="quiz-body">
                    <p className="question">{currentLesson.quiz.question}</p>
                    <div className="options-grid">
                      {currentLesson.quiz.options.map((option, idx) => (
                        <button
                          key={idx}
                          className={`option-btn ${quizAnswer === idx ? 'selected' : ''}`}
                          onClick={() => {
                            setQuizAnswer(idx);
                            setQuizSubmitted(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {quizSubmitted && !quizPassed && (
                      <div className="quiz-feedback error">
                        <AlertCircle size={16} />
                        <span>Incorrect answer. Please try again!</span>
                      </div>
                    )}
                    
                    <button 
                      className="btn btn-primary quiz-submit" 
                      onClick={handleQuizSubmit}
                      disabled={quizAnswer === null}
                    >
                      Submit Answer
                    </button>
                  </div>
                ) : (
                  <div className="quiz-body passed-state">
                    <div className="success-message">
                      <CheckCircle2 size={32} />
                      <h4>Well done!</h4>
                      <p>You've correctly answered the quiz and can now proceed to the next topic.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {!videoFinished && !quizPassed && (
              <div className="video-lock-hint">
                <Play size={16} />
                <span>Complete the video to unlock the mini-quiz</span>
              </div>
            )}
          </div>

          {/* Sidebar Lesson List */}
          <aside className="lesson-sidebar">
            <div className="sidebar-header">
              <h3>Course Content</h3>
              <p>{lessons.length} Lessons</p>
            </div>
            <div className="lesson-list">
              {lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  className={`lesson-item ${idx === currentLessonIndex ? 'active' : ''} ${idx < currentLessonIndex ? 'completed' : ''}`}
                  onClick={() => idx <= currentLessonIndex && setCurrentLessonIndex(idx)}
                  disabled={idx > currentLessonIndex && !quizPassed}
                >
                  <div className="lesson-status">
                    {idx < currentLessonIndex ? (
                      <CheckCircle2 size={16} className="icon-completed" />
                    ) : idx === currentLessonIndex ? (
                      <Play size={16} className="icon-active" />
                    ) : (
                      <div className="dot" />
                    )}
                  </div>
                  <div className="lesson-info">
                    <span className="lesson-num">Topic {idx + 1}</span>
                    <span className="lesson-title">{lesson.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .course-view-container {
          min-height: 100vh;
          background: var(--paper);
          padding-bottom: var(--space-20);
        }
        
        .login-reminder-banner {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          background: rgba(47, 111, 235, 0.05);
          border: 1px solid var(--signal);
          border-radius: var(--radius-md);
          padding: var(--space-4) var(--space-6);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }
        
        .reminder-icon {
          width: 40px;
          height: 40px;
          background: var(--signal);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .reminder-text {
          flex: 1;
          min-width: 250px;
        }
        
        .reminder-text strong {
          display: block;
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--signal);
          margin-bottom: 2px;
        }
        
        .reminder-text p {
          font-size: var(--text-sm);
          color: var(--voice);
          margin: 0;
        }
        
        .course-header {
          padding-block: var(--space-8);
          border-bottom: 1px solid var(--line);
          background: var(--paper);
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--voice);
          text-decoration: none;
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
          transition: color 0.2s;
        }
        
        .back-link:hover {
          color: var(--ink);
        }
        
        .course-info h1 {
          font-size: var(--text-h2);
          font-family: var(--font-editorial);
          margin-top: var(--space-1);
        }

        .course-progress-wrapper {
          margin-top: var(--space-4);
          max-width: 300px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-xs);
          color: var(--voice);
          margin-bottom: 4px;
          font-weight: 500;
        }

        .course-progress-bar {
          height: 6px;
          background: var(--line);
          border-radius: 10px;
          overflow: hidden;
        }

        .course-progress-fill {
          height: 100%;
          background: var(--signal);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .course-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: var(--space-8);
          margin-top: var(--space-8);
        }
        
        @media (max-width: 992px) {
          .course-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .video-aspect-ratio {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 */
          height: 0;
          overflow: hidden;
          border-radius: var(--radius-md);
          background: #000;
          box-shadow: var(--shadow-md);
        }
        
        .video-aspect-ratio iframe,
        .video-aspect-ratio #youtube-player {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .lesson-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--space-6);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--line);
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        
        .lesson-meta h2 {
          font-size: var(--text-xl);
          font-weight: 600;
        }
        
        .lesson-transcript {
          margin-top: var(--space-6);
          padding: var(--space-4) var(--space-6);
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        
        .transcript-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--voice);
          margin-bottom: var(--space-3);
          font-weight: 600;
        }
        
        .transcript-content {
          font-size: var(--text-base);
          line-height: 1.6;
          color: var(--ink);
          font-style: italic;
        }
        
        .lesson-nav-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-3);
        }
        
        .quiz-panel {
          margin-top: var(--space-8);
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        
        .quiz-panel.passed {
          border-color: var(--success);
          background: rgba(22, 163, 74, 0.02);
        }
        
        .quiz-header {
          padding: var(--space-4) var(--space-6);
          background: var(--line);
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          color: var(--ink);
        }
        
        .quiz-body {
          padding: var(--space-6);
          color: var(--ink);
        }
        
        .question {
          font-size: var(--text-lg);
          font-weight: 500;
          margin-bottom: var(--space-6);
          color: var(--ink);
        }
        
        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: var(--space-6);
        }
        
        .option-btn {
          text-align: left;
          padding: var(--space-4) var(--space-6);
          border: 1px solid var(--line);
          border-radius: var(--radius-sm);
          background: var(--paper);
          color: var(--ink);
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          font-size: var(--text-base);
        }
        
        .option-btn:hover {
          background: var(--line);
        }
        
        .option-btn.selected {
          border-color: var(--signal);
          background: rgba(47, 111, 235, 0.05);
          color: var(--signal);
          font-weight: 500;
        }
        
        .quiz-submit {
          width: 100%;
        }
        
        .quiz-feedback {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-4);
          font-size: var(--text-sm);
        }
        
        .quiz-feedback.error {
          background: rgba(220, 38, 38, 0.05);
          color: var(--danger);
          border: 1px solid rgba(220, 38, 38, 0.1);
        }
        
        .passed-state {
          text-align: center;
          padding-block: var(--space-8);
        }
        
        .success-message {
          color: var(--success);
        }
        
        .success-message h4 {
          font-size: var(--text-xl);
          margin-top: var(--space-4);
        }
        
        .success-message p {
          color: var(--voice);
          margin-top: var(--space-2);
        }
        
        .video-lock-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: var(--space-8);
          padding: var(--space-6);
          border: 2px dashed var(--line);
          border-radius: var(--radius-md);
          color: var(--voice);
          font-style: italic;
        }
        
        .lesson-sidebar {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          height: fit-content;
          position: sticky;
          top: var(--space-8);
        }
        
        .sidebar-header {
          padding: var(--space-6);
          border-bottom: 1px solid var(--line);
        }
        
        .sidebar-header h3 {
          font-weight: 600;
          margin: 0;
        }
        
        .sidebar-header p {
          font-size: var(--text-xs);
          color: var(--voice);
          margin: 4px 0 0 0;
        }
        
        .lesson-list {
          display: flex;
          flex-direction: column;
        }
        
        .lesson-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: var(--space-4) var(--space-6);
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s;
          border-bottom: 1px solid var(--line);
        }
        
        .lesson-item:last-child {
          border-bottom: none;
        }
        
        .lesson-item:hover:not(:disabled) {
          background: var(--line);
        }
        
        .lesson-item.active {
          background: rgba(47, 111, 235, 0.03);
          border-left: 3px solid var(--signal);
        }
        
        .lesson-item.completed {
          opacity: 0.8;
        }
        
        .lesson-item:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        .lesson-status {
          flex-shrink: 0;
        }
        
        .icon-completed {
          color: var(--success);
        }
        
        .icon-active {
          color: var(--signal);
        }
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--line);
          margin: 4px;
        }
        
        .lesson-info {
          display: flex;
          flex-direction: column;
        }
        
        .lesson-num {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--voice);
        }
        
        .lesson-title {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--ink);
        }
        
        .reveal-in {
          animation: revealIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes revealIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
