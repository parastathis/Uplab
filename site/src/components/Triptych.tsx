import Link from 'next/link';
import styles from './Triptych.module.css';
import { products } from '@/lib/content';

/* Chapter 6 — three real micro-worlds. Kidzlab playful, Femlab soft, Anagent focused. */
const worlds = [
  {
    id: 'kidzlab',
    name: 'KidzLab',
    mood: 'Παιδική φροντίδα',
    text: 'Η παιδική σειρά της Uplab — βιταμίνες και φροντίδα σχεδιασμένες για τους μικρούς μας φίλους.',
    href: '/proionta?family=Kidzlab',
    items: products.filter(p => p.family.includes('Kidzlab')),
  },
  {
    id: 'femlab',
    name: 'FemLab',
    mood: 'Γυναικολογική φροντίδα',
    text: 'Απαλή, τεκμηριωμένη φροντίδα για τη γυναικεία υγεία, σε κάθε ηλικία.',
    href: '/proionta?family=Femlab',
    items: products.filter(p => p.family.includes('Femlab')),
  },
  {
    id: 'anagent',
    name: 'Anagent',
    mood: 'Στοχευμένη φροντίδα',
    text: 'Ένα σκεύασμα με συγκεκριμένη αποστολή — δείτε τη σύνθεση και τη χρήση του.',
    href: `/proionta/${encodeURIComponent(products.find(p => p.name === 'Anagent')?.slug ?? '')}`,
    items: products.filter(p => p.name === 'Anagent'),
  },
];

export function Triptych() {
  return (
    <section className={`section ${styles.section}`} aria-label="Οι σειρές μας">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">Οι σειρές μας</p>
          <h2 className={styles.title}>Τρεις μικροί κόσμοι</h2>
        </div>

        <div className={styles.grid}>
          {worlds.map(w => (
            <Link key={w.id} href={w.href} className={`${styles.panel} ${styles[w.id]} rv`}>
              <div className={styles.packRow} aria-hidden>
                {w.items.slice(0, 3).map(p => p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.id} src={p.image} alt="" loading="lazy" />
                ))}
              </div>
              <p className={styles.mood}>{w.mood}</p>
              <h3 className={styles.name}>{w.name}</h3>
              <p className={styles.text}>{w.text}</p>
              <span className={styles.linkHint}>
                {w.items.length === 1 ? 'Δείτε το προϊόν' : `${w.items.length} προϊόντα`} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
