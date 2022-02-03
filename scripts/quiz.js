import { getQuestionsByQuizId } from "./api-service.js";
const game = document.getElementById('game');
const question = document.getElementById('question');
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const choices = document.getElementsByClassName('choice-text');
const essayTextArea = document.createElement('textarea');
const submitBtn = document.createElement('button');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = -1;
let questions = [];
let user = JSON.parse(localStorage.user);
let availableQuestions = [];
const CORRECT_BONUS = 10;
var MAX_QUESTIONS = 0;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= availableQuestions.length-1) {
        localStorage.score = JSON.stringify(score);
        return window.location.assign('/result.html');
    }
    console.log('counter before', questionCounter)
    questionCounter++;
    console.log('counter after', questionCounter)
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
    currentQuestion = availableQuestions[questionCounter];

    if (currentQuestion) question.innerText = currentQuestion.question;
    let choiceContainers = document.querySelectorAll('.choice-container');
    if (choiceContainers) {
        choiceContainers.forEach(c => {
            game.removeChild(c);
        })
    }
    if (currentQuestion.type === "mcq" || currentQuestion.type === "t/f") {
        essayTextArea.style.display = 'none';
        submitBtn.style.display = 'none';
        currentQuestion.choices.forEach(
            (choice, i) => {
                let choiceContainer = document.createElement('div');
                choiceContainer.className = "choice-container";
                let choicePrefix = document.createElement('div');
                choicePrefix.className = "choice-prefix";
                let choiceText = document.createElement('div');
                choiceText.className = "choice-text";
                choicePrefix.innerText = i + 1;
                choiceText.innerText = choice;
                choiceContainer.appendChild(choicePrefix);
                choiceContainer.appendChild(choiceText);
                game.appendChild(choiceContainer);
                acceptingAnswers = true;

            });
    } else if (currentQuestion.type === "essay") {
        essayTextArea.value = "";
        essayTextArea.style.display = 'block';
        essayTextArea.cols = 4;
        essayTextArea.rows = 5;
        submitBtn.style.display = 'block';
        submitBtn.textContent = 'Submit Answer';
        game.appendChild(essayTextArea);
        game.appendChild(submitBtn);
        acceptingAnswers = true;
        submitBtn.addEventListener('click', (e) => { 
            e.stopImmediatePropagation()
            let answer = essayTextArea.value;
            if (answer == currentQuestion.answer) {
                incrementScore(CORRECT_BONUS);
            }
      
            getNewQuestion();

        });

    }

    Array.from(choices).forEach((choice) => {
        choice.addEventListener('click', (e) => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.innerText;
            console.log('value', typeof selectedChoice.innerText, typeof currentQuestion.answer)
            const classToApply = selectedAnswer == currentQuestion.answer.toString() ? 'correct' : 'incorrect';
            if (classToApply == 'correct') {
                incrementScore(CORRECT_BONUS);
            }
            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000)
        });
    })

}

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#username').textContent = `Hello ${user.name}`;

    getQuestionsByQuizId(user.quizId).then(res => {
        questions = res;
        MAX_QUESTIONS = res.length
        startGame();

    });


});