const HOST = 'http://127.0.0.1:8000/pdf';

window.onload = function () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',  // Include cookies in the request
        redirect: 'follow'
    };

    fetch(HOST + '/list/', requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};

function logout() {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        redirect: 'follow'
    };

    fetch(HOST + '/signout/', requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        window.location.href = '/';
    })
    .catch(error => console.log('error', error));
}