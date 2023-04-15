import { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ShortUrls from './components/Home/ShortUrls';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateShortUrl from './components/GenerateShort/GenerateShortUrl';

function App() {

  const [notificationSnackbar , setNotificationSnackbar] = useState({message : "", severity : "success"})

  const updateNotificationSnackbar = function(message , severity) {
    setNotificationSnackbar({message: message, severity:severity })
  }

  return (
    <Router>
      <>
        <Header/>
      </>
      <Routes>
        <Route path="/" element={<ShortUrls updateNotificationSnackbar={updateNotificationSnackbar}/>} />
        <Route path="/generateShortUrl" element={<GenerateShortUrl updateNotificationSnackbar={updateNotificationSnackbar}/>} />
      </Routes>
      <>
        <Footer notificationSnackbar={notificationSnackbar}/>
      </>
    </Router>
  );
}

export default App;
