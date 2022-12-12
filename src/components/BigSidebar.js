import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./index.css"
import HomeIcon from '@mui/icons-material/Home';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const BigSidebar = () => {
   
    let value=localStorage.getItem("bitcoinValue")
    let [state,setState]=React.useState("Home")
    let arr=[
        
        {
            text:"Coins",
            icon:<CurrencyBitcoinIcon/>
        },
        {
            text:"News",
            icon:<AddLocationIcon/>
        },
    ]
    
    function handleLink(text){
        setState(text)
        localStorage.setItem("bitcoinValue",text)
    }
    React.useEffect(()=>{
        let value=localStorage.getItem("bitcoinValue")
         setState(value)
    },[state])
    function handleLinkSmallSidebar(text){
        setState(text)
        setSmallSideBar(false)
    }
    
    function close(){
        setSmallSideBar(false)
    }
    
    let [smallSideBar,setSmallSideBar]=React.useState(false)
    
    function toogle(){
        setSmallSideBar((pre)=>!pre)
    }
  return (
    <div className='sidebar__Main'>
    <h1 className='h__Cormorant'>CryptoVerse</h1>
    <nav className='p__Sans'>
            <Link to="/" className='main__Link'>
                    <div onClick={()=>handleLink("Home")} className={`single__Link ${state==="Home"?"active":""}`}>
                        <p className='p__Sans link'>Home</p>
                        <h2><HomeIcon/></h2>
                    </div>
           </Link>
        {
            arr.map((all)=>{
                return(
                    <Link to={all.text} className="main__Link">
                    <div onClick={()=>handleLink(all.text)} className={`single__Link ${all.text===state?"active":""}`}>
                        <p className='p__Sans link'>{all.text}</p>
                        <h2>{all.icon}</h2>
                    </div>
                    </Link>
                )
            })
        }
    </nav>
  </div>
  )
}

export default BigSidebar
