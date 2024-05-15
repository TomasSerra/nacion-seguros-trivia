import React, {act, useEffect, useState} from 'react'
import './Trivia.scss'
import Questions from '../../assets/data/questions.json'

function Trivia({topic, goToNextPage, intervalTime}) {
  const [actualQuestion, setActualQuestion] = useState('')
  const [actualOptions, setActualOptions] = useState([])
  const [firstTime, setFirstTime] = useState(true)
  const [actualCorrect, setActualCorrect] = useState('')
  const [questionOrder, setQuestionOrder] = useState([])
  const [indexOfActualQuestion, setIndexOfActualQuestion] = useState(0)
  const [hasAnsweredCorrect, setHasAnsweredCorrect] = useState(0)

  const thisQuestions = Questions[topic];

  useEffect(() => {
    sortQuestions()
  }, [])

  useEffect(() => {
    if(firstTime==false){
      nextQuestion()
    }
  }, [firstTime])


  function nextQuestion() {
    let newOptions = thisQuestions[questionOrder[indexOfActualQuestion]]["options"]
    sortOptions(newOptions)
    setActualQuestion(thisQuestions[questionOrder[indexOfActualQuestion]]["question"]);
    setIndexOfActualQuestion(prev => prev+1)
  }

  const sortOptions = (newOptions) => {
    setActualCorrect(newOptions[newOptions.length - 1]);
    const randomOptions = newOptions.sort(() => Math.random() - 0.5);
    setActualOptions(randomOptions);
  }

  const sortQuestions = () => {
    const numeros = []
    for (let i = 0; i < thisQuestions.length; i++) {
      numeros.push(i);
    }
    let numerosMezclados = numeros.sort(() => Math.random() - 0.5);
    setQuestionOrder(numerosMezclados)
    setFirstTime(false)
  }

  const checkAnswer = (answer) => {
    if(answer === actualCorrect){
      setHasAnsweredCorrect(true)
    }
    else{
      setHasAnsweredCorrect(false)
    }
    setTimeout(() => {
      if(indexOfActualQuestion < thisQuestions.length){
        setHasAnsweredCorrect(0)
        nextQuestion()
      }
      else{
        goToNextPage()
      }
    }, intervalTime*1000)
  }

  return (
    <div className='trivia-page'>
        <div className="top-section"></div>
        <div className="question-section">
            <div className="question-container">
                <h2>{actualQuestion}</h2>
            </div>
        </div>
        <div className="options-section">
            <div className="options-container">
                {actualOptions && actualOptions.map((option, index) => (
                    <button className={"option-button" + (option===actualCorrect && hasAnsweredCorrect!==0 ? " success-option" : hasAnsweredCorrect===false ? " incorrect-option" : "")} key={index} onClick={() => {checkAnswer(option)}}>{option}</button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Trivia