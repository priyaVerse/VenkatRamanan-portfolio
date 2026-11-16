import { Link2, Mail, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { profile } from '../data/profile';

interface RowProps {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function Row({ icon, label, value, href, external }: RowProps) {
  const filled = value.trim().length > 0;
  return (
    <li className="grid grid-cols-[28px_120px_1fr] items-center gap-3 border-t border-line py-5">
      <span className="text-clay" aria-hidden>
        {icon}
      </span>
      <span className="label text-muted">{label}</span>
      {filled && href ? (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="break-all text-base font-medium text-ink underline-offset-4 hover:text-clay hover:underline md:text-lg">
          {value.replace(/^https?:\/\/(www\.)?/, '')}
        </a>
      ) : (
        <span className="text-base text-muted/80 md:text-lg">To be added</span>
      )}
    </li>
  );
}

/** Contact details. Fields come from src/data/profile.ts; empty fields show a neutral placeholder. */
export default function ContactInfo() {
  const c = profile.contact ?? {
  email: '',
  phone: '',
  linkedin: '',
  behance: '',
};
  const tel = c.phone.replace(/[^+\d]/g, '');
  return (
    <ul className="border-b border-line">
      <Row icon={<Mail size={18} />} label="Email" value={c.email} href={`mailto:${c.email}`} />
      <Row icon={<Phone size={18} />} label="Phone" value={c.phone} href={`tel:${tel}`} />
      <Row icon={<Link2 size={18} />} label="LinkedIn" value={c.linkedin} href={c.linkedin} external />
      <Row icon={<Link2 size={18} />} label="Behance" value={c.behance} href={c.behance} external />
    </ul>
  );
}
