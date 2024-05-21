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
  const [page, setPage] = useState(3);
  const [topic, setTopic] = useState("Tema 1");
  const [questions, setQuestions] = useState({
    total: 0,
    correct: 0
  });

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
      {page === 2 && <Trivia topic={topic} intervalTime={3} goToNextPage={() => {setPage(3)}} questions={Questions} setQuestions={setQuestions}/>}
      {page === 3 && <End goToNextPage={() => {setPage(4)}} totalQuestions={questions.total} correctQuestions={questions.correct}/>}
      {page === 4 && <QR goToNextPage={() => {setPage(0)}}/>}
    </>
  );
}

export default App;
