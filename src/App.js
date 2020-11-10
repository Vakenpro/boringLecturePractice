import React, {useState, useEffect} from 'react';
import {Button} from './button.js'; 
import {generateId} from './utilities'
import {styles} from './styles.js'
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
  let [strength, setStrength] = useState(1);
  let [gold, setGold] = useState(0);
  let increaseStrength = () =>{
    if(gold>=5){
      setStrength((prev)=>prev+1);
      setGold((prev)=>prev-5);
    }
  };
  let addGold = () =>{
    setGold((prev)=>prev+1);
  }
  let addRoks = (rok)=>{
      setRoks((roks)=>[rok, ...roks]);
  };

  let deleteRoks = (rokIdToRemove) =>{
    setRoks((roks)=>roks.filter((roks)=>roks.id!==rokIdToRemove));
    addGold();
  };

  let increaseLevel = () =>{
    setLevel((prev)=>prev+1);
  }

  let degresHp = (targetRok) =>{
    let bufRoks = [];
    for(let element of roks){
      if(targetRok.id==element.id){
        element.health-=strength;
      }
      bufRoks.push(element);
    }
    setRoks(roks=>bufRoks);
  }
  
  return (
  <div class="timer" style={styles.divStyle}>
    <ul>
    {roks.map((rok) => (
            <Button attackLevel={strength}degreHp={degresHp} text={rok.health} addButton={addRoks} deleteButton={deleteRoks} element={rok} level={level} numberOfElems={roks.length} incL={increaseLevel}/>
          ))}
    </ul>
    <p>Gold: {gold}</p>
    <button onClick={increaseStrength}>{strength}</button>
    <p>{time}: seconds that you seing this site</p>
    <p>{level}</p>
  </div>
  
  );
}

export default App;
