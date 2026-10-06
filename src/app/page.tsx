import Hero from '../components/hero';
import Services from '../components/services';
import Process from '../components/process';
import Chosen from '../components/chosen';
import Brands from '../components/brands';
import Team from '../components/team';
import Testimonials from '../components/testmonials';
import FAQ from '../components/faq';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Chosen />
      <Brands />
      <Team />
      <Testimonials />  
      <FAQ />
    </main>
  );
}