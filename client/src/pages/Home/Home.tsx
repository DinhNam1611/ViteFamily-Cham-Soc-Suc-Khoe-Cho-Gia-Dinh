import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import HeroBanner from '../../components/sections/HeroBanner/HeroBanner';
import SpecialtyFinder from '../../components/sections/SpecialtyFinder/SpecialtyFinder';
import AboutPreview from '../../components/sections/AboutPreview/AboutPreview';
import ServicesHighlight from '../../components/sections/ServicesHighlight/ServicesHighlight';
import KeyStats from '../../components/sections/KeyStats/KeyStats';
import NewsEvents from '../../components/sections/NewsEvents/NewsEvents';
import AppointmentCTA from '../../components/sections/AppointmentCTA/AppointmentCTA';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <SpecialtyFinder />
        <AboutPreview />
        <ServicesHighlight />
        <KeyStats />
        <NewsEvents />
        <AppointmentCTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
