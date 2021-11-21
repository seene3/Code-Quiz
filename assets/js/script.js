const startButtonEl = document.getElementById('start-btn');
const startDivEl = document.getElementById('start');
const questionContainerEl = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButtonEl.addEventListener('click', startGame);

function startGame() {
    startDivEl.style.display = 'none';
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    questionElement.id = question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.classList.add('btn-lg')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer() {

}

const questions = [
    {
        question: 'What is 2+2?',
        answers: [
            { text: 4, correct: true },
            { text: 22, correct: false },
            { text: 2, correct: false },
            { text: 3, correct: false },
        ],

        question: 'What does CSS stand for',
        answers: [
            { text: 'Cascading Structure Sheet', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Computer Style Sheet', correct: false },
            { text: 'Computation Suited Syntax', correct: false },
        ],

        question: 'In css how do you call an Id?',
        answers: [
            { text: 'the name', correct: false },
            { text: '.', correct: false },
            { text: '#', correct: true },
            { text: '/', correct: false },
        ],

        question: 'In css how do you call a class?',
        answers: [
            { text: 'the name', correct: false },
            { text: '#', correct: false },
            { text: '/', correct: false },
            { text: '.', correct: true },
        ]
    }
]