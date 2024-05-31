import { useState, useEffect } from 'react';
import styles from './Roulette.module.scss'
import Hand from '../../assets/imgs/roulette/mano.webp'
import { Wheel} from 'react-custom-roulette'
import Icon from '../../assets/imgs/roulette/roulette-icon.png'

function Roulette({goToNextPage, questions, setTopic, logo}) {
  
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [text, setText] = useState(true);
  const [rotate, setRotate] = useState(false);
  const [data, setData] = useState([]);

  const colors = ["#FEA700", "#C35AF4", "#B3E544", "#B3E544"];

  //Bloquear click derecho
  useEffect(() => {
    getData()
  }, []);

  function getData(){
    let i = 0;
    let data = [];
    Object.keys(questions).map((key) => {
      data.push({option: key, style: {backgroundColor: colors[i], textColor: 'white'}});
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
            <img src={logo} />
          </div>
          {text && <h1 className={styles.text}>TOCA PARA JUGAR</h1>}
          <div className={styles['roulette-container']}>
          {data.length!==0 &&
          <>
          <img className={styles.icon} src={Icon}/>
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
            fontSize={18}
            spinDuration={0.5}
            pointerProps={{style:{width: '20%', top: '1dvh', right: '1dvh'}}}
            innerRadius={0}
            innerBorderColor={'#0062AD'}
            innerBorderWidth={40}
            textDistance={55}
          />
          </>
          }
          {text && <img className={styles.hand} src={Hand}/>}
          </div>
      </div>
  )
}

export default Roulette;