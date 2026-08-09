const LINKS = [
  { label: "channel: linkedin", href: "https://linkedin.com" },
  { label: "channel: dribbble", href: "https://dribbble.com" },
  { label: "channel: email", href: "mailto:hello@arivoss.com" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-8 sm:px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div
          data-inspect="brand: logo"
          className="flex items-center gap-2 text-[13px] font-semibold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-mint" />
          Ari Voss
        </div>

        <div
          data-inspect="content: status"
          className="font-mono text-[11px] text-ink-soft"
        >
          status: <span className="text-mint">available</span> · based in
          remote · replies within 1 business day
        </div>

        <nav
          data-inspect="content: footer-links"
          className="flex items-center gap-4 font-mono text-[11px] text-ink-soft"
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-select transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
