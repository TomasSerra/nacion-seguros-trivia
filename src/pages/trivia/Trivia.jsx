import React, {useEffect, useState, useRef} from 'react'
import './Trivia.scss'
import TimeBar from '../../components/timeBar/TimeBar'

function Trivia({topic, goToNextPage, intervalTime, questions, setQuestionInfo, questionTime, numberOfQuestions=questions[topic].length, logo}) {
  const [actualQuestion, setActualQuestion] = useState('')
  const [actualOptions, setActualOptions] = useState([])
  const [firstTime, setFirstTime] = useState(true)
  const [actualCorrect, setActualCorrect] = useState('')
  const [questionOrder, setQuestionOrder] = useState([])
  const [indexOfActualQuestion, setIndexOfActualQuestion] = useState(0)
  const [hasAnsweredCorrect, setHasAnsweredCorrect] = useState(0)
  const [answers, setAnswers] = useState({}) //Puede ser borrado si no se quiere guardar las respuestas
  const [time, setTime] = useState(questionTime)
  const interval = questionTime/1000
  const intervalRef = useRef();
  const [thisQuestions, setThisQuestions] = useState([])
  // Función para seleccionar preguntas aleatorias
  const selectRandomQuestions = (questions, n) => {
    const questionsClone = [...questions];
    let selected = [];
    let numberSet = [];

    while (numberSet.length < n) {
      const randNum = Math.floor(Math.random() * questionsClone.length);
      if(!numberSet.includes(randNum)){
        numberSet.push(randNum);
      }
    }

    for (let number of numberSet) {
      selected.push(questionsClone[number]);
    }
    return selected;
  };
  
  

  useEffect(() => {
    const thisQuestions = selectRandomQuestions(JSON.parse(JSON.stringify(questions[topic])), numberOfQuestions);
    sortQuestions(thisQuestions)
  }, [])

  useEffect(() => {
    if(firstTime==false){
      nextQuestion()
    }
  }, [firstTime])

  useEffect(() => {
    if(time <= 0){
      checkAnswer('')
    }
    }, [time])


  function nextQuestion() {
    let newOptions = thisQuestions[questionOrder[indexOfActualQuestion]]["options"]
    sortOptions(newOptions)
    setActualQuestion(thisQuestions[questionOrder[indexOfActualQuestion]]["question"]);
    setIndexOfActualQuestion(prev => prev+1)
    restartTimer()
  }

  function restartTimer() {
    setTime(questionTime)

    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime - interval)
    }, interval*1000)
  }

  const sortOptions = (newOptions) => {
    setActualCorrect(newOptions[newOptions.length - 1]);
    const randomOptions = newOptions.sort(() => Math.random() - 0.5);
    setActualOptions(randomOptions);
  }

  const sortQuestions = (thisQuestions) => {
    const numeros = []
    for (let i = 0; i < thisQuestions.length; i++) {
      numeros.push(i);
    }
    let numerosMezclados = numeros.sort(() => Math.random() - 0.5);
    setQuestionOrder(numerosMezclados)
    setFirstTime(false)
    setThisQuestions(thisQuestions)
  }

  const checkAnswer = (answer) => {
    if(answer === actualCorrect){
      setHasAnsweredCorrect(true)
      setAnswers(prev => ({...prev, [actualQuestion]: 1})) //Puede ser borrado si no se quiere guardar las respuestas
      setQuestionInfo(prev => ({...prev, correct: prev.correct + 1, total: prev.total + 1}))
    }
    else{
      setHasAnsweredCorrect(false)
      setAnswers(prev => ({...prev, [actualQuestion]: 0})) //Puede ser borrado si no se quiere guardar las respuestas
      setQuestionInfo(prev => ({...prev, total: prev.total + 1}))
    }
    clearInterval(intervalRef.current)
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
          <img src={logo} />
        </div>
        <div className="question-section">
            <div className='time-bar-container'>
              <TimeBar maxTime={questionTime} actualTime={time} colors={{barColor: '#0062AD', backgroundColor: '#003d6b'}}/>
            </div>
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