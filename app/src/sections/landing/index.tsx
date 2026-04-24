import { HeroSection } from './components/HeroSection';
import { ConceptCards } from './components/ConceptCards';
import { ImpactNumbers } from './components/ImpactNumbers';
import { TimelineComparison } from './components/TimelineComparison';
import { CTASection } from './components/CTASection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ConceptCards />
      <ImpactNumbers />
      <TimelineComparison />
      <CTASection />
    </>
  );
}
