import { useState, useEffect } from 'react';

import Landingpage from '../components/Landingpage';
import HowCanWeHelp from '../components/servicelandingpage';
import SpeedSection from '../components/continues';
import ProjectsPage from '../components/Projects';
import Loader from "../components/loader";

function LandingPageWrapper() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // fast gif
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}

      <Landingpage  />
      <HowCanWeHelp />
      <ProjectsPage />
      <SpeedSection />
    </>
  );
}

export default LandingPageWrapper;
