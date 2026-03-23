import AboutUs from "../components/About";
import BlogSection from "../components/blog";
import Testimonials from "../components/testimonies";
import Home from "../components/Home";

export default function HomePage() {
  return (
    <div>
      <Home />
      <AboutUs />
      <Testimonials />
      <BlogSection />
    </div>
  );
}