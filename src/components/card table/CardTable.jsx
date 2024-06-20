import React, { useEffect, useState } from 'react';
import './CardTable.scss';
import CardItem from '../card item/CardItem';


export default function CardTable(props) {
    const ratio = window.innerWidth/window.innerHeight;
    const styles = {
        display : 'grid',
        width : ratio>=1 ? props.size + 'vh' : props.size + 'vw',
        gridTemplateColumns : 'repeat(' + props.columns + ', 1fr)',
        gridTemplateRows : 'repeat(' + props.rows + ', 1fr)',
        gridGap : ratio>=1 ? props.space + 'vh' : props.space + 'vw'
    } 

    const[disabled, setDisabled] = useState(false);
    const[count, setCount] = useState(0);
    const[found, setFound] = useState();

    function handleCount(index){
        if(count === index){
            //Sumar puntos?
            setFound(found ? (found +","+index) : String(index))
            setCount(0)
            props.handlePoints(2);
        }
        else if(count){
            setDisabled(true);
            setTimeout(()=>{
                setDisabled(false);
                setCount(0)
            },1000)
        }
        else{
            setCount(index)
        }
    }

    useEffect(()=>{
        if(props.end){
            setDisabled(true)
            setCount(0)
        }
    }, [props.end])

    return (
        <div style={styles}>
            {props.imgs.map((img, index)=>{
                const firstPos = props.order[index];
                const secondPos = props.order[(props.order.length-1) - index];
                const myRowFirst = Math.floor(firstPos / props.columns) + 1
                const myColFirst = (firstPos % props.columns) + 1
                const myRowSecond = Math.floor(secondPos / props.columns) + 1
                const myColSecond = (secondPos % props.columns) + 1
                return(
                <>
                <CardItem
                    index={index+1}
                    found={found}
                    key={firstPos}
                    disabled={disabled}
                    handleCount={handleCount}
                    row={myRowFirst} 
                    col={myColFirst}
                    frontImg={img} 
                    backImg={props.backImg}
                />
                <CardItem 
                    index={index+1}
                    found={found}
                    key={secondPos}
                    disabled={disabled}
                    handleCount={handleCount}
                    row={myRowSecond} 
                    col={myColSecond}
                    frontImg={img} 
                    backImg={props.backImg}
                />
                </>
                )
            })}
        </div>
    )
}
