import Navbar from "./components/Home/Navbar";
import LandingPage from "./components/Home/LandingPage";
import { FAQSection } from "./components/Home/FAQ";
import { Features } from "./components/Home/Features1";
import RadialOrbitalTimeline from "./components/Home/radical-orbital";
import Footer from "./components/Home/Footer";

export default function Home() {

  return (
    <>
    <Navbar/>
    <LandingPage/>
    <Features/>
    <RadialOrbitalTimeline/>
    <FAQSection/>
    <Footer/>
    </>
  );
}