let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion() {
    //<h2 class="question">${DATA[questionNumber].question}</h2>
    if (questionNumber < DATA.length) {
        return `<div>
    
      <form>
        <fieldset>
        <label class="question">${DATA[questionNumber].question}
        </label>
        <label>
          <input type="radio" value="${DATA[questionNumber].answers[0]}" name="answer" required>
            <span>${DATA[questionNumber].answers[0]}</span>
        </label>
        <label>
          <input type="radio" value="${DATA[questionNumber].answers[1]}" name="answer" required>
            <span>${DATA[questionNumber].answers[1]}</span>
         </label>
        <label>
          <input type="radio" value="${DATA[questionNumber].answers[2]}" name="answer" required>
            <span>${DATA[questionNumber].answers[2]}</span>
        </label>
        <label>
          <input type="radio" value="${DATA[questionNumber].answers[3]}" name="answer" required>
            <span>${DATA[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
          </fieldset>
      </form>
    </div>`;
    } else {
        //Do this
        showResult();
        restartQuiz();
    }
}

//When Start button is clicked, 
// display question answers in form and increament question number
function startQuiz() {
    $('.quizStart').on('click', '.startButton', function(event) {
        $('.quizStart').remove();
        $('.questionForm').css('display', 'block');
        $('.questionNumber').text(1);
    });
}

// render question in DOM
function renderQuestion() {
    $('.questionForm').html(generateQuestion());
}

function onSubmit() {
    $('form').on('submit', function(event) {
        if (questionNumber < 10) {
            event.preventDefault();
            let selectedValue = $('input:checked').val();
            let rightAnswer = `${DATA[questionNumber].correctAnswer}`;
            if (selectedValue === rightAnswer) {
                //console.log("Right");
                rightFeedback();

            } else {
                //console.log("Wrong");
                wrongFeedback();
            }
        } else {
            showResult();
        }
    });
}

function rightFeedback() {
    $('.questionForm').html(`<div class="feedback">
            </div><p class="right"><b>You got it right!</b></p>
            <p>${DATA[questionNumber].explanation}</p>
            <button type=button class="nextButton">Next</button></div>`);
    updateScore();
}

function wrongFeedback() {
    $('.questionForm').html(`<div class="feedback">
            </div><p class="wrong"><b>You got it wrong!</b></p>
            <p>The correct answer is "${DATA[questionNumber].correctAnswer}"</p>
            <p>${DATA[questionNumber].explanation}</p>
            <button type=button class="nextButton">Next</button></div>`);
}

function updateScore() {
    score++;
    $('.score').text(score);
}

function onNext() {
    $('main').on('click', '.nextButton', function(event) {
        questionNumber++;
        if (questionNumber < 10) {
            $('.questionNumber').text(questionNumber + 1);
        }
        renderQuestion();
        onSubmit();


    });
}

function showResult() {
    if (score <= 7) {
        $('.questionForm').html(`<div class="result">
    <h2>You got ${score}/10</h2>
    <p>With more food experience and knowledge, you'll be able to pass this quiz!</p>
    <button type=button class="restartButton">
    Restart Quiz</button></div>`);
    } else {
        $('.questionForm').html(`<div class="result">
    <h2>Great Work! You got ${score}/10</h2>
    <p>You pass this quiz!</p>
    <button type=button class="restartButton">
    Restart Quiz</button></div>`);
    }
}

function restartQuiz() {
    $('main').on('click', '.restartButton', function(event) {
        //location.reload();
        questionNumber = 0;
        $('.questionNumber').text(questionNumber + 1);

        score = 0;
        $('.score').text(score);

        $('.questionForm').html(generateQuestion());


    });
}

//Render functions on load
function runQuiz() {
    startQuiz();
    renderQuestion();
    onSubmit();
    onNext();

}

$(runQuiz)