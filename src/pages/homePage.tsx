import { createSignal } from "solid-js";
import AboutUs from "../components/About";
import BlogSection from "../components/blog";
import Testimonials from "../components/testimonies";
import Home from "../components/Home";





export default function homePage() {
  const [animate, setAnimate] = createSignal(false);

  return (
    
    <div>
        <Home/>
        <AboutUs/>
        <Testimonials/>
        <BlogSection/>
        
    </div>   
      
  );
}