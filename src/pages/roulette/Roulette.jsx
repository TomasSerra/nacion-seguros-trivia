import { useState, useEffect } from 'react';
import styles from './Roulette.module.scss'
import Hand from '../../assets/imgs/roulette/mano.webp'
import { Wheel} from 'react-custom-roulette'
import Logo from './../../assets/imgs/trivia/logo.png'

function Roulette({goToNextPage, questions, setTopic}) {
  
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [text, setText] = useState(true);
  const [rotate, setRotate] = useState(false);
  const [data, setData] = useState([]);

  const colors = ['#ffc801', '#13c989', '#eb36a8', '#9b13c9'];

  //Bloquear click derecho
  useEffect(() => {
    getData()
    const bloquearClickDerecho = (event) => {
        event.preventDefault();
    };
    const preventZoom = (e) => {
      e.preventDefault();
    };

    document.addEventListener('gesturestart', preventZoom);
    document.addEventListener('contextmenu', bloquearClickDerecho);

    return () => {
      document.removeEventListener('contextmenu', bloquearClickDerecho);
      document.removeEventListener('gesturestart', preventZoom);
    };
  }, []);

  function getData(){
    let i = 0;
    let data = [];
    Object.keys(questions).map((key) => {
      data.push({option: key, style: {backgroundColor: colors[i], textColor: 'black'}});
      i++;
    } )
    setData(data);
  }

  function rotateRoulette(){
    setPrizeNumber(calculateProbability());
    setRotate(true);
    setText(false);
  }

  function calculateProbability(){
    return Math.floor(Math.random()*Object.keys(questions).length);
  }

  function stopSpinning(){
    setRotate(false);
    setTopic(data[prizeNumber].option)
    setTimeout(() => {
      goToNextPage();
    }, 3000);
  }

  return (
      <div className={styles.Roulette} onMouseDown={()=>{if(text) rotateRoulette();}}>
          <div className={styles['top-section']}>
            <img src={Logo} />
          </div>
          {text && <h1 className={styles.text}>TOCA PARA JUGAR</h1>}
          <div className={styles['roulette-container']}>
          {data.length!==0 &&
          <Wheel
            mustStartSpinning={rotate}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              stopSpinning();
            }}
            outerBorderWidth={20}
            outerBorderColor={'#0062AD'}
            radiusLineWidth={0}
            radiusLineColor='white'
            fontSize={30}
            spinDuration={0.5}
            pointerProps={{style:{width: '23%'}}}
            innerRadius={0}
            innerBorderColor={'#0062AD'}
            innerBorderWidth={40}
          />
          }
          {text && <img className={styles.hand} src={Hand}/>}
          </div>
      </div>
  )
}

export default Roulette;