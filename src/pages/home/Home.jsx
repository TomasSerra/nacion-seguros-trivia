import React, {useState} from 'react'
import './Home.scss'
import Logo from './../../assets/imgs/trivia/logo.png'
import { set } from 'firebase/database'
import UploadData from '../../components/upload data pop up/UploadData'

function Home({goToNextPage}) {
	const [clicks, setClicks] = useState(0)
	const [openPopUp, setOpenPopUp] = useState(false)

	const secretButton = () => {
		setClicks(prev => prev + 1)
		if(clicks === 1){
			setOpenPopUp(true)
		}
		setTimeout(() => {
			setClicks(0)
		}, 1000)
	}

  return (
    <div className='home-page'>
		<div className='hidden-button' onClick={secretButton}></div>
		{openPopUp && <UploadData closePopUp={() => {setOpenPopUp(false)}}/>}
        <div className="top-section">
        	<img src={Logo} />
        </div>
        <div className="title-section">
			<h1>¡Bienvenido!</h1>
			<h2>Preparate para demostrar cuánto sabés sobre Seguros Agro</h2>
        </div>
        <div className="button-section">
            <button onClick={goToNextPage}>Empezar</button>
        </div>
    </div>
  )
}

export default Home