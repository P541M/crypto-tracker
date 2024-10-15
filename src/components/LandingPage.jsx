import React from "react";

const LandingPage = () => {
  return (
    <div className="text-text bg-bg h-screen flex flex-col justify-center relative">
      <div className="absolute top-8 right-8 max-w-lg tracking-wider">
        <p className="text-4xl leading-7">
          Cryptocurrency is a digital or virtual currency that uses cryptography
          for security, making it hard to counterfeit. Operating on
          decentralized networks based on blockchain technology,
          cryptocurrencies ensure secure, transparent transactions.
        </p>
      </div>
      <div className="absolute top-20 left-20 text-left">
        <h1 id="title" className="font-bold text-9xl mb-5 tracking-widest">
          VAULT | COIN
        </h1>
        <p id="slogan" className="text-6xl mb-8 tracking-wide">
          Precision in Crypto Excellence
        </p>
      </div>

      <div className="absolute bottom-4 left-4 text-left">
        <p className="text-lg tracking-wide">
          Designed by{" "}
          <a
            href="https://p541m.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            "3LEAZAR"
          </a>
        </p>
      </div>

      <footer className="absolute bottom-4 right-4 text-xs">
        © 2024 VAULT | COIN
      </footer>
    </div>
  );
};

export default LandingPage;
