const HOST = 'http://127.0.0.1:8000/pdf';

function resetData(e) {
    e.preventDefault();
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    console.log('form reset');
}

function submitData(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let message = document.getElementById('message');

    fetch(HOST + '/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    }).then(response => response.json()).then(data => {
        console.log('data', data);
        let redirectTo = '/';
        if (data.message === 'User created successfully') {
            message.innerHTML = 'User created successfully. Redirecting to signin page.';
            redirectTo = 'signin.html';
        } else {
            message.innerHTML = 'Failed to create user. Redirecting to home page.';
        }
        setTimeout(function () {
            window.location.href = redirectTo;
        }, 3000);  // Redirect after 3 seconds
    })
        .catch(error => {
            console.error('Error during login:', error);
            message.innerHTML = 'Failed to signup, Contact your developer.';
        });
}