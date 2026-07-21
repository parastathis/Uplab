import { NextResponse } from 'next/server';

// Απλό in-memory rate limit ανά IP — αρκετό για single-instance deployment.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — άνθρωπος δεν το βλέπει ποτέ
};

function asTrimmed(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Πολλές προσπάθειες. Δοκιμάστε ξανά σε λίγο.' },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Μη έγκυρο αίτημα.' }, { status: 400 });
  }

  if (asTrimmed(payload.company, 200) !== '') {
    // Bot στο honeypot — απαντάμε "επιτυχία" χωρίς να στείλουμε τίποτα.
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmed(payload.name, 200);
  const email = asTrimmed(payload.email, 254);
  const subject = asTrimmed(payload.subject, 300);
  const message = asTrimmed(payload.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Συμπληρώστε σωστά ονοματεπώνυμο, email και μήνυμα.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? 'info@uplab.gr';
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Uplab Website <onboarding@resend.dev>';

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact] (dev, χωρίς RESEND_API_KEY) μήνυμα από %s <%s>: %s — %s', name, email, subject, message);
      return NextResponse.json({ ok: true });
    }
    console.error('[contact] RESEND_API_KEY δεν έχει οριστεί — η φόρμα δεν μπορεί να στείλει email.');
    return NextResponse.json(
      { ok: false, error: 'Η φόρμα δεν είναι διαθέσιμη προσωρινά. Στείλτε email στο info@uplab.gr.' },
      { status: 503 },
    );
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: subject ? `[uplab.gr] ${subject}` : `[uplab.gr] Μήνυμα από ${name}`,
      text: `Ονοματεπώνυμο: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Αποτυχία Resend:', res.status, await res.text());
    return NextResponse.json(
      { ok: false, error: 'Η αποστολή απέτυχε. Δοκιμάστε ξανά ή στείλτε email στο info@uplab.gr.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
