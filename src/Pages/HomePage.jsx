import { FAQSection } from "../components/App Components/FAQSection";
import { Footer } from "../components/App Components/Footer";
import { HeroSection } from "../components/App Components/HeroSection";
import { Navbar } from "../components/App Components/Navbar";
import { ServicesSection } from "../components/App Components/Services";

export function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <FAQSection />
            <Footer />
        </>
    )
}