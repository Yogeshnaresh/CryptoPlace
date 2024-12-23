
import {createContext, useState} from "react"
export const CoinContext = createContext();
import  {useEffect} from "react";
const CoinContextProvider = (props)=>{
    const [allCoins,setAllCoin]=useState([]);
    const [currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })
    const fetchAllCoins=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-kN3v4Ru5ygRTpJrw4waXrBzA'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchAllCoins();
    },[currency])
        
const contextValue={
    allCoins,currency,setCurrency
}
    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}
export default CoinContextProvider;