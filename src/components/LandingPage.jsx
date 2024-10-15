import React from "react";
import Typing from "react-typing-effect";

const LandingPage = () => {
  return (
    <div className="text-text bg-bg h-screen flex flex-col justify-center relative">
      <div className="absolute top-8 right-8 max-w-lg tracking-wider">
        <Typing
          text={[
            "Cryptocurrency is a digital or virtual currency that uses cryptography for security, making it hard to counterfeit. Operating on decentralized networks based on blockchain technology, cryptocurrencies ensure secure, transparent transactions.",
          ]}
          speed={10}
          eraseSpeed={0}
          eraseDelay={1000000000}
          typingDelay={100}
          displayTextRenderer={(text) => {
            return <p className="text-4xl leading-7">{text}</p>;
          }}
        />
      </div>
      <div className="absolute top-20 left-20 text-left">
        <h1 id="title" className="font-bold text-9xl mb-5 tracking-tighter">
          CRYPTO ELITE
        </h1>
        <p id="slogan" className="text-6xl mb-10 tracking-wide">
          Showcasing the
        </p>
        <p id="slogan" className="text-6xl m-8 tracking-wide">
          Top
        </p>
        <p id="slogan" className="text-6xl mb-8 tracking-wide">
          Cryptocurrencies
        </p>
      </div>

      <div className="absolute bottom-4 left-4 text-left">
        <p className="text-lg tracking-wide">Designed by "VIDEN4" - 3leazar</p>
      </div>

      <footer className="absolute bottom-4 right-4">© 2023 CRYPTO ELITE</footer>
    </div>
  );
};

export default LandingPage;
