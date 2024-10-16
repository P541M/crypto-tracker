import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [exchangeRates, setExchangeRates] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
  };

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((response) => {
        const topCryptos = response.data.data.slice(0, 6);
        setCryptos(topCryptos);
        topCryptos.forEach((crypto) => {
          fetchHistoricalData(crypto.id);
        });
      })
      .catch((error) => {
        console.error("Error fetching data from CoinCap API", error);
      });

    axios
      .get("https://api.coincap.io/v2/rates")
      .then((response) => {
        const rates = response.data.data.reduce((acc, rate) => {
          acc[rate.symbol] = parseFloat(rate.rateUsd);
          return acc;
        }, {});
        setExchangeRates(rates);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates from CoinCap API", error);
      });
  }, []);

  const fetchHistoricalData = (cryptoId) => {
    axios
      .get(`https://api.coincap.io/v2/assets/${cryptoId}/history?interval=d1`)
      .then((response) => {
        const prices = response.data.data.map((point) => ({
          time: point.date,
          priceUsd: point.priceUsd,
        }));

        setHistoricalData((prevData) => ({
          ...prevData,
          [cryptoId]: prices,
        }));
      })
      .catch((error) => {
        console.error(`Error fetching historical data for ${cryptoId}`, error);
      });
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const convertPrice = (priceUsd) => {
    if (selectedCurrency === "USD") return priceUsd;
    const rate = exchangeRates[selectedCurrency];
    if (!rate) return priceUsd;
    return priceUsd / rate;
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const blurbs = {
    bitcoin:
      "Bitcoin is the first and most popular cryptocurrency, created in 2009 by Satoshi Nakamoto. It operates on a decentralized network using blockchain technology to ensure secure and transparent transactions.",
    ethereum:
      "Ethereum is a decentralized platform that enables smart contracts and decentralized applications (DApps) to be built and run without any downtime, fraud, control, or interference from a third party.",
    tether:
      "Tether is a type of cryptocurrency known as a stablecoin. It aims to keep cryptocurrency valuations stable, as opposed to the wide fluctuations observed in the prices of other popular cryptocurrencies like Bitcoin and Ethereum.",
    "binance-coin":
      "BNB is the native cryptocurrency of the Binance exchange, one of the largest cryptocurrency exchanges in the world. Initially launched as a utility token to pay for trading fees at a discounted rate, BNB has grown in utility, powering the Binance Smart Chain (BSC) for decentralized applications (DApps), DeFi projects, and smart contracts.",
    solana:
      "Solana is a high-performance blockchain platform designed for decentralized applications (DApps) and cryptocurrencies. Known for its lightning-fast transaction speeds and low fees, Solana aims to address the scalability issues that plague other blockchain platforms like Ethereum.",
    "usd-coin":
      "USD Coin (USDC) is a stablecoin that is pegged 1:1 to the US dollar, providing stability in the often volatile cryptocurrency market. Each USDC is backed by fully reserved assets, making it a popular choice for those looking for the stability of fiat currencies with the flexibility of cryptocurrencies.",
  };

  const getChartData = (cryptoId) => {
    const data = historicalData[cryptoId];
    if (!data) return null;

    const gradient = (ctx) => {
      const chart = ctx.chart;
      const { ctx: context, chartArea } = chart;
      if (!chartArea) {
        return null;
      }
      const gradientFill = context.createLinearGradient(
        0,
        0,
        0,
        chartArea.bottom
      );
      gradientFill.addColorStop(0, "rgba(173, 216, 230, 0.5)");
      gradientFill.addColorStop(1, "rgba(173, 216, 230, 0)");
      return gradientFill;
    };

    return {
      labels: data.map((point) => new Date(point.time).toLocaleDateString()),
      datasets: [
        {
          label: "Price",
          data: data.map((point) => parseFloat(convertPrice(point.priceUsd))),
          borderColor: "#76c7c0",
          backgroundColor: gradient,
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.4, // Smooth curves
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${
              currencySymbols[selectedCurrency]
            } ${tooltipItem.raw.toFixed(2)}`;
          },
        },
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.3)", // Make x-axis gridlines more visible
          lineWidth: 1.5, // Increase thickness of gridlines
        },
        ticks: {
          maxTicksLimit: 6, // Limit number of x-axis labels
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.3)", // Make y-axis gridlines more visible
          lineWidth: 1.5, // Increase thickness of gridlines
          borderDash: [5, 5], // Dotted gridlines for y-axis
        },
        ticks: {
          maxTicksLimit: 6, // Limit number of y-axis labels
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
  };

  return (
    <div className="relative text-text p-10">
      <div className="mb-6">
        <label htmlFor="currency" className="text-xl mr-4">
          Select Currency:
        </label>
        <select
          id="currency"
          className="p-2 rounded bg-bgContrast text-white"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="CAD">CAD</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-10">
        {cryptos.map((crypto, index) => (
          <div
            key={crypto.id}
            className="p-8 rounded-lg bg-bgContrast shadow-lg relative z-10"
          >
            <h1 className="text-4xl font-bold tracking-widest uppercase mb-4">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </h1>
            <p className="text-3xl mb-2">
              {currencySymbols[selectedCurrency]}{" "}
              {formatPrice(convertPrice(crypto.priceUsd))}
            </p>
            <p
              className={`text-xl mb-4 ${
                parseFloat(crypto.changePercent24Hr) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {parseFloat(crypto.changePercent24Hr) > 0 ? "+" : ""}
              {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
            </p>

            <p className="text-lg leading-6 mb-6">
              {blurbs[crypto.id] ||
                "Information on this cryptocurrency is currently not available."}
            </p>

            <div className="mt-4">
              {historicalData[crypto.id] ? (
                <Line
                  data={getChartData(crypto.id)}
                  options={chartOptions}
                  height={150}
                  key={`chart-${index}`}
                />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoListPage;
