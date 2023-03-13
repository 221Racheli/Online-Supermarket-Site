import {useState} from 'react'
import validator from 'validator';
import { Link, useNavigate } from "react-router-dom";
import './register';

import axios from "axios";

const Register = () => {

  const signUpServer = async (first_name,last_name,user_name, password,phone_number1,phone_number2,address,email)=> {
    address={'address':address};
    const response = axios.post('http://localhost:3600/users/register', {first_name,last_name,user_name, password,phone_number1,phone_number2,address,email });
    const responseData = await response.json();
    if(!response.ok)
    {
      console.log(responseData.message);
      setRegisterInfo=responseData.message;
    }
    else
      console.log(responseData.accessToken);
    

   
  }
    const emailValid =(email)=>{
        if(validator.isEmail(email)){
            setEmail(email)
            setEmailInfo("email is OK");
            setVaildMail(true);
            if(vaildMail==true && vaildPassword==true){
              setEnableButton(false);
            }
        }
        else{
            setEmailInfo("email not valid");
        }
    }

    const passwordStrong=(password)=>{
        if(validator.isStrongPassword(password))
        {
            setPassword(password);
            setVaildPassword(true)
            setPasswordInfo("סיסמא חזקה");
            if(vaildMail==true && vaildPassword==true){
              setEnableButton(false);
            }
        }
    }

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [phone_number1,setPhone_number1]=useState("");
    const [phone_number2,setPhone_number2]=useState("");
    const [address,setAddress]=useState("");
    const [email,setEmail]=useState("");
    const[emailInfo,setEmailInfo]=useState("");
    const[passwordInfo,setPasswordInfo]=useState("סיסמא צריכה להיות באורך של 8 תווים לפחות אות אחת גדולה אות אחת קטנה מספר ותו מיוחד");
    const[enableButton,setEnableButton]=useState(true);
    const[vaildMail,setVaildMail]=useState(false);
    const[vaildPassword,setVaildPassword]=useState(false);
    const[registerInfo,setRegisterInfo]=useState("");
    return (
    <>
    <div className='.registration-container'>
    <h3>Register</h3>
    <label>{registerInfo}</label>
    <br/>
    <lable>first name</lable><br />
    <input onChange={(e)=>{setFirstName(e.target.value)}}></input><br />
    <lable>last name</lable><br />
    <input onChange={(e)=>{setLastName(e.target.value)}}></input><br />
    <lable>user_name</lable><br />
    <input onChange={(e)=>{setUserName(e.target.value)}}></input><br />
    <lable>password</lable><br />
    <input onChange={(e)=>{passwordStrong(e.target.value)}} type="password"></input><br />
    <label>{passwordInfo}</label>
    <br/>
    <lable>phone_number1</lable><br />
    <input onChange={(e)=>{setPhone_number1(e.target.value)}}></input><br />
    <lable>phone_number2</lable><br />
    <input onChange={(e)=>{setPhone_number2(e.target.value)}}></input><br />
    <lable>address</lable><br />
    <input onChange={(e)=>{setAddress(e.target.value)}}></input><br />
    <lable>email</lable><br />
    <input onChange={(e)=>{emailValid(e.target.value)}}></input><br />
    <label>{emailInfo }</label>
    <br/>
    <br/>
    <button disabled={enableButton} onClick={() => signUpServer(firstName,lastName,userName, password,phone_number1,phone_number2,address,email)}>sign up</button>
    <br/>
    <label>have an account ?</label>
    <Link to="/login">
      <button>log in</button>
    </Link>
    </div>
    </>
  )
}

export default Register