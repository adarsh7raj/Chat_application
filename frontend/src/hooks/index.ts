import { useState,useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
interface Username{
    name:string
 }
 interface Message{
    
    content: string;
    createdAt: Date;
    senderName:string,
    sendTo:string

  
  }
export const useFriends=function(){
 
    const [loading,setLoading]=useState(true);
    const [friends,setFriends]=useState([]);
  
    const token=localStorage.getItem("JWT");
    useEffect(  function(){
        const response=axios.get(`${BACKEND_URL}/api/v1/user/friends`,{headers:{"Content-Type": "application/json",Authorization:token},withCredentials:true});
        response.then(function(value){
        
          
            setFriends(value.data.friends);
            setLoading(false);
            
        })
    },[]);
     
    return {loading,friends};
    }


export const useSentMessage=function({name}:Username){
    const [loading1,setLoading]=useState(true);
    const [sent_message,setSentMessage]=useState<Message[]>([]);
    
    useEffect(function(){
        setLoading(true);
       axios.get(`${BACKEND_URL}/api/v1/user/sent/messages/${name}`,{headers:{"Content-Type": "application/json",Authorization:localStorage.getItem("JWT")},withCredentials:true}).then(function(value){
        console.log("yes1");

        setSentMessage(value.data.messages);
        setLoading(false);
        
       });
       
    },[name]);
    console.log(loading1);
    return {loading1,sent_message}
}
export const useReceivedMessage=function({name}:Username){
    const [loading2,setLoading]=useState(true);

    const [received_message,setReceivedMessage]=useState<Message[]>([]);
    useEffect(function(){
        setLoading(true);
        axios.get(`${BACKEND_URL}/api/v1/user/received/messages/${name}`,{headers:{"Content-Type": "application/json",Authorization:localStorage.getItem("JWT")},withCredentials:true}).then(function(value){
           
 
            setReceivedMessage(value.data.messages);
            setLoading(false);
   
        });

    },[name]);
   
    return {loading2,received_message}
}

