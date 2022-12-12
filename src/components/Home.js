import React from 'react'
import {optionsForCoins,optionsForNews} from "../utils"
import Card from '@mui/material/Card';

import {Link} from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  let [stats,setStats]=React.useState([])
  let [news,SetNews]=React.useState([])
  let [coins,setCoins]=React.useState([])
  let [loading,setLoading]=React.useState(true)

  React.useEffect(()=>{
    const start=async ()=>{
      let statsData=await fetch("https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",optionsForCoins)

      let stat=await statsData.json()

      setStats(stat.data)

      // 
    
      let coinsData=await  fetch('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h', optionsForCoins)

      let coin=await coinsData.json()

      setCoins(coin.data.coin)

      // 


      let newsData=await fetch('https://bing-news-search1.p.rapidapi.com/news/search?q=CryptoCurrency&safeSearch=Off&textFormat=Raw&freshness=Day', optionsForNews)

      let news=await newsData.json()
      //  console.log(newsData)
      SetNews(news.value)

      setLoading(false)
    }
    start()
  },[])

  function  card(url){
    window.open(
      url,
      '_blank'
    );
  }

  let arr=[
    {
      text:"Total",
      count:stats?.stats?.total
    },
    {
      text:"Total24hVolume",
      count:stats?.stats?.total24hVolume
    },
    {
      text:"TotalCoins",
      count:stats?.stats?.totalCoins
    },
    {
      text:"TotalExchanges",
      count:stats?.stats?.totalExchanges
    },
    {
      text:"TotalMarketCap",
      count:stats?.stats?.totalMarketCap
    },
    {
      text:"TotalMarkets",
      count:stats?.stats?.totalMarkets
    },
    {
      text:"Total",
      count:stats?.stats?.total
    },

  ]

  // console.log(news)
  
  return (
    <div className="home__Main" style={{width:"100%"}}>

     <h3 className='h__Sans' style={{marginLeft:"20px",marginBottom:"60px",marginTop:"20px"}}>Global Crypto Stats</h3>

      <div className="stats__Main" style={{width:"100%"}}>
         {
          arr.map((all)=>{
            return(
              <div className="stats__Single">
                <h3 className="h__Sans">{all.text}</h3>
                <p className="h__Cormorant">{all.count}</p>
              </div>
            )
          })
         }
    </div>
 
      <div className="stats__Coins__Mian">
         <div style={{display:"flex",justifyContent:"space-between"}}>
          <h3 className='h__Sans' style={{marginLeft:"20px",marginBottom:"60px",marginTop:"20px"}}>See All Coins</h3>
           
           <Link to="/Coins" className='h__Sans' style={{color:"blue",fontWeight:"bolder",fontSize:"23px",textDecoration:"none",marginTop:"24px"}}>Show More</Link>
         </div>


          <div className="stats__Coins__Grid">
              {
               stats.coins &&  stats?.coins.slice(0,10).map((all,i)=>{
                  return(
                    <div className='stats__Coin__Single__Card' style={{width:"100%"}}>
                       <Link to={`/CoinDetails/${all.uuid}`} style={{textDecoration:"none"}}>

                      <Card variant="outlined" style={{padding:"6px"}}>
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



      <div className='stats__News__Main' style={{marginRight:"50px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 className='h__Sans' style={{marginLeft:"20px",marginBottom:"60px",marginTop:"20px"}}>Latest Crypto News</h3>
           
           <Link to="/News" className='h__Sans' style={{color:"blue",fontWeight:"bolder",fontSize:"23px",textDecoration:"none",marginBottom:"30px"}}>Show More</Link>
         </div>
      </div>

      <div className='stats__News__Grid'>
        {
         loading?<CircularProgress />: news.map((all)=>{
        
            return(
              <div className="stats__Single__News">
                 <Card onClick={()=>card(all.url)}  style={{padding:"7px",cursor:"pointer"}}>
                   <div className="news__Headers">
                       <p className='p__Cormorant'>{all?.name}</p>
                       <img style={{height:"100px"}} src={all?.image?.thumbnail?.contentUrl}/>
                   </div>

                   <p className="p__Sans" style={{marginTop:"10px",fontSize:"14px"}}>{all?.description.slice(0,100)}....</p>

                   <div className="stats__News__Footer">
                      <img src={all?.provider[0]?.image?.thumbnail?.contentUrl}/>
                      <p className='h__Sans'>{all?.provider[0]?.name}</p>
                   </div>
                 </Card>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Home
