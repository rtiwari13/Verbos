import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/herosection";
import Services from "@/components/home/services";
import CTASection from "@/components/home/cta";
import Footer from "@/components/home/footer";
export default function Home() {
  return (
    <main className="">
      <div className="max-w-7xl mx-auto">
        <HeroSection />
        <Services />
        <CTASection />
      </div>

      <Footer />
    </main>
  );
}
