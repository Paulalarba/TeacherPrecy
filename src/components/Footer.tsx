interface FooterProps {
  brand: {
    name: string;
    person: string;
    identity: string;
  };
}

export function Footer({ brand }: FooterProps) {
  return (
    <footer className="footer reveal-on-scroll">
      <div className="container footer-inner">
        <span>{brand.name}, {brand.person}</span>
        <span>{brand.identity}</span>
      </div>
    </footer>
  );
}
