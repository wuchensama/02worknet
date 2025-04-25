import HeroGeometric from "@/components/kokonutui/hero-geometric"
import ProjectsSection from "@/components/kokonutui/projects-section"
import GallerySection from "@/components/kokonutui/gallery-section"
import ContactSection from "@/components/kokonutui/contact-section"
import AboutMe from "@/components/kokonutui/about-me"

export default function Home() {
  return (
    <main>
      <HeroGeometric badge="摄影师嘉阳" title1="Portfolio" title2="Jeyon" />
      <AboutMe />
      <ProjectsSection />
      <GallerySection />
      <ContactSection />
    </main>
  )
} 