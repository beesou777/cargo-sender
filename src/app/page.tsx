import ContactSection from './_sections/contact';
import FAQSection from './_sections/faq';
import FeatureSection from './_sections/features';
import HeroSection from './_sections/hero';
import InfoSection from './_sections/info';
import MultiCarrier from './_sections/multiCarrier';
import TestimonialsSection from './_sections/review';
import ReviewsSections from './_sections/reviews';
import WorkingProcessSection from './_sections/workingProcess';

export default function Home() {
  return (
    <main>
      <div className="bg-white">
        <HeroSection />
        <FeatureSection />
        <MultiCarrier />
        <TestimonialsSection />
        {/* <ReviewsSections /> */}
      </div>
      <div className="bg-backdrop">
        <WorkingProcessSection />
        <FAQSection />
        <ContactSection />
        <InfoSection />
      </div>
    </main>
  );
}
