import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Coin from './Coin';
import './App.css';


const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get(apiUrl)
    .then(res => {
      setCoins(res.data)
      console.log(res.data);
    })
    .catch(error => console.log(error));
  }, [])

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => {
    return coin.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="search" className="coin-input" onChange={handleSearch} />
        </form>
      </div>
      {filteredCoins.map(coin => {
          return (
            <Coin 
              key={coin.id} 
              name={coin.name} 
              image={coin.image} 
              symbol={coin.symbol} 
              marketcap={coin.market_cap} 
              price={coin.current_price} 
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          )
        })}
    </div>
  );
}

export default App;
