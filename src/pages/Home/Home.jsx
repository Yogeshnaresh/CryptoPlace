import React, { useEffect } from 'react'
import './Home.css'
import { useContext,useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
const Home = () => {
    const {allCoins,currency} = useContext(CoinContext);
    const [displayCoin,setDisplayCoin] = useState([]);
    const [input,setInput]=useState("");
    const inputHandler=(event)=>{
        setInput(event.target.value);
        if(event.target.value===""){
            setDisplayCoin(allCoins);
        } 
    }
    const SearchHandler=async(event)=>{
        event.preventDefault();
        const coins=await allCoins.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLowerCase())
        });
        setDisplayCoin(coins);
    }
    useEffect(()=>{
        setDisplayCoin(allCoins);
    },[allCoins])

  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's larget cryptocurrency marketplace.
            Sign up to explore more about cryptos.
        </p>
        <form onSubmit={SearchHandler}>
            <input list='coinlist' type="text" placeholder='Search crypto..' onChange={inputHandler} value={input} required/>
            <datalist id='coinlist'>
                {allCoins.map((item,index)=>(
                    <option key={index} value={item.name}></option>
                ))}
            </datalist>
            <button>Search</button>
        </form>
        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0,10).map((item,index)=>(
                    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div className="">
                            <img src={item.image} alt="" />
                            <p>{item.name+"-"+item.symbol}</p>
                        </div>
                        <div>
                            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                        </div>
                        <p className={item.price_change_percentage_24h>0 ? "green": "red"}
                        >{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                        <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
                    </Link>
                    
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Home
