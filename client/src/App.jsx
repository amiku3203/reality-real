
import './App.css'
import { Routes, Route } from "react-router-dom"
import 'animate.css';
import { useLocation } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ProjectGallery from './components/Property';
import ProjectDetailsPage from './pages/ProjectsDetails';
import Disclaimer from './pages/Disclaimer';
import Testimonials from './components/Testimonials';
import BlogList from './components/BlogList';
import BlogDetails from './pages/BlogDetails';
 
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.jsx';
import Context from './context';
import SummaryApi from './common.jsx';
import { useEffect, useState } from 'react';
import Admin from './admin/Admin.jsx';
import SignIn from './backendactivity/SignIn.jsx';
import WhatWeDo from './pages/WhatWeDo.jsx';
import Awards from './pages/Awards.jsx';
import Career from './pages/Career.jsx';
import ContactUs from './pages/Contact.jsx';
 
import Chatbot from "./components/Chatbot.jsx";
import FloatingChatButton from "./components/FloatingComponent.jsx";
// import { setUserDetails } from './store/userSlice';



function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
      setChatbotOpen((prev) => !prev);
  };
  // Check if the current path includes "admin"
  const isAdminRoute = location.pathname.includes('admin');
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

  const dataApi = await dataResponse.json();
  //  console.log("dataApi", dataApi);
  if (dataApi?.success) {
      dispatch(setUserDetails(dataApi?.data));
    }
  };

  useEffect(() => {
  fetchUserDetails();
  }, []);

  return (
    <>
     <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch 
         
        }}
      >
        
      { !isAdminRoute &&  <Header/>  }
      <FloatingChatButton toggleChatbot={toggleChatbot} />
            <Chatbot isOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
       <Routes>
        
        <Route path="/" element={ <Home/> } />

        <Route path="/property" element={ <ProjectGallery/> } />
        <Route  path="/properties/:slug" element={<ProjectDetailsPage/>}/>
        <Route  path="/disclaimer" element={<Disclaimer/>}  />
        <Route path="/testimonials" element={<Testimonials/>} />
        <Route path="/blogs" element={<BlogList/>} />
        <Route path="/blog/:slug" element={<BlogDetails/>}  />
        <Route path="signin"  element={<SignIn/>}/>
        <Route path="/admin" element={<Admin/>}     />
        <Route path="/what-we-do" element={<WhatWeDo/>} />
        <Route  path="/awards" element={<Awards/>} />
        <Route path="/career" element={<Career/>}  />
        <Route path="/contact" element={<ContactUs/>} />
      </Routes>
      {  !isAdminRoute && <Footer/> }
      </Context.Provider>
       </>
    
  )
}

export default App
