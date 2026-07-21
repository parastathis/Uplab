# Generates site/public/llms.txt — a factual, AI-citable index of uplab.gr.
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
s = json.load(open(os.path.join(HERE, 'uplab-source.json'), encoding='utf-8'))
OUT = os.path.join(HERE, '..', 'site', 'public', 'llms.txt')

def unamp(t): return t.replace('&amp;', '&')
junk = lambda c: c == 'χωρίς κατηγορία' or re.match(r'^#\d+$', c)

lines = []
lines.append('# Uplab Pharmaceuticals')
lines.append('')
lines.append('> Ελληνική φαρμακευτική εταιρεία (UPLAB ΕΠΕ) με σύγχρονο εργοστάσιο παραγωγής φαρμάκων')
lines.append('> κατά GMP στη Μεταμόρφωση Αττικής (10ο χλμ Ε.Ο. Αθηνών-Λαμίας, 14452).')
lines.append('> Παράγει και διακινεί προϊόντα υγείας αποκλειστικά μέσω φαρμακείων — 2.075 σημεία πώλησης στην Ελλάδα.')
lines.append('> Τηλ: +30 210 28 44 333 · info@uplab.gr')
lines.append('')
lines.append('## Κατηγορίες ΕΟΦ (ρυθμιστικές)')
lines.append('Βιοκτόνα, Ιατροτεχνολογικά, Καλλυντικά, Συμπληρώματα διατροφής — όλα γνωστοποιημένα στον ΕΟΦ, τα καλλυντικά στο CPNP.')
lines.append('')
lines.append('## Προϊόντα (76, ανά κατηγορία υγείας)')
lines.append('')
for p in s['products']:
    cats = ', '.join(unamp(c) for c in p['categories'] if not junk(unamp(c)))
    eof = ', '.join(unamp(t) for t in p['eofTags'])
    desc = (p['excerpt'] or '').split('\n')[0][:220]
    lines.append(f"- [{p['name']}](https://uplab.gr/proionta/{p['slug']}): {desc}")
    lines.append(f"  Κατηγορίες: {cats or '—'} · ΕΟΦ: {eof or '—'}")
lines.append('')
lines.append('## Σελίδες')
lines.append('- [Προϊόντα](https://uplab.gr/proionta)')
lines.append('- [Η εταιρεία](https://uplab.gr/etaireia)')
lines.append('- [Νέα](https://uplab.gr/nea)')
lines.append('- [Σημεία πώλησης](https://uplab.gr/simeia-polisis)')
lines.append('- [Επικοινωνία](https://uplab.gr/epikoinonia)')
lines.append('')
lines.append('## Αποκλειστικοί συνεργάτες (ευρωπαϊκοί οίκοι)')
lines.append(', '.join(s['partners']))
lines.append('')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write('\n'.join(lines))
print('wrote', OUT, len(lines), 'lines')
