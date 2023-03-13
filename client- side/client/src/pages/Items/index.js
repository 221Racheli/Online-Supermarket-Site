
import {useState} from 'react'

import { Link, useNavigate } from "react-router-dom";


import axios from "axios";
const Items=async({id})=>{
    const new_id=parseInt(id);
    try{
    const res=await axios.get(`http://localhost:3600/products/${new_id}`).json()
    await res.map(i=><item info={i}></item>)
    }
    catch(err){

    }
   
}
export default Items

