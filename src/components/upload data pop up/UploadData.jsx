import React, {useState} from 'react'
import './UploadData.scss'
import { getDatabase, ref, child, push, update , get} from "firebase/database";

function UploadData({closePopUp}) {
    const [message, setMessage] = useState()
    const [subiendo, setSubiendo] = useState(false)

    const uploadData = () => {
        try{
            setMessage('No cierres la aplicación mientras se suben los datos')
            if(!navigator.onLine){
                setMessage('No hay conexión a internet')
                return;
            }
            setSubiendo(true)
        }
        catch(e){
            setMessage(e)
        }
    }

    return (
        <div className='pop-up-bg'>
            <div className='pop-up'>
                <h1>¿Cargar datos a la base de datos?</h1>
                <button onClick={uploadData} className='upload-button' disabled={subiendo}>{subiendo ? "Subiendo..." : "Subir"}</button>
                <button onClick={closePopUp} disabled={subiendo}>Cerrar</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default UploadData;