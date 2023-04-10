import { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ShortUrls from './components/Home/ShortUrls';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateShortUrl from './components/GenerateShort/GenerateShortUrl';

function App() {

  const [messageData , setMessageData] = useState({message : "", severity : "success"})

  const updateMessageData = function(message , severity) {
    setMessageData({message: message, severity:severity })
  }

  return (
    <>
<Router>
      <>
        <Header/>
      </>
      <Routes>
        <Route path="/" element={<ShortUrls updateMessageData={updateMessageData}/>} />
        <Route path="/generateShortUrl" element={<GenerateShortUrl updateMessageData={updateMessageData}/>} />
      </Routes>
      <>
        <Footer messageData={messageData}/>
      </>
    </Router>
    </>
  );
}

export default App;
