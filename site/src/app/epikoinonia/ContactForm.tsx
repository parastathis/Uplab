'use client';

import { useState, type FormEvent } from 'react';
import styles from './epikoinonia.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(body.error ?? 'Η αποστολή απέτυχε. Δοκιμάστε ξανά ή στείλτε email στο info@uplab.gr.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Η αποστολή απέτυχε. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.');
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.row}>
        <label>
          Ονοματεπώνυμο
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        Θέμα
        <input type="text" name="subject" />
      </label>
      <label>
        Μήνυμα
        <textarea name="message" rows={5} required />
      </label>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />
      <button type="submit" className="btn btn-honey" disabled={status === 'sending'}>
        {status === 'sending' ? 'Αποστολή…' : 'Αποστολή μηνύματος'}
      </button>
      <p aria-live="polite" className={styles.formNote}>
        {status === 'sent' && (
          <span className={styles.statusOk}>Το μήνυμά σας εστάλη. Θα επικοινωνήσουμε σύντομα μαζί σας.</span>
        )}
        {status === 'error' && <span className={styles.statusErr}>{errorMsg}</span>}
      </p>
    </form>
  );
}
