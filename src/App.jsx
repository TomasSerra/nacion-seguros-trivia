import React, {useEffect, useState} from 'react'
import './App.scss';
import Home from './pages/home/Home';
import Roulette from './pages/roulette/Roulette';
import Trivia from './pages/trivia/Trivia';
import End from './pages/end/End';
import QR from './pages/qr/QR';
import Questions from './assets/data/questions.json';
import Logo from './assets/imgs/general/logo.png';

import F1 from './assets/imgs/memotest/fichas/1.PNG'
import F2 from './assets/imgs/memotest/fichas/2.PNG'
import F3 from './assets/imgs/memotest/fichas/3.PNG'
import F4 from './assets/imgs/memotest/fichas/4.PNG'
import F5 from './assets/imgs/memotest/fichas/5.jpg'
import F6 from './assets/imgs/memotest/fichas/6.jpg'
import F7 from './assets/imgs/memotest/fichas/7.jpg'
import F8 from './assets/imgs/memotest/fichas/8.jpg'

import { getDatabase, ref, child, push} from "firebase/database";
import app from './FirebaseConfig'
import Memotest from './pages/memotest/Memotest';

function App() {
  const [page, setPage] = useState(0);
  const [topic, setTopic] = useState("Máquinas");
  const [questions, setQuestions] = useState({
    total: 0,
    correct: 0
  });

  const [hasWin, setHasWin] = useState(false);

  useEffect(() => {
    bloquearGestos()
  }, [])

  useEffect(() => {
    if(page === 0){
      if(localStorage.getItem('postKey') === null && navigator.onLine){
        const db = getDatabase(app);
        const newPostKey = push(child(ref(db), '/')).key;
        localStorage.setItem('postKey', newPostKey)
      }
      setQuestions({total: 0,
        correct: 0
      });
    }
  }, [page])
  
  function bloquearGestos(){
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('selectstart', event => event.preventDefault());
  }
  return (
    <>
      {page === 0 && <Home setPage={setPage} logo={Logo}/>}
      {page === 1 && <Roulette goToNextPage={() => {setPage(2)}} questions={Questions} setTopic={setTopic} logo={Logo}/>}
      {page === 2 && <Trivia topic={topic} intervalTime={3} goToNextPage={() => {setPage(4)}} questions={Questions} setQuestionInfo={setQuestions} questionTime={40} numberOfQuestions={3} logo={Logo}/>}
      {page === 3 && <Memotest size={12} maxTime={60} hasWin={setHasWin} goToNextPage={() => {setPage(4)}} logo={Logo} images={[F1, F2, F3, F4, F5, F6, F7, F8]}/>}
      {page === 4 && <End goToNextPage={() => {setPage(5)}} totalQuestions={questions.total} correctQuestions={questions.correct} logo={Logo} hasWin={hasWin}/>}
      {page === 5 && <QR goToNextPage={() => {setPage(0)}} logo={Logo}/>}
    </>
  );
}

export default App;
