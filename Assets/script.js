console.log('Test')
let scoreCounter
let questionNumber = 0
var score
var question
var answers
let myInterval

var quizQuestions = [
{question: "Who is the best hockey player of all time?",
answer: ["Mario Lemieux", "Wayne Gretzky", "Sidney Crosby"],
right: "Wayne Gretzky" 
},
{question: "Who won the Hart Trophy in 2020?",
answer: ["Connor McDavid", "Nathan MacKinnon", "Leon Draisaitl"],
right: "Leon Draisaitl" 
},
{question: "Who won the Stanley Cup in 2020?",
answer: ["Pittsburgh Penguins", "Dallas Stars", "Tampa Bay Lightning"],
right: "Tampa Bay Lightning" 
},
{question: "Won won the Calder Trophy last year?",
answer: ["Cale Makar", "Alex Ovechkin", "Quinn Hughes"],
right: "Cale Makar" 
}
]


function startQuiz(){
    scoreCounter = 60
    startCountdown()
    questionNumber = 0 
    var question = quizQuestions[questionNumber]
    var questionCard = document.querySelector('#questionCard')
    questionCard.innerHTML = `<h3>${question.question}</h3>`
    for (let i = 0; i < question.answer.length; i++){
        var answers = question.answer[i]
        questionCard.innerHTML += `<button onClick="selectAnswer(event,'${answers}')" class="btn btn-secondary btn-block">${answers}</button>`
    }
    myInterval = setInterval(startCountdown, 1000)
    document.querySelector(`#initialBox`).classList.add('d-none')
    document.querySelector('#scorePage').classList.add('d-none')
} 

function startCountdown(){
    scoreCounter--;
    document.querySelector('#countdown').innerHTML = `${scoreCounter}`
    if (scoreCounter <= 0 ){
        myInterval = clearInterval(startCountdown);
        document.querySelector('#countdown').innerHTML = 'GAME OVER'
    } 
}

function selectAnswer(event, answers){
    event.preventDefault()
    var question = quizQuestions[questionNumber]
    console.log(`${answers}`)
    console.log(`${question.right}`)
    if (answers === question.right){
        console.log('That is right')
    } else {
        console.log('That is wrong')
        scoreCounter = scoreCounter - 10
    }
    questionNumber++
    if (questionNumber >= quizQuestions.length){
        endQuiz() 

    } else {
     nextQuestion()   
    }
    
}

function nextQuestion(){
    var question = quizQuestions[questionNumber]
    var questionCard = document.querySelector('#questionCard')
    questionCard.innerHTML = `<h3>${question.question}</h3>`
    for (let i = 0; i < question.answer.length; i++){
        var answers = question.answer[i]
        questionCard.innerHTML += `<button onClick="selectAnswer(event,'${answers}')" class="btn btn-secondary btn-block">${answers}</button>`
    }
}

function endQuiz(){
    console.log('End of quiz')
    document.querySelector(`#initialBox`).classList.remove('d-none')
    score = scoreCounter
    clearInterval(myInterval);
    document.querySelector('#countdown').innerHTML = score
    console.log(`Your score is ${score}`)
}

function submitButton(event){
    var initials = document.querySelector('#initials').value
    console.log(`${initials}, ${score}`)
    localStorage.setItem("initials", initials)
    localStorage.setItem("score", score)
    document.querySelector('#recentScore').innerHTML += `<br>${initials} Score: ${score}</br>`
    document.querySelector('#scorePage').classList.remove('d-none')

}

function showScores(){
    document.querySelector('#scorePage').classList.remove('d-none')
    clearInterval(myInterval);
}