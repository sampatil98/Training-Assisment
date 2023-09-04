const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const progressElement = document.getElementById('progress');
const timerDisplay = document.getElementById('timer');

let currentQuestionIndex = 0;
let userAnswers = [];
const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'London', 'Madrid'],
        correctAnswer: 'Paris'
    },
    {
        question: 'What is the color of mango',
        options: ['red', 'yellow', 'pink', 'blue'],
        correctAnswer: 'yellow'
    },
    {
        question: 'What is the curancy of india?',
        options: ['cent', 'pound', 'rupies', 'dolar'],
        correctAnswer: 'rupies'
    }
    // Add more questions and options here
];

let timer; // Timer variable

function startTimer(duration) {
    let timerSeconds = duration * 60; // Convert minutes to seconds

    timer = setInterval(function () {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timerSeconds <= 0) {
            clearInterval(timer);
            // Call a function to end the test and display results
            endTest();
        } else {
            timerSeconds--;
        }
    }, 1000);
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.setAttribute("class","optionsbtn");
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => {
            let eachbtn=document.querySelectorAll(".optionsbtn");
            eachbtn.forEach((ele)=>{
                ele.style.backgroundColor=null;
            })
            optionButton.style.backgroundColor="green";
           
            userAnswers[currentQuestionIndex] = option;
        });
        optionsElement.appendChild(optionButton);
    });

    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

loadQuestion();
startTimer(30);
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // The user has completed the test; you can display results or take action here
        showResults();
        
    }
});

function showResults() {
    // Calculate and display user's score and progress
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    alert(`You scored ${score} out of ${questions.length} (${percentage.toFixed(2)}%)`);
    window.location.href="../index.html";
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].correctAnswer) {
            score++;
        }
    }
    return score;
}
