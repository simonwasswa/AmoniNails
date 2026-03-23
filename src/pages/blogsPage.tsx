import { createSignal } from "solid-js";
import BlogS from "../components/blogcomp";




export default function Blogs() {
  const [animate, setAnimate] = createSignal(false);

  return (
    
    <div class="pt-6 ">

           <BlogS/>
           
    </div>   
      
  );
}