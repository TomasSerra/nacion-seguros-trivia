import React, {useEffect, useState} from 'react'
import './Trivia.scss'
import Questions from '../../data/Questions'

function Trivia({topic}) {
  const [questions, setQuestions] = useState(Questions[topic])
  const [actualQuestion, setQuestion] = useState('')
  const [actualOptions, setActualOptions] = useState()
  const [questionOrder, setQuestionOrder] = useState([])
  const [actualCorrect, setActualCorrect] = useState(0)
  const [indexOfActualQuestion, setIndexOfActualQuestion] = useState(0)

  useEffect(() => {
    sortQuestions()
    nextQuestion()

  }, [])

  function nextQuestion() {
    sortOptions()
    setIndexOfActualQuestion(prev => prev + 1)
  }

  const sortOptions = () => {
    const randomOptions = actualOptions.sort(() => Math.random() - 0.5);
    setActualOptions(randomOptions);
    setActualCorrect(randomOptions.indexOf(actualQuestion.correct_answer));
  }

  const sortQuestions = () => {
    const numeros = Array.from({ length: Questions[topic] }, (_, index) => index);
    const numerosMezclados = numeros.sort(() => Math.random() - 0.5);
    setQuestionOrder(numerosMezclados);
  }

  return (
    <div className='trivia-page'>
        <div className="top-section"></div>
        <div className="question-section">
            <div className="question-container">
                <h2>Question</h2>
            </div>
        </div>
        <div className="options-section">
            <div className="options-container">
                
            </div>
        </div>
    </div>
  )
}

export default Trivia