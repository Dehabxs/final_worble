let score = 0;
let verified = false;

const serverUrl = 'http://localhost:3000'; // Adjust if the backend is hosted elsewhere

function goHome() {
    window.location.href = '../pages/home.html';
}

function createQuestion(question, ans1, ans2, ans3, ans4, correctAnswer) {
    document.getElementById('question').textContent = question;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    [ans1, ans2, ans3, ans4].forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, correctAnswer);
        choicesDiv.appendChild(button);
    });

    document.getElementById('test_box').style.display = 'block';
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
        alert('Correct!');
    } else {
        alert('Wrong answer, try again.');
    }
    document.getElementById('score').textContent = score;
    updateScoreboard();
}

async function sendVerificationCode() {
    const email = document.getElementById('email_input').value;
    try {
        const response = await fetch(`${serverUrl}/sendVerificationCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        alert(data.message);
        document.getElementById('code_input').style.display = 'block';
        document.getElementById('code_input').nextElementSibling.style.display = 'block';
    } catch (error) {
        alert('Failed to send verification code.');
    }
}

async function verifyCode() {
    const email = document.getElementById('email_input').value;
    const code = document.getElementById('code_input').value;
    try {
        const response = await fetch(`${serverUrl}/verifyCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code }),
        });
        const data = await response.json();
        if (data.message) {
            alert(data.message);
            document.getElementById('username_input').style.display = 'block';
            document.getElementById('username_input').nextElementSibling.style.display = 'block';
            document.getElementById('code_input').style.display = 'none';
            document.getElementById('code_input').nextElementSibling.style.display = 'none';
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to verify code.');
    }
}

async function completeRegistration() {
    const email = document.getElementById('email_input').value;
    const username = document.getElementById('username_input').value;
    if (!username) {
        alert('Please enter a username.');
        return;
    }
    try {
        const response = await fetch(`${serverUrl}/createAccount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username }),
        });
        const data = await response.json();
        if (data.message) {
            verified = true;
            alert(data.message);
            document.getElementById('verification_box').style.display = 'none';
            createQuestion('What is 2 + 2?', '3', '4', '5', '6', '4');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to create account.');
    }
}

async function updateScoreboard() {
    try {
        const response = await fetch(`${serverUrl}/scoreboard`);
        const scoreboard = await response.json();
        const scoreboardList = document.getElementById('scoreboard');
        scoreboardList.innerHTML = '';
        scoreboard.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.username}: ${user.score}`;
            scoreboardList.appendChild(listItem);
        });
        document.getElementById('scoreboard_box').style.display = 'block';
    } catch (error) {
        alert('Failed to update scoreboard.');
    }
}
