import React from "react";

const LandingPage = () => {
  return (
    <div className="text-text h-screen flex flex-col justify-center items-center relative">
      <div className="z-10 text-center">
        <h1
          id="title"
          className="font-bold text-9xl mb-5 tracking-widest uppercase"
        >
          V/\ULT
        </h1>
        <p id="slogan" className="text-5xl mb-6 tracking-wide uppercase">
          Precision in Crypto Excellence
        </p>
      </div>

      <footer className="fixed bottom-4 right-4 z-50 flex flex-col items-end text-sm space-y-1">
        <p className="tracking-wide">
          Designed by{" "}
          <a
            href="https://p541m.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition duration-200"
          >
            "3LEAZAR"
          </a>
        </p>
        <p className="tracking-wide">© 2024 V/\ULT</p>
      </footer>
    </div>
  );
};

export default LandingPage;
