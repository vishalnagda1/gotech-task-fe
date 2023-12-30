const HOST = 'http://127.0.0.1:8000/pdf';

function resetData (e) {
    e.preventDefault();
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    console.log('form reseted');
}

function submitData (e) {
    e.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    fetch(HOST+'/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password}),
    }).then(response => response.json()).then(data => {
        console.log('data', data);
        let message = document.getElementById('message');
        let redirectTo = '/';
        if(data.message === 'User created successfully') {
            message.innerHTML = 'User created successfully. Redirecting to signin page.';
            redirectTo = 'signin.html';
        } else {
            message.innerHTML = 'Failed to create user. Redirecting to home page.';
        }
        setTimeout(function () {
            window.location.href = redirectTo;
        }, 3000);  // Redirect after 3 seconds
    })
    // console.log('form submitted');
}