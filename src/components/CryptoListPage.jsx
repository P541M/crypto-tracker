import React, { useState, useEffect } from "react";
import axios from "axios";
import Typing from "react-typing-effect";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoListPage = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((response) => {
        const topCryptos = response.data.data.slice(0, 6);
        setCryptos(topCryptos);
        console.log(topCryptos.map((crypto) => crypto.id));
      })
      .catch((error) => {
        console.error("Error fetching data from CoinCap API", error);
      });
  }, []);

  const blurbs = {
    bitcoin:
      "Bitcoin is the first and most popular cryptocurrency, created in 2009 by Satoshi Nakamoto. It operates on a decentralized network using blockchain technology to ensure secure and transparent transactions.",
    ethereum:
      "Ethereum is a decentralized platform that enables smart contracts and decentralized applications (DApps) to be built and run without any downtime, fraud, control, or interference from a third party.",
    tether:
      "Tether is a type of cryptocurrency known as a stablecoin. It aims to keep cryptocurrency valuations stable, as opposed to the wide fluctuations observed in the prices of other popular cryptocurrencies like Bitcoin and Ethereum.",
    binancecoin:
      "BNB is the native cryptocurrency of the Binance exchange, one of the largest cryptocurrency exchanges in the world. Initially launched as a utility token to pay for trading fees at a discounted rate, BNB has grown in utility, powering the Binance Smart Chain (BSC) for decentralized applications (DApps), DeFi projects, and smart contracts.",
    solana:
      "Solana is a high-performance blockchain platform designed for decentralized applications (DApps) and cryptocurrencies. Known for its lightning-fast transaction speeds and low fees, Solana aims to address the scalability issues that plague other blockchain platforms like Ethereum.",
    "usd-coin":
      "USD Coin (USDC) is a stablecoin that is pegged 1:1 to the US dollar, providing stability in the often volatile cryptocurrency market. Each USDC is backed by fully reserved assets, making it a popular choice for those looking for the stability of fiat currencies with the flexibility of cryptocurrencies.",
  };

  const sampleChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Price Trend",
        data: [30000, 32000, 31000, 33000, 35000, 34000, 36000],
        borderColor: "rgba(255, 255, 255, 0.7)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        fill: true,
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-bg text-text p-10">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('/path/to/cryptologo.png')` }}
      ></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {cryptos.map((crypto, index) => (
          <div
            key={crypto.id}
            className="p-6 rounded-lg bg-bgContrast shadow-lg relative"
          >
            <h1 className="text-4xl font-bold tracking-tight uppercase">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </h1>
            <p className="text-3xl">
              ${parseFloat(crypto.priceUsd).toFixed(2)}
            </p>
            <p
              className={`text-xl ${
                parseFloat(crypto.changePercent24Hr) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {parseFloat(crypto.changePercent24Hr) > 0 ? "+" : ""}
              {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
            </p>

            <Typing
              text={[
                blurbs[crypto.id] ||
                  "Information on this cryptocurrency is currently not available.",
              ]}
              speed={10}
              eraseSpeed={0}
              eraseDelay={1000000000}
              className="text-lg mt-4"
            />

            <div className="mt-4">
              <Line
                data={sampleChartData}
                options={{ maintainAspectRatio: false }}
                height={150}
                key={`chart-${index}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoListPage;
