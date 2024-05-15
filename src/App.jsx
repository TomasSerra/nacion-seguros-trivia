import React, {useEffect, useState} from 'react'
import './App.scss';
import Home from './pages/home/Home';
import Roulette from './pages/roulette/Roulette';
import Trivia from './pages/trivia/Trivia';
import End from './pages/end/End';
import QR from './pages/qr/QR';

function App() {
  const [page, setPage] = useState(2);

  return (
    <>
      {page === 0 && <Home goToNextPage={() => {setPage(1)}}/>}
      {page === 1 && <Roulette goToNextPage={() => {setPage(2)}}/>}
      {page === 2 && <Trivia topic={"Tema 1"} intervalTime={3} goToNextPage={() => {setPage(3)}}/>}
      {page === 3 && <End goToNextPage={() => {setPage(4)}}/>}
      {page === 4 && <QR goToNextPage={() => {setPage(0)}}/>}
    </>
  );
}

export default App;
