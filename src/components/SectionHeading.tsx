import type { ReactNode } from 'react';

export function SectionHeading({ number, label, children, description }: { number: string; label: string; children: ReactNode; description?: string }) {
  return <div className="section-heading"><p className="eyebrow"><span>{number}</span><i />{label}</p><h2>{children}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
