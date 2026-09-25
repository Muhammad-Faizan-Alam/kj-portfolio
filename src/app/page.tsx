import Hero from '../components/hero'
import About from '../components/sections/about'
import Skills from '../components/sections/skills'
import Projects from '../components/sections/projects'

const page = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
    </main>
  )
}

export default page
