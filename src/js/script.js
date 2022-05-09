// Js code goes here

const submitBtn = document.getElementById('submit-button');
const disableSubmitBtn = () => {
    submitBtn.setAttribute("disabled", true);
    submitBtn.classList.add("disabled");
};
const enableSubmitBtn = () => {
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove("disabled");
};
submitBtn.addEventListener("click", function(){
    validateQuestion();
});

const instructions = document.getElementById('pre-quiz-instructions');
const showInstructions = () => instructions.classList.remove('d-none');
const hideInstructions = () => {
    instructions.style.display="none";
    instructions.classList.add('d-none')
};

const loader = document.getElementById('loader-view');
const showLoader = () => loader.classList.remove('d-none');
const hideLoader = () => loader.classList.add('d-none');

const quiz = document.getElementById('quiz');
const showQuiz = () => quiz.classList.remove('d-none');
const hideQuiz = () => quiz.classList.add('d-none');

const startBtn = document.getElementById('start-button');
const showStartBtn = () => startBtn.classList.remove('d-none');
const hideStartBtn = () => startBtn.classList.add('d-none');
startBtn.addEventListener("click", function(){ 
    const ID = document.getElementById('current-question-id').value;
    callQuestionApi(ID);
});

const callQuestionApi = (ID) => {
    const url = ` https://jsonmock.hackerrank.com/api/questions/${ID}`;

    hideInstructions();
    showLoader();

    fetch(url)
    .then(response => response.json())
    .then(data => {
        hideLoader();
        hideStartBtn();
        showQuiz();
        disableSubmitBtn();
        loadQuestionView(data.data);
        // console.log(data.data)
    });
}

const question = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const loadQuestionView = (data) => {
    const q = data.question;
    const a = data.answer;
    const options = data.options;

    question.innerHTML = q;
    question.dataset.answer = a;

    const optionsHtml = options.map(function (option,index) {
        return `<div data-id="${index}" class="list-group-item">${option}</div>`;
    }).join('');
    optionsContainer.innerHTML = optionsHtml;

    const items = document.querySelectorAll('#options-container > div')

    function setActive(e){
        const parent = e.target.parentNode
        const active = parent.querySelector('.user-answer')
        if(active){
            active.classList.toggle('user-answer')
        }
        e.target.classList.add('user-answer');
        enableSubmitBtn();
    }

    items.forEach(listItem => {
        listItem.addEventListener("click", setActive)
    })

}

const validateQuestion = () => {
    const answerId = question.dataset.answer;
    const selected = document.querySelector('#options-container div.user-answer');
    const selectedAnserId = selected.dataset.id;
    const correct = document.querySelector('#options-container div[data-id="'+answerId+'"]');

    if(answerId == selectedAnserId)
    {
        selected.classList.add('correct-answer');
    }
    else {
        selected.classList.add('wrong-answer');
        correct.classList.add('correct-answer');
    }

}

// initialize
hideLoader();
hideQuiz();