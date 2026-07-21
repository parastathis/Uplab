'use client';

import { useState } from 'react';
import styles from './CompanyTabs.module.css';

/** The five real tabs from uplab.gr's Η εταιρεία page, verbatim. */
export function CompanyTabs({ tabs }: { tabs: Record<string, string> }) {
  const names = Object.keys(tabs);
  const [active, setActive] = useState(names[0]);

  return (
    <div>
      <div className={styles.tabRow} role="tablist" aria-label="Η ταυτότητά μας">
        {names.map(name => (
          <button
            key={name}
            role="tab"
            aria-selected={active === name}
            className={`${styles.tab} ${active === name ? styles.on : ''}`}
            onClick={() => setActive(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.panel} role="tabpanel" key={active}>
        <p>{tabs[active]}</p>
      </div>
    </div>
  );
}
