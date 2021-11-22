//start button: start timer, go to first question, hide start button
//click button if right move to next question replace question, if wrong move next question + time penalty
//finish quiz when out of time or no more questions 

//to do: timer func, time penalty func, finish next question func
const startButtonEl = document.getElementById('start-btn');
const startDivEl = document.getElementById('start');
const questionContainerEl = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultEl = document.getElementById('result')
const formEl = document.getElementById('highscore');
const timer = document.getElementById('timer')
let timeSecond = 60;
let countingDown = true;

function countdown() {
    const countdown = setInterval(() => {
        if (countingDown) {
            timeSecond--;
        }
        timer.innerHTML = timeSecond
        if (timeSecond <= 0) {
            clearInterval(countdown)
        }
    }, 1000)
}

let currentQuestionIndex = 0

startButtonEl.addEventListener('click', startGame);



//hide start button, show first question, start timer
function startGame() {
    countdown();
    startDivEl.style.display = 'none';
    questionContainerEl.classList.remove('hide')
    showQuestion(currentQuestionIndex)
}

//getting question and answer from array
function showQuestion(questionIndex) {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    questionElement.innerText = questions[questionIndex].question
    questionElement.id = questionIndex;
    let currentQuestion = questions[questionIndex]
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.classList.add('btn-lg')
        button.dataset.correct = answer.correct
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//clikcing button and checking if right and changing class 
//make if statement if right move to next, if wrong call time penalty move to next question 
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = JSON.parse(selectedButton.dataset.correct)
    setStatusClass(selectedButton, correct)
    currentQuestionIndex++
    if (currentQuestionIndex === questions.length || timeSecond === 0) {
        //end timer go to results
        endQuiz()
    }
    else {
        showQuestion(currentQuestionIndex)
    }
}

//getting setting class if answer right or wrong
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        resultEl.classList.remove('hide')
        resultEl.innerHTML = "Correct"
    }
    else{
        resultEl.classList.remove('hide')
        resultEl.innerHTML = "Wrong"
        timeSecond = timeSecond - 10
    }
}

//remove right and wrong class
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endQuiz() {
    questionContainerEl.classList.add('hide')
    resultEl.classList.add('hide')
    formEl.classList.remove('hide')
    countingDown = false
}

//questions
const questions = [
    {
        question: 'What is commenly used as placeholder text?',
        answers: [
            { text: "lorem Ipsum", correct: true },
            { text: "Song lyrics", correct: false },
            { text: "Random letters", correct: false },
            { text: "Random quotes", correct: false },
        ]
    }, {
        question: 'What does CSS stand for',
        answers: [
            { text: 'Cascading Structure Sheet', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Computer Style Sheet', correct: false },
            { text: 'Computation Suited Syntax', correct: false },
        ],
    },  {
        question: 'In css how do you call an Id?',
        answers: [
            { text: 'the name', correct: false },
            { text: '.', correct: false },
            { text: '#', correct: true },
            { text: '/', correct: false },
        ]
    },  {
        question: 'In css how do you call a class?',
        answers: [
            { text: 'the name', correct: false },
            { text: '#', correct: false },
            { text: '/', correct: false },
            { text: '.', correct: true },
        ]
    }
]