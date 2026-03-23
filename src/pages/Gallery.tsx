import { createSignal } from "solid-js";
import SalonOverview from "../components/overView";
import SalonBanner from "../components/saloonBanner";
import SalonGallery from "../components/gallery";
import BlogS from "../components/blogcomp";




export default function gallery() {
  const [animate, setAnimate] = createSignal(false);

  return (
    
    <div>
           <SalonOverview />
           <SalonBanner/>
           <SalonGallery/>   
    </div>   
      
  );
}