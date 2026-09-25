import Hero from '../components/sections/hero'
import About from '../components/sections/about'
import Skills from '../components/sections/skills'
import Projects from '../components/sections/projects'
import ContactFooter from '../components/sections/contact-footer'

const page = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ContactFooter />
    </main>
  )
}

export default page
