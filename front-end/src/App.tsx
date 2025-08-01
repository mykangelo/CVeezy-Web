import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseTemplate from './pages/choose-template';
import ChooseResumeMaker from './pages/choose-resume-maker';
import ImproveResume from './pages/uploader';
import Builder from './pages/enter-details'; 
import Homepage from './pages/homepage';
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import PrivacyPolicyPage from './pages/privacy-policy';
import ContactPage from './pages/contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choose-template" element={<ChooseTemplate />} />
        <Route path="/choose-resume-maker" element={<ChooseResumeMaker />} />
        <Route path="/uploader" element={<ImproveResume />} />
        <Route path="/enter-details" element={<Builder />} /> 
        <Route path="/builder" element={<Builder />} />
        <Route path="/login" element={<LoginPage />} /> {/* Add the new route here */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} /> 

      </Routes>
    </Router>
  );
}

export default App;
