import { createSignal } from "solid-js";
import Testimonials from "../components/testimonies";
import Service2 from "../components/service2";
import SalonOverview from "../components/overView";
import SalonBanner from "../components/saloonBanner";




export default function aboutPage() {
  const [animate, setAnimate] = createSignal(false);

  return (
    
    <div>
           <SalonOverview />
           <SalonBanner/>

           <Testimonials/>       
    </div>   
      
  );
}