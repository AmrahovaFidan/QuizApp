const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
        ],
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false },
        ],
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Giraffe", correct: false },
            { text: "Blue Whole", correct: true },
            { text: "Elephant", correct: false },
            { text: "Leon", correct: false },
        ],
    },
];

let question = document.querySelector("#question");
let answerBtn = document.querySelector("#answerBtn");
let nextBtn = document.querySelector("#nextBtn");

let current = 0;
let score = 0;

function startQuiz() {
    current = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    reset();

    let currentQuestion = questions[current];
    let questionNo = current + 1;
    question.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function reset() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    console.log(isCorrect);
    if (isCorrect) {
        selectedBtn.classList.add("correct");
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
            score++;
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
};

function showScore() {
    reset();
    question.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    current++;
    if (current < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (current < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
});

startQuiz();