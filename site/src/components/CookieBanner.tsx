'use client';

import { useEffect, useState } from 'react';
import styles from './CookieBanner.module.css';

const KEY = 'uplab-consent';

/** GDPR banner — "Απόρριψη όλων" equally prominent as "Αποδοχή όλων" per brief. */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const decide = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={`${styles.banner} glass`} role="dialog" aria-label="Συγκατάθεση cookies" aria-live="polite">
      <p>
        Χρησιμοποιούμε cookies για τη μέτρηση της επισκεψιμότητας.
        Μπορείτε να τα απορρίψετε χωρίς καμία επίπτωση στη λειτουργία του site.
      </p>
      <div className={styles.actions}>
        <button className="btn btn-line" onClick={() => decide('rejected')}>Απόρριψη όλων</button>
        <button className="btn btn-solid" onClick={() => decide('accepted')}>Αποδοχή όλων</button>
      </div>
    </div>
  );
}
