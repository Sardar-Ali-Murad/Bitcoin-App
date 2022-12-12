import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useParams,Link } from 'react-router-dom';
import {optionsForCoins} from "../utils"
import parse from "html-react-parser";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
// import ReactHtmlParser from 'react-html-parser';

const Details = () => {
  // let  [time,setTime]=React.useState("24h")
 let [coin,setCoin]=React.useState({})
 let [loading,setLoading]=React.useState(true)

 let [coinHistory,setCoinHistory]=React.useState([])
 let {id}=useParams()

 const options = {
   replace: (domNode) => {
     if (domNode.attribs && domNode.attribs.class === 'remove') {
      return <></>;
    }
  },
};

const [time, setTime] = React.useState('24h');

const handleChange = (event) => {
  setTime(event.target.value);
};

 React.useEffect(()=>{
   const start=async ()=>{
     let coindata=await fetch(`https://coinranking1.p.rapidapi.com/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`, optionsForCoins)

     let finalCoinData=await coindata.json()
     setCoin(finalCoinData.data.coin)

     let history=await fetch(`https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${time}`, optionsForCoins)

     let finalHistory=await history.json()
     console.log(finalHistory)

     setCoinHistory(finalHistory?.data?.history)


     setLoading(false)
   }

   start()
 },[time])


 console.log(coinHistory)


 let arr=[
  {text:"price",value:coin?.price},
 {text:"MarketCap",value:coin?.marketCap}
 ,{text:"BtcPrice",value:coin?.btcPrice,},
 ,{text:"Change",value:coin?.change,},
 ,{text:"Rank",value:coin?.rank,},
 ,{text:"NoOfExchanges",value:coin?.numberOfExchanges,},
 ,{text:"NoOfMarkets",value:coin?. numberOfMarkets,},
]
  return (
    <div className='section__padding' >
      <div className='coin__Front' style={{marginBottom:"70px"}}>
         <p className='h__Sans' style={{color:'lightblue'}}>{coin?.name}({coin?.symbol})</p>
         <img src={coin?.iconUrl} style={{height:"40px",borderRadius:"50%",width:"40px"}}/>
      </div>

      <div className="coin__Info">
          <div className='coin__Numbers' style={{marginBottom:"49px"}}>
        <h4 className="p__Sans">Some Important Values</h4>
             {arr.map((all)=>{
              return(
                <div className='coin__Numbers__Single'>
                    <h1 className='h__Cormorant'>{all.text}</h1>
                    <p className='P__Sans' style={{fontSize:"15px"}}>{all.value}</p>
                </div>
              )
             })}
       </div>
       <div className='coin__Links' style={{marginBottom:"40px"}}>
        <h4 className="p__Sans" style={{marginBottom:"10px"}}>Some Important Links</h4>
         {coin?.links?.map((all)=><a href={all.url} style={{color:"black",textDecoration:"none",cursor:"pointer"}} target="_blank"><p style={{cursor:"pointer",marginBottom:"15px"}} className='p__Sans'>{all.url}</p></a>)}
       </div>
      </div>


      <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label"  >Time Period</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
        
          label="Time Period"
          onChange={handleChange}

        >
          <MenuItem value="24h">24hours</MenuItem>
          <MenuItem value="3h">3hours</MenuItem>
          <MenuItem value="7d">7days</MenuItem>
          <MenuItem value="30d">30days</MenuItem>
          <MenuItem value="3m">3Month</MenuItem>
          <MenuItem value="1y">1Year</MenuItem>
          <MenuItem value="3y">3Year</MenuItem>
          <MenuItem value="5y">5Year</MenuItem>
        </Select>
      </FormControl>


<div style={{marginTop:"50px"}}>

      <ResponsiveContainer width='100%' height={300}>
      <BarChart data={coinHistory} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis  dataKey="Duration"/>
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='price' fill='#2cb1bc' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
</div>
      



      <Link to="/Coins" style={{textDecoration:"none",marginLeft:"50%",marginTop:"30px"}}  className='custom__Btn p__Sans'>Home</Link>
    
  </div>
  )
}

export default Details