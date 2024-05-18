import React, {useEffect, useState} from 'react'
import './App.scss';
import Home from './pages/home/Home';
import Roulette from './pages/roulette/Roulette';
import Trivia from './pages/trivia/Trivia';
import End from './pages/end/End';
import QR from './pages/qr/QR';
import Questions from './assets/data/questions.json';

import { getDatabase, ref, child, push, update , get} from "firebase/database";
import app from './FirebaseConfig'

function App() {
  const [page, setPage] = useState(0);
  const [topic, setTopic] = useState("Tema 1");

  useEffect(() => {
    if(localStorage.getItem('postKey') === null){
      const db = getDatabase(app);
      const newPostKey = push(child(ref(db), '/')).key;
      localStorage.setItem('postKey', newPostKey)
    }
  }, [])
  return (
    <>
      {page === 0 && <Home goToNextPage={() => {setPage(1)}}/>}
      {page === 1 && <Roulette goToNextPage={() => {setPage(2)}} questions={Questions} setTopic={setTopic}/>}
      {page === 2 && <Trivia topic={topic} intervalTime={3} goToNextPage={() => {setPage(3)}} questions={Questions}/>}
      {page === 3 && <End goToNextPage={() => {setPage(4)}}/>}
      {page === 4 && <QR goToNextPage={() => {setPage(0)}}/>}
    </>
  );
}

export default App;
