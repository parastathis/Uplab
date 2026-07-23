import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-night pb-[4.5rem] pt-chapter text-porcelain">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-verse px-[clamp(1.2rem,4vw,4.5rem)] md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo.png"
            alt="Uplab Pharmaceuticals"
            className="h-8 w-auto [filter:brightness(0)_invert(1)]"
          />
          <p className="mt-breath max-w-[36ch] text-[0.85rem] leading-relaxed text-porcelain/55">
            Uplab Pharmaceuticals — 10ο χλμ Ε.Ο. Αθηνών-Λαμίας, Μεταμόρφωση, Αττική 14452
          </p>
          <p className="mt-breath text-[0.85rem] text-porcelain/55">
            <a href="tel:+302102844333" className="hover:text-porcelain">+30 210 28 44 333</a>
            {" · "}
            <a href="mailto:info@uplab.gr" className="hover:text-porcelain">info@uplab.gr</a>
          </p>
        </div>

        <nav aria-label="Πλοήγηση υποσέλιδου">
          <p className="caption-tag !text-porcelain/60">Εξερεύνηση</p>
          <ul className="mt-line space-y-breath text-[0.88rem] text-porcelain/70">
            <li><Link className="hover:text-porcelain" href="/proionta">Προϊόντα</Link></li>
            <li><Link className="hover:text-porcelain" href="/etaireia">Η εταιρεία</Link></li>
            <li><Link className="hover:text-porcelain" href="/nea">Νέα</Link></li>
            <li><Link className="hover:text-porcelain" href="/simeia-polisis">Σημεία πώλησης</Link></li>
            <li><Link className="hover:text-porcelain" href="/epikoinonia">Επικοινωνία</Link></li>
          </ul>
        </nav>

        <div>
          <p className="caption-tag !text-porcelain/60">Ακολουθήστε μας</p>
          <ul className="mt-line space-y-breath text-[0.88rem] text-porcelain/70">
            <li><a className="hover:text-porcelain" href="https://www.facebook.com/Uplab-Ltd-943326059039353/" rel="noopener noreferrer" target="_blank">Facebook</a></li>
            <li><a className="hover:text-porcelain" href="https://www.instagram.com/uplab_ltd/" rel="noopener noreferrer" target="_blank">Instagram</a></li>
            <li><a className="hover:text-porcelain" href="https://www.linkedin.com/in/uplab-ltd-008667109/" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-chapter flex max-w-6xl flex-wrap items-center justify-between gap-line border-t border-porcelain/10 px-[clamp(1.2rem,4vw,4.5rem)] pt-line text-[0.72rem] text-porcelain/65">
        <p>© {new Date().getFullYear()} Uplab ΕΠΕ. Με επιφύλαξη παντός δικαιώματος.</p>
        <p>
          <Link className="hover:text-porcelain" href="/politiki-aporritou">Πολιτική απορρήτου</Link>
          {" · "}
          <Link className="hover:text-porcelain" href="/politiki-cookies">Πολιτική cookies</Link>
        </p>
      </div>

      {/* ΕΣΠΑ — legal requirement, discreet fixed placement */}
      <a
        href="/espa"
        className="fixed bottom-0 right-0 z-40 flex items-center gap-2 rounded-tl-md bg-porcelain px-3 py-1.5 text-[0.62rem] text-ink shadow-[0_-2px_12px_rgba(27,42,58,0.18)]"
      >
        <span className="font-semibold tracking-wide">ΕΣΠΑ 2014–2020</span>
        <span className="text-ink/75">Με τη συγχρηματοδότηση της Ε.Ε.</span>
      </a>
    </footer>
  );
}
