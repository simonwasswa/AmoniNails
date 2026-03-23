import { type JSXElement, createSignal, Show } from "solid-js";
import Navbar from "../components/navbar";
import Footer from "../components/footer";


interface LayoutProps {
    children?: JSXElement;
}

const Layout = (props: LayoutProps) => {
  const [menuOpen, setMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen());
  };

  const closeMenu = () => setMenuOpen(false);

const strings = {
  brandStart: "Amonic",
  brandEnd: "Nails",
  slogan: "Hundreds of Colors, Organic Nail Polish!",

  addressLine1: "5421 Najeera Kamwanyi",
  addressLine2: "Kira, Kampala, 2303",

  email: "simonwasswa33@amonicnails",
  phone: "+256 71 282 0001"
};

    return(
        <div class="w-full h-screen">
          <Navbar/>

            {props.children}
          <Footer/>
        </div>
    )
}

export default Layout;