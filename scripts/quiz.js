import { getQuestionsByQuizId } from "./api-service.js";
const game = document.getElementById('game');
const question = document.getElementById('question');
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const choices = document.getElementsByClassName('choice-text');
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
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter + 1} / ${MAX_QUESTIONS}`;
    currentQuestion = availableQuestions[questionCounter];
    console.log('geh hena', availableQuestions, currentQuestion)

    if (currentQuestion) question.innerText = currentQuestion.question;
    let choiceContainers = document.querySelectorAll('.choice-container');
    if (choiceContainers) {
        choiceContainers.forEach(c => {
            game.removeChild(c);

        })
    }
    if (currentQuestion.type === "mcq" || currentQuestion.type === "t/f") {
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
        console.log('hdhhfhfhf');
        // let rte = document.createElement('div');
        // rte.setAttribute(id,  'div_editor1');
        var editor1 = new RichTextEditor("#div_editor1");
        editor1.
            //game.appendChild(rte);

            //editor1.setHTMLCode("Use inline HTML or setHTMLCode to init the default content.");
            acceptingAnswers = true
    }

    Array.from(choices).forEach((choice) => {
        console.log(choice, acceptingAnswers)

        choice.addEventListener('click', (e) => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.innerText;
            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
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