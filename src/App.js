import React, {useState, useEffect} from 'react';
import {Button} from './button.js'; 
import {generateId} from './utilities'
import './App.css';
function App() {
  let [time, setTime] = useState(0);
  useEffect(()=>{
   let interval = setInterval(()=>{
     setTime((prev)=>prev+1);
   },1000);
   return ()=>{
     clearInterval(interval)
   };
  },[]);
  let [roks,setRoks] = useState([{health:10,id:generateId()},{health:15,id:generateId()}]);
  let [level, setLevel] = useState(1);
  let addRoks = (rok)=>{
      setRoks((roks)=>[rok, ...roks]);
  };

  let deleteRoks = (rokIdToRemove) =>{
    setRoks((roks)=>roks.filter((roks)=>roks.id!==rokIdToRemove));
  };

  let increaseLevel = () =>{
    setLevel((prev)=>prev+1);
  }

  let degresHp = (targetRok) =>{
    let bufRoks = [];
    for(let element of roks){
      if(targetRok.id==element.id){
        element.health-=1;
      }
      bufRoks.push(element);
    }
    setRoks(roks=>bufRoks);
  }
  
  return (
  <div class="timer">
    <ul>
    {roks.map((rok) => (
            <Button degreHp={degresHp} text={rok.health} addButton={addRoks} deleteButton={deleteRoks} element={rok} level={level} numberOfElems={roks.length} incL={increaseLevel}/>
          ))}
    </ul>
    <p>{time}: seconds that you seing this site</p>
    <p>{level}</p>
  </div>
  
  );
}

export default App;
