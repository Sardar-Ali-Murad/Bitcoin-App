import React from 'react'
import {optionsForCoins} from "../utils"
import Card from '@mui/material/Card';
import "./index.css"
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import {Link} from "react-router-dom"
const Coins = () => {
  let [stats,setStats]=React.useState([])
  let [loading,setLoading]=React.useState(true)
  let [coin,setCoin]=React.useState("")

  React.useEffect(()=>{
    const start=async ()=>{
      let statsData=await fetch("https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",optionsForCoins)

      let stat=await statsData.json()

      setStats(stat.data)

      setLoading(false)
    }
    start()
  },[])

  function handleChange(e){
    setCoin(e.target.value)
  }
  return (
    <div className="stats__Coins__Mian">
    <TextField id="standard-basic" label="Search The Coins" variant="standard" style={{marginBottom:"50px",marginLeft:"30px"}} value={coin} onChange={handleChange} />


     <div className="stats__Coins__Grid">
         {
        loading?<CircularProgress />:  stats.coins && stats?.coins.filter((all)=>all.name.toLowerCase().includes(coin.toLowerCase())).map((all,i)=>{
             return(
               <div className='stats__Coin__Single__Card' style={{width:"100%"}}>
                <Link to={`/CoinDetails/${all.uuid}`} style={{textDecoration:"none"}}>
                 <Card variant="outlined" style={{padding:"6px",cursor:"pointer",textDecoration:"none"}} >
                   <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                     <p>{i+1}.{all?.name}</p>
                     <img src={all?.iconUrl} style={{height:"40px"}}/>
                   </div>
                     <div className="line"></div>
                     <div className="stats__Coins__Info">
                       <p className='h__Sans'>Price:{all?.price}</p>
                       <p className='h__Sans'>MarketCap:{all?.marketCap}</p>
                       <p className='h__Sans'>Change:{all?.change}</p>
                     </div>
                 </Card>
                </Link>
               </div>
             )
           })
         }
     </div>
   
 </div>


  )
}

export default Coins
