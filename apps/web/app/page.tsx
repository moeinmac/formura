import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { LiveDemo } from "@/components/marketing/live-demo";
import { FeaturesBento } from "@/components/marketing/features-bento";
import { WidgetStrip } from "@/components/marketing/widget-strip";
import { CtaSection } from "@/components/marketing/cta-section";

const HomePage = () => (
  <>
    <Hero />
    <HowItWorks />
    <LiveDemo />
    <FeaturesBento />
    <WidgetStrip />
    <CtaSection />
  </>
);

export default HomePage;
