import React, { useEffect, useState } from 'react'
import './CardItem.scss'

export default function CardItem({col, row, index, frontImg, handleCount, found, disabled, backImg}) {
    const time = 250;
    const[view, setView] = useState(false);
    const[disabledState, setDisabled] = useState(false);
    const[foundState, setFound] = useState(false);
    const[element, setElement] = useState();

    const style = {
        gridColumn: col,
        gridRow: row,
        background: !view ? 'url('+backImg+')' +' no-repeat' +' center' +' center / 40% ,' + '#0962AD' : ''
    }

    function showCard(e){
        setDisabled(true)
        setElement(e)
        handleCount(index)
        function ended(){
            e.target.style.rotate = "y 180deg"
        }
        setTimeout(()=>{
            setView(true)
        }, time/2)
        e.target.animate([
            { rotate: 'y '+0+'deg' },
            { rotate: 'y '+180+'deg' }
            ], {
            duration: time,
            easing: 'linear',
            iterations: 1,
            complete: ended()
            }
        );    
    }
    function hideCard(){
        function ended(){
            element.target.style.rotate = "y 0deg"
        }
        setTimeout(()=>{
            setView(false)
        }, time/2)
        setTimeout(()=>{setDisabled(false)},time)
        element.target.animate([
            { rotate: 'y '+180+'deg' },
            { rotate: 'y '+360+'deg' }
            ], {
            duration: time,
            easing: 'linear',
            iterations: 1,
            complete: ended()
            }
        );
    }

    useEffect(()=>{
        const doesExist = found ? found.split(",").includes(String(index)) : false
        if(doesExist && !foundState){
            setFound(true)
        }
        else if(!disabled && !foundState && view){
            hideCard()
        }
    }, [disabled, found])

    return (
        <button disabled={disabledState || disabled} style={style} className="piece" onClick={showCard} >
            <div style={view ? {display: "block", rotate : "y 180deg", backgroundImage: 'url('+frontImg+')'} : {display: "none", rotate : "y 0deg"}} className='image'/>
        </button>
    )
}
