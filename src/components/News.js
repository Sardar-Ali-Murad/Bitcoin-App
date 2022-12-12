import React from 'react'
import {optionsForCoins,optionsForNews} from "../utils"
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom"

const News = () => {
  let [news,SetNews]=React.useState([])
  let [loading,setLoading]=React.useState(true)

  React.useEffect(()=>{
    const start=async ()=>{
      let newsData=await fetch('https://bing-news-search1.p.rapidapi.com/news/search?q=CryptoCurrency&safeSearch=Off&textFormat=Raw&freshness=Day', optionsForNews)

      let news=await newsData.json()
  
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
  


  return (
    <div className='stats__News__Grid' style={{marginTop:"100px"}}>
    {
    loading? <CircularProgress />:  news.map((all)=>{
      console.log(all)
        
        return(
          <div className="stats__Single__News">
             <Card style={{padding:"7px",cursor:"pointer"}} onClick={()=>card(all.url) } >
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
  )

}

export default News
