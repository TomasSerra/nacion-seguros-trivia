import React from 'react'
import { useEffect, useState } from 'react';
import './Memotest.scss'

import Back from '../../assets/imgs/memotest/icono.png'
import CardTable from '../../components/card table/CardTable';
import TimeBar from '../../components/time bar/TimeBar';

export default function Memotest({size, maxTime, hasWin, goToNextPage, logo, images}) {
    const [imgs, setImgs] = useState([])
    const[timer, setTimer] = useState(maxTime);
    const[points, setPoints] = useState(0);
    const[end, setEnd] = useState();
    const [order, setOrder] = useState([]);
    const [timerInterval, setTimerInterval] = useState();

    function randomize(cant){
        let array = [];
        let randomImgs = [];
        let randomNums = [];

        while(randomImgs.length<size/2){
            const num = Math.floor(Math.random()*images.length)
            if(!randomNums.includes(num)){
                randomImgs.push(images[num])
                randomNums.push(num)
            }
        }

        setImgs(randomImgs)

        while(array.length<cant){
            const num = Math.floor(Math.random()*cant)
            if(!array.includes(num)){
                array.push(num)
            }
        }
        return(array)
      }
    
    const ratio = window.innerWidth/window.innerHeight

    function handlePoints(p){
        setPoints(points + p);
    }

    function handleTimer(){
        setTimer(prevTimer => prevTimer-maxTime/1000)
    }

    useEffect(()=>{
        setOrder(randomize(size))
        setTimerInterval(setInterval(handleTimer, maxTime*1000/1000));
    }, [])

    useEffect(()=>{
        if(points === size || timer <= 0){
            clearInterval(timerInterval);
            setEnd(true);
            setTimeout(()=>{
                if (points === size){
                    hasWin(true)
                } else {
                    hasWin(false)
                }
                goToNextPage();
            }, 2000)
        }
    }, [timer])

    useEffect(() => {
        const images = imgs.map((url) => {
          const img = new Image();
          img.src = url;
          return img;
        });
    
        // Clean up
        return () => {
          images.forEach((img) => (img.onload = null));
        };
      }, [imgs]);
    
    return (
        <div className='memotest-page'>
            <div className="header">
                <img src={logo}/>
                <div className="timer">
                    <TimeBar maxTime={maxTime} actualTime={timer} colors={{barColor: '#25a244', backgroundColor: '#155d27'}}/>
                </div>
            </div>
            {order.length !== 0 && <div className="table-container">
                <CardTable
                    size={window.innerWidth < 600 ? 85 : 75} 
                    space={2} 
                    columns={3} rows={4}
                    order={order}
                    imgs={imgs}
                    back={Back}
                    handlePoints={handlePoints}
                    end={end}
                    backImg={Back}
                />
            </div>}
        </div>
    )
}
