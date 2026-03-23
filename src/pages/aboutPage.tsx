import Testimonials from "../components/testimonies";
import SalonOverview from "../components/overView";
import SalonBanner from "../components/saloonBanner";

export default function AboutPage() {
  return (
    <div>
      <SalonOverview />
      <SalonBanner />
      <Testimonials />
    </div>
  );
}