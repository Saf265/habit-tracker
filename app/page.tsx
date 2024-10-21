import FeaturesPage from "./landing/FeaturesPage";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Navbar from "./landing/Navbar";
import Pricing from "./landing/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesPage />
      <Pricing />
      <Footer />
    </>
  );
}
