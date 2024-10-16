import React from "react";
import LandingPage from "./components/LandingPage";
import CryptoListPage from "./components/CryptoListPage";

function App() {
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

        <div className="text-center pt-36 py-12 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 tracking-wider uppercase">
            A Glimpse into the World’s Leading Cryptocurrencies
          </h2>
          <p className="text-lg leading-7 mb-4 text-gray-400">
            Cryptocurrencies have transformed the financial landscape, offering
            new ways to transact, invest, and innovate. This page highlights the
            six most influential cryptocurrencies in the market today, focusing
            on their key characteristics and their role in shaping the world of
            decentralized finance.
          </p>
          <p className="text-lg leading-7 text-gray-400">
            You’ll find a brief overview of each currency, along with a
            real-time chart showcasing their recent performance. Whether you’re
            a crypto enthusiast, investor, or simply curious, this page provides
            you with the insights to understand the power behind the world’s top
            digital currencies.
          </p>
        </div>

        <CryptoListPage />
      </div>
    </div>
  );
}

export default App;
