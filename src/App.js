import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExchangeRate = () => {
  const [usdToLkrRate, setUsdToLkrRate] = useState(null);

  useEffect(() => {
    const API_KEY = 'YOUR_API_KEY';
    const API_URL = `https://open.er-api.com/v6/latest/USD`;

    // Function to fetch exchange rate
    const fetchExchangeRate = () => {
      axios.get(API_URL, { params: { api_key: API_KEY } })
        .then(response => {
          const { rates } = response.data;
          setUsdToLkrRate(rates.LKR);
        })
        .catch(error => {
          console.error('Error fetching exchange rate:', error);
        });
    };

    // Fetch exchange rate initially
    fetchExchangeRate();

    // Fetch exchange rate every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchExchangeRate, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {usdToLkrRate ? (
        <p>1 USD = {usdToLkrRate.toFixed(2)} LKR</p>
      ) : (
        <p>Loading exchange rate...</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>USD to LKR Exchange Rate (Real-time)</h1>
      <ExchangeRate />
    </div>
  );
};

export default App;
