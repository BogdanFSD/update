// start button
const mainContainer = document.querySelector('.container');
const start = document.querySelector(".start-btn");

// game rules section
const gamerules = document.getElementById('Gamerules')
const play = document.querySelector(".btn-play");

// question section
const timer = document.querySelector(".timer-sec");
const questionContainer = document.querySelector('.question-container');
const questionA = document.getElementById('question');
const answerBtn = document.getElementById('answer-buttons');
const next = document.querySelector(".next-btn");
const end = document.querySelector(".end-btn");

// end section
const endContainer = document.querySelector('.endContainer');
const newgame = document.querySelector(".newgame-btn");

let quizStartTime = 0;
let time = 20;
let countdown;
let mixedQuestion;
let questionIndex = 0;
let score = 0;

start.addEventListener('click', gameRules);

play.addEventListener('click',() => {
 startTimer();
 startGame();
});

next.addEventListener('click', () => {
  questionIndex++;
  setNextQuestion();
});

end.addEventListener('click', endQuiz);

newgame.addEventListener('click', () => {
  endContainer.classList.add('hide');
  startTimer();
  startGame();
});

function gameRules (){
  gamerules.classList.remove('hide');
};

function startGame (){
  quizStartTime = new Date();
  time = 20;
  timer.innerHTML = time;
  end.classList.add('hide')
  questionContainer.classList.remove('hide');
  gamerules.classList.add('hide');
  mixedQuestion = questions.sort(() => Math.random() - 0.5).slice(0, 2);
  questionIndex = 0;
  score = 0;
  
  
  showQuestion();
}

function showQuestion() {
  const currentQuestion = mixedQuestion[questionIndex];
  questionA.innerText = currentQuestion.question;
  answerBtn.innerHTML = '';
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerBtn.appendChild(button);
  });
  time = 20;
  timer.innerHTML = time;
  startTimer();
}

function setNextQuestion() {
  resetState();
  if (questionIndex < mixedQuestion.length) {
    
    showQuestion();
  } else {
    endQuiz();
  }
}

function resetState() {
  clearStatusClass(document.body);
  next.classList.add('hide');
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct;
  setStatusClass(document.body, isCorrect);
  Array.from(answerBtn.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (isCorrect) {
    score++;
  }
  if (questionIndex < mixedQuestion.length - 1) {
    next.classList.remove('hide');
  } else {
    end.innerText = `Show my result`
    end.classList.remove('hide');
  }
}

function setStatusClass(element, isCorrect) {
  clearStatusClass(element);
  if (isCorrect) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function endQuiz() {
  clearInterval(countdown); // stop the timer
  const quizEndTime = new Date();
  const elapsedTime = (quizEndTime - quizStartTime) / 1000 - 2;

  questionContainer.classList.add('hide');
  document.getElementById("presult").innerHTML = `Your Score: ${score} / ${mixedQuestion.length}<br>You spent: ${elapsedTime.toFixed(1)} seconds to solve this quiz.<br> Can you make better?`;
  endContainer.classList.remove('hide');
};

function startTimer() {
  clearInterval(countdown);
  countdown = setInterval(function() {
    if (time > 0) {
      time--;
      timer.innerHTML = time;
    }  else  {
      clearInterval(countdown);
      questionIndex++;
      setNextQuestion();
    }
  }, 1000);
}











const questions = [
    {
      question: 'Who is the evil in Harry Potter?',
      answers: [
        { text: 'Voldemort', correct: true },
        { text: 'Severus Snape', correct: false },
        { text: 'Dobby', correct: false },
        { text: 'Gandalf', correct: false }
      ]
    },
    {
      question: 'What happened with Don Quixote?',
      answers: [
        { text: 'Miguel de Cervantes', correct: true },
        { text: 'Mark Twain ', correct: false },
        { text: 'Cillian Murphy', correct: false },
        { text: 'Sancho Panza', correct: false }
      ]
    },
    {
      question: 'What character is Queequeg ?',
      answers: [
        { text: 'Captain', correct: false },
        { text: 'Cannibal ', correct: true },
        { text: 'Moby Dick', correct: false },
        { text: 'Pirat', correct: false }
      ]
    },
    {
      question: 'Because of what Hamlet died?',
      answers: [
        { text: 'Car accident', correct: false },
        { text: 'Poison', correct: false },
        { text: 'Rapier', correct: false },
        { text: 'Poisoned rapier', correct: true }
      ]
    },
    {
        question: 'What is the second Harry Potter book called?',
        answers: [
          { text: 'Jane Eyre', correct: false },
          { text: 'Oliver Twist', correct: false },
          { text: 'Dragon', correct: false },
          { text: 'Harry Potter & The Chamber of Secrets', correct: true }
        ]
      },
      {
        question: 'Who wrote Frankenstein?',
        answers: [
          { text: 'Mary Shelley', correct: true },
          { text: 'Danielle Steel', correct: false },
          { text: 'J. K. Rowling', correct: false },
          { text: 'Osamu Tezuka', correct: false }
        ]
      },
      {
        question: 'What wrote Homage to Catalonia?',
        answers: [
          { text: 'George Orwell', correct: true },
          { text: 'Irving Wallace ', correct: false },
          { text: 'Cillian Murphy', correct: false },
          { text: 'Sancho Panza', correct: false }
        ]
      },
      {
        question: 'Who took pen name as Eric Arthur Blair?',
        answers: [
          { text: 'Mark Twain', correct: false },
          { text: 'George Orwell ', correct: true },
          { text: 'Stan Lee', correct: false },
          { text: 'Dr. Seuss', correct: false }
        ]
      },
      {
        question: 'Name the first book in the Noughts and Crosses series?',
        answers: [
          { text: 'Noughts & Crosses', correct: false },
          { text: 'Knife Edge', correct: false },
          { text: 'Double Cross', correct: false },
          { text: 'Black & White', correct: true }
        ]
      },
      {
          question: 'What was the name of Charles Dickens last book which was left unfinished?',
          answers: [
            { text: 'The Old Man of Lochnagar', correct: false },
            { text: 'Oliver Twist', correct: false },
            { text: 'Charlotte, Emily and Anne Bronte', correct: false },
            { text: 'The Mystery Of Edwin Drood', correct: true }
          ]
        }
  ];