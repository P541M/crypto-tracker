import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import CryptoListPage from "./components/CryptoListPage";
import MobileViewMessage from "./components/MobileViewMessage";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isHandheldDevice =
      /android|ipad|iphone|ipod|windows phone|opera mini|iemobile/i.test(
        userAgent.toLowerCase()
      );
    setIsMobile(isHandheldDevice || window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileViewMessage />;
  }

  return (
    <div className="App relative min-h-screen bg-bg text-text overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="bg-gradient-to-r from-primary via-bgContrast to-bg opacity-30 w-full h-full"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent blur-3xl opacity-40 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary blur-2xl opacity-20 rounded-full"></div>
        <div className="absolute inset-0 grid-background"></div>
      </div>

      <div className="relative z-10">
        <LandingPage />
        <CryptoListPage />
      </div>
    </div>
  );
}

export default App;
