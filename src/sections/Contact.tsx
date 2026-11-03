import PageSection from '../components/PageSection';
import SectionHeader, { titleId } from '../components/SectionHeader';
import ContactInfo from '../components/ContactInfo';
import Reveal from '../components/Reveal';
import { profile } from '../data/profile';

export default function Contact() {
  return (
    <PageSection id="contact" labelledBy={titleId('Contact')}>
      <SectionHeader no="10" eyebrow="Contact" title="Let’s talk BIM." />
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{profile.name}</p>
          <p className="label mt-3 text-clay">{profile.roleLine}</p>
          <p className="mt-6 text-base text-ink-soft">{profile.location}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{profile.goal}</p>
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.08}>
          <ContactInfo />
        </Reveal>
      </div>
    </PageSection>
  );
}
