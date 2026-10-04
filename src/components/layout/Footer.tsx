//src/components/layout/Footer.tsx

import { Logo } from "../common/Logo";

import { FOOTER_COLUMNS, ONLINE_TOOLS, POPULAR_HANDBOOKS } from "../../constants/footerLinks";
import {
  COPYRIGHT,
  SOCIAL_LINKS,
  TAGLINE,
  type SocialIconKey,
} from "../../constants/site";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-slate-300 pt-14 pb-8">
      <div className="shell">
        {/* ---------- Main grid: brand + three link columns ---------- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 footer-grid">
          {/* Brand block */}
          <div>
            <a href="#" className="flex items-center gap-2">
              <Logo variant="footer" />
            </a>
            <p className="italic text-slate-400 text-sm mt-3">{TAGLINE}</p>

            <p className="text-slate-400 text-xs font-bold tracking-wide mt-8 mb-3">
              FOLLOW US ON
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Titled link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4 className="text-white font-bold text-sm tracking-wide mb-4">
                {column.heading}
              </h4>
              <ul className="space-y-3 text-[14.5px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={
                        link.emphasis
                          ? "text-white font-semibold"
                          : "hover:text-white transition"
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------- Popular handbooks ---------- */}
        <PipeLinkRow heading="POPULAR HANDBOOKS" links={POPULAR_HANDBOOKS} />

        {/* ---------- Online tools ---------- */}
        <PipeLinkRow heading="ONLINE TOOLS" links={ONLINE_TOOLS} />

        {/* ---------- Copyright ---------- */}
        <p className="text-center text-slate-500 text-xs pt-8">{COPYRIGHT}</p>
      </div>
    </footer>
  );
}



interface PipeLinkRowProps {
  heading: string;
  links: readonly { label: string; href: string }[];
}

function PipeLinkRow({ heading, links }: PipeLinkRowProps) {
  return (
    <div className="py-8 border-b border-white/10">
      <h4 className="text-white font-bold text-sm tracking-wide mb-4">
        {heading}
      </h4>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]">
        {links.map((link, index) => (
          <span key={link.label} className="flex items-center gap-x-6">
            {index > 0 && <span className="text-white/20">|</span>}
            <a href={link.href} className="hover:text-white transition">
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}



function SocialIcon({ name }: { name: SocialIconKey }) {
  const common = {
    className: "w-4 h-4",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z" />
        </svg>
      );

    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.5v1.6h.05c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7.1 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
        </svg>
      );

    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .24 2.4.4.6.24 1 .53 1.5 1a4 4 0 011 1.5c.16.4.34 1.2.4 2.4.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.24 2-.4 2.4a4 4 0 01-1 1.5 4 4 0 01-1.5 1c-.4.16-1.2.34-2.4.4-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.24-2.4-.4a4 4 0 01-1.5-1 4 4 0 01-1-1.5c-.16-.4-.34-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.24-2 .4-2.4a4 4 0 011-1.5 4 4 0 011.5-1c.4-.16 1.2-.34 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.5a6.3 6.3 0 100 12.6 6.3 6.3 0 000-12.6zm0 10.4a4.1 4.1 0 110-8.2 4.1 4.1 0 010 8.2zm6.5-10.6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
        </svg>
      );
  }
}