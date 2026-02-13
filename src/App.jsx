import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landingpage from './pages/Landingpage';
import Footer from './components/footer';

import ProjectDetailPage from './pages/projectsDetail';
import AdminDashboard from './pages/adminDashboard';
import JoinUsPage from './pages/joinus';
import AboutUsPage from './pages/aboutus';
import ContactPage from './pages/contact';
import ProjectGallery from './pages/projectgallery';

function App() {
  return (
    <Router>
      <Navbar />

      <div style={styles.pageWrapper}>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/projects" element={<ProjectGallery />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/secure-admin" element={<AdminDashboard />} />
          <Route path="/joinus" element={<JoinUsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

const styles = {
  pageWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
};

export default App;
