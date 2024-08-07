import React, {useState} from 'react'
import './Home.scss'
import UploadData from '../../components/upload data pop up/UploadData'
import DeleteData from '../../components/delete data pop up/DeleteData'



function Home({goToNextPage, logo}) {
	const [clicks, setClicks] = useState(0)
	const [openUploadPopUp, setOpenUploadPopUp] = useState(false)
	const [openDeletePopUp, setOpenDeletePopUp] = useState(false)

	const secretUploadButton = () => {
		setClicks(prev => prev + 1)
		if(clicks === 1){
			setOpenUploadPopUp(true)
		}
		setTimeout(() => {
			setClicks(0)
		}, 1000)
	}

	const secretDeleteButton = () => {
		setClicks(prev => prev + 1)
		if(clicks === 1){
			setOpenDeletePopUp(true)
		}
		setTimeout(() => {
			setClicks(0)
		}, 1000)
	}

  return (
    <div className='home-page'>
		<div className='hidden-upload-button' onClick={secretUploadButton}></div>
		<div className='hidden-delete-button' onClick={secretDeleteButton}></div>
		{openUploadPopUp && <UploadData closePopUp={() => {setOpenUploadPopUp(false)}}/>}
		{openDeletePopUp && <DeleteData closePopUp={() => {setOpenDeletePopUp(false)}}/>}
        <div className="top-section">
        	<img src={logo} />
        </div>
        <div className="title-section">
			<h1>¡Hola!</h1>
			<h2>Preparate para demostrar cuánto sabés sobre Seguros Agro</h2>
        </div>
        <div className="button-section">
            <button onClick={goToNextPage}>Jugar</button>
        </div>
    </div>
  )
}

export default Home