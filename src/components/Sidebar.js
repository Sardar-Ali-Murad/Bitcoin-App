import React from 'react'
import {  Outlet } from 'react-router-dom'
import "./index.css"
import SmallSideBar from './SmallSideBar';
import BigSidebar from './BigSidebar';


const Sidebar = () => {
  
  return (
    <div  className="sidebar__Bigmain">
     <BigSidebar/>
     <SmallSideBar/>
        <div className='outlet__Main' style={{width:"100%",marginLeft:"20px"}}>
      <Outlet/>
        </div>
    </div>
  )
}

export default Sidebar
