import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Home from "./pages/Home.jsx";
import  About from "./pages/About.jsx";
import  Projects from "./pages/Projects.jsx";
import  Dashboard from "./pages/Dashboard.jsx";
import  SignIn from "./pages/SignIn.jsx";
import  SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
