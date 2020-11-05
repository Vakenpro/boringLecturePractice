import React, {useState, useEffect} from 'react';
import { generateId } from './utilities';
export function Button  (props){
    let deleteElement = () =>{
        props.deleteButton(props.element.id);
        if(props.numberOfElems==1){
            props.incL();
            for(let i=0;i<props.level;i++){
                props.addButton({health:props.level,id:generateId()});
            }
        }
    }

    let rokClick =() =>{
        let target = props.element;
        props.degreHp(target);
        if(target.health==0){
            deleteElement();
        }
    }

    return(
        <li>
            <button onClick={rokClick}>{props.text}</button>
        </li>
    );
}
