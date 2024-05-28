import React, {useEffect} from 'react'
import './End.scss'
import Trophy from './../../assets/imgs/end/trophy.webp'
import FondoTrofeo from './../../assets/imgs/end/fondo-trofeo.png'
import Confetti from 'react-confetti'
import {useWindowSize} from '@react-hook/window-size'

function End({correctQuestions, totalQuestions, goToNextPage, logo}) {
  const [width, height] = useWindowSize()


  useEffect(() => {
    setTimeout(() => {
      goToNextPage()
    }, 5000)
  }, []);

  return (
    <div className='end-page'>
      <Confetti
        width={width}
        height={height}
    	/>

      <div className="top-section">
        <img src={logo} />
      </div>

      <div className="title-section">
        <h1>{((correctQuestions/totalQuestions) >= 0.5) ? '¡Excelente!' : '¡Gracias por participar!'}</h1>
        <h2>Respondiste {correctQuestions}/{totalQuestions} preguntas correctamente</h2>
      </div>

      <div className="prize-section">
        <img className='trophy' src={Trophy}/>
        <img className='trophy-bg' src={FondoTrofeo}/>
      </div>

    </div>
  )
}

export default End