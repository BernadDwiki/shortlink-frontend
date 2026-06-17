import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import AnalyticsSection from "../components/AnalyticsSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <HeroSection />

      <FeatureSection />

      <AnalyticsSection />

      <Footer />
    </div>
  );
}
