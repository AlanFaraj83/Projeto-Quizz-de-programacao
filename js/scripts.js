// Declarar variaveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a","b","c","d"];
let points = 0;
let actualQuestion = 0;

const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual linguagem de programação de banco de dados?",
      "answers": [
        {
          "answer": "Haskell",
          "correct": false
        },
        {
          "answer": "Rust",
          "correct": false
        },
        {
          "answer": "Ruby",
          "correct": false
        },
        {
          "answer": "SQL",
          "correct": true
        },
      ]
    },
    {
      "question": "Qual foi a primeira linguagem de programação?",
      "answers": [
        {
          "answer": "BASIC",
          "correct": false
        },
        {
          "answer": "Assembly",
          "correct": false
        },
        {
          "answer": "Fortran",
          "correct": true
        },
        {
          "answer": "JavaScript",
          "correct": false
        },
      ]
    },
    {
      "question": "Para que se usa // em programação?",
      "answers": [
        {
          "answer": "Para comentar o código",
          "correct": true
        },
        {
          "answer": "Para terminar o script",
          "correct": false
        },
        {
          "answer": "Para fazer uma quebra de linha",
          "correct": false
        },
        {
          "answer": "Para fazer um print do texto",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual é a linguagem de Marcação de HiperTexto?",
      "answers": [
        {
          "answer": "Elixir",
          "correct": false
        },
        {
          "answer": "JSON",
          "correct": false
        },
        {
          "answer": "HTML",
          "correct": true
        },
        {
          "answer": "jQuery",
          "correct": false
        },
      ]
    },
    {
      "question": "Quando trabalhamos com menus, além de formatar os links, é necessário posicioná-los.Com isso em mente, marque a alternativa que representa os valores que a propriedade ‘position’ pode receber?",
      "answers": [
        {
          "answer": "static, relative, absolute ou fixed",
          "correct": true
        },
        {
          "answer": "default, relative, absolute ou variable",
          "correct": false
        },
        {
          "answer": "top, bottom, left, right ou center",
          "correct": false
        },
        {
          "answer": "public, private, default ou static",
          "correct": false
        },
      ]
    },
    {
      "question": "A forma correta de declarar uma regra CSS é a seguinte: ?",
      "answers": [
        {
          "answer": "seletor{valor>propriedade}",
          "correct": false
        },
        {
          "answer": "Nenhuma das alternativas",
          "correct": false
        },
        {
          "answer": "seletor{propriedade: valor;}",
          "correct": true
        },
        {
          "answer": "seletor{propriedade = valor}",
          "correct": false
        },
      ]
    },
    {
      "question": "Para exibir valores no corpo da página, é preciso usar a função?",
      "answers": [
        {
          "answer": "Nenhuma das alternativas",
          "correct": false
        },
        {
          "answer": "document.write()",
          "correct": true
        },
        {
          "answer": "alert()",
          "correct": false
        },
        {
          "answer": "Windows.open()",
          "correct": false
        },
      ]
    },
   
]


// Substituiçao do quizz para a primeira pergunta
function init() {
    // criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

  // Limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Alterar o texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere as alternativas
  questions[i].answers.forEach(function(answer, i) {

    // Cria o template do botão quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent= answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // Remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    // Inserir um evento de click no botão
    answerTemplate.addEventListener("click", function() {
      checkAnswer(this);
    });

  });

  // Incrementar o número da questão 
  actualQuestion++;

}

// Verificando resposta do usuário
function checkAnswer(btn) {

  // selecionar todos os botões
  const buttons = answersBox.querySelectorAll("button");

  // verifica se a resposta está correta e adiciona classes nos botões
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {

      button.classList.add("correct-answer");

      // checa se o usuário acertou a pergunta
      if(btn === button) {
        // incremento dos pontos
        points++;
      }

    } else {

      button.classList.add("wrong-answer");

    }

  });

  // Exibir a próxima pergunta
  nextQuestion();
  
}

// Exibi a próxima pergunta
function nextQuestion() {

  // timer para usuário ver as respostas
  setTimeout(function() {

    // vrifica se ainda há perguntas
    if(actualQuestion >= questions.length) {
      // apresenta a msg de sucesso
      showSucessMessage();
      return;

    }

    createQuestion(actualQuestion);

  }, 700);

}

// Exibe a tela final
function showSucessMessage() {

 hideOrShowQuizz();

  // trocar dados da tela de sucesso

  // calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");

}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  
  // zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();



});
  
// Inicialização do Quizz

init();

