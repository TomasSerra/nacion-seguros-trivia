import React, {useEffect, useState} from 'react'
import './Trivia.scss'
import Logo from './../../assets/imgs/trivia/logo.png'

function Trivia({topic, goToNextPage, intervalTime, questions, setQuestions}) {
  const [actualQuestion, setActualQuestion] = useState('')
  const [actualOptions, setActualOptions] = useState([])
  const [firstTime, setFirstTime] = useState(true)
  const [actualCorrect, setActualCorrect] = useState('')
  const [questionOrder, setQuestionOrder] = useState([])
  const [indexOfActualQuestion, setIndexOfActualQuestion] = useState(0)
  const [hasAnsweredCorrect, setHasAnsweredCorrect] = useState(0)
  const [answers, setAnswers] = useState({}) //Puede ser borrado si no se quiere guardar las respuestas
  
  const thisQuestions = questions[topic];

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
      setAnswers(prev => ({...prev, [actualQuestion]: 1})) //Puede ser borrado si no se quiere guardar las respuestas
      setQuestions(prev => ({...prev, correct: prev.correct + 1, total: prev.total + 1}))
    }
    else{
      setHasAnsweredCorrect(false)
      setAnswers(prev => ({...prev, [actualQuestion]: 0})) //Puede ser borrado si no se quiere guardar las respuestas
      setQuestions(prev => ({...prev, total: prev.total + 1}))
    }
    setTimeout(() => {
      if(indexOfActualQuestion < thisQuestions.length){
        setHasAnsweredCorrect(0)
        nextQuestion()
      }
      else{
        storageAnswers(answer === actualCorrect) //Puede ser borrado si no se quiere guardar las respuestas
        goToNextPage()
      }
    }, intervalTime*1000)
  }

  // ***** OPCIONAL *****

  const storageAnswers = (correct) => {
    let newAnswers = answers
    newAnswers[actualQuestion] = correct ? 1 : 0;
    localStorage.setItem('answers', JSON.stringify(modifyJSON(answers)));
  }

  const modifyJSON = (actualAnswers) => {
    const transformedResponses = localStorage.getItem('answers') == null ? {} : JSON.parse(localStorage.getItem('answers'));
    for (const [question, answer] of Object.entries(actualAnswers)) {
      if (!transformedResponses[question]) {
        transformedResponses[question] = { correctas: answer, total: 1 };
      }
      else{
        transformedResponses[question]["total"] += 1;
        transformedResponses[question]["correctas"] += answer;
      }
    }
    return transformedResponses;
  }

  // *******************

  return (
    <div className='trivia-page'>
        <div className="top-section">
          <img src={Logo} />
        </div>
        <div className="question-section">
            <div className="question-container">
                <h2>{actualQuestion}</h2>
            </div>
        </div>
        <div className="options-section">
            <div className="options-container">
                {actualOptions && actualOptions.map((option, index) => (
                    <button className={"option-button" + (option===actualCorrect && hasAnsweredCorrect!==0 ? " correct-option" : hasAnsweredCorrect===false ? " incorrect-option" : "")} key={index} onClick={() => {checkAnswer(option)}} disabled={hasAnsweredCorrect!==0}>{option}</button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Trivia