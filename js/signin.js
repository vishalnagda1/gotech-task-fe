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

    fetch(HOST + '/signin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',  // Include cookies in the request
    })
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            let redirectTo = '/';
            if (data.message === 'Login successful') {
                message.innerHTML = 'User login successfully. Redirecting to user dashboard page.';
                redirectTo = 'dashboard.html';
            } else {
                message.innerHTML = 'Failed to login user. Redirecting to home page.';
            }
            setTimeout(function () {
                window.location.href = redirectTo;
            }, 3000);  // Redirect after 3 seconds
        })
        .catch(error => {
            console.error('Error during login:', error);
            message.innerHTML = 'Failed to login, Contact your developer.';
        });
}
