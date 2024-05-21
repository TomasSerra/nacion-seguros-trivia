import React, {useEffect} from 'react'
import './End.scss'
import Logo from './../../assets/imgs/trivia/logo.png'
import Trophy from './../../assets/imgs/end/trophy.webp'
import FondoTrofeo from './../../assets/imgs/end/fondo-trofeo.png'

function End({correctQuestions, totalQuestions, goToNextPage}) {

  useEffect(() => {
    const bloquearClickDerecho = (event) => {
        event.preventDefault();
    };
    const preventZoom = (e) => {
      e.preventDefault();
    };

    document.addEventListener('gesturestart', preventZoom);
    document.addEventListener('contextmenu', bloquearClickDerecho);

    setTimeout(() => {
      //goToNextPage()
    }, 4000)

    return () => {
      document.removeEventListener('contextmenu', bloquearClickDerecho);
      document.removeEventListener('gesturestart', preventZoom);
    };
  }, []);

  return (
    <div className='end-page'>

      <div className="top-section">
        <img src={Logo} />
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