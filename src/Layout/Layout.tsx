import { type JSXElement } from "solid-js";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

interface LayoutProps {
  children?: JSXElement;
}

const Layout = (props: LayoutProps) => {
  return (
    <div class="w-full h-screen">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;