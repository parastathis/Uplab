import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Επικοινωνήστε με την Uplab Pharmaceuticals — τηλέφωνο, email, διεύθυνση.",
};

export default function ContactPage() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] pb-act lg:grid-cols-[1fr_1.1fr]">
        <header>
          <p className="caption-tag">Επικοινωνία</p>
          <h1 className="display-lg mt-hair text-ink">Ας μιλήσουμε.</h1>
          <dl className="mt-chapter space-y-stanza text-[0.95rem]">
            <div>
              <dt className="caption-tag">Τηλέφωνο</dt>
              <dd className="mt-hair"><a className="text-ink hover:text-slate" href="tel:+302102844333">+30 210 28 44 333</a></dd>
            </div>
            <div>
              <dt className="caption-tag">Fax</dt>
              <dd className="mt-hair text-ink/75">+30 210 28 13 466</dd>
            </div>
            <div>
              <dt className="caption-tag">Email</dt>
              <dd className="mt-hair"><a className="text-ink hover:text-slate" href="mailto:info@uplab.gr">info@uplab.gr</a></dd>
            </div>
            <div>
              <dt className="caption-tag">Διεύθυνση</dt>
              <dd className="mt-hair leading-relaxed text-ink/75">
                10ο χλμ Ε.Ο. Αθηνών-Λαμίας
                <br />
                Μεταμόρφωση, Αττική 14452
              </dd>
            </div>
          </dl>
        </header>

        {/* mailto-backed form: no backend yet — the submit opens a prefilled email */}
        <form action="mailto:info@uplab.gr" method="get" className="border border-ink/10 bg-bone p-stanza" style={{ borderRadius: "0.5rem 2.4rem 0.5rem 0.5rem" }}>
          <p className="caption-tag">Φόρμα μηνύματος</p>
          <div className="mt-line space-y-line">
            <label className="block">
              <span className="text-[0.82rem] text-mist">Θέμα</span>
              <input name="subject" required className="mt-hair w-full border-b border-ink/20 bg-transparent py-breath text-ink outline-none transition-colors focus:border-ink" />
            </label>
            <label className="block">
              <span className="text-[0.82rem] text-mist">Μήνυμα</span>
              <textarea name="body" rows={6} required className="mt-hair w-full border-b border-ink/20 bg-transparent py-breath text-ink outline-none transition-colors focus:border-ink" />
            </label>
          </div>
          <button
            type="submit"
            className="mt-stanza rounded-full bg-amber px-[1.6em] py-[0.7em] text-[0.85rem] text-ink-black transition-colors duration-300 hover:bg-amber-bright"
            style={{ fontWeight: 560 }}
          >
            Αποστολή μέσω email
          </button>
          <p className="mt-line text-[0.72rem] text-mist">
            Η φόρμα ανοίγει το πρόγραμμα email σας — δεν αποθηκεύουμε δεδομένα στον ιστότοπο.
          </p>
        </form>
      </div>
    </div>
  );
}
