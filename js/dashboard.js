const HOST = 'http://127.0.0.1:8000/pdf';

window.onload = function () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',  // Include cookies in the request
        redirect: 'follow'
    };

    // Fetch the list of files
    fetch(HOST + '/list/', requestOptions)
        .then(response => response.json())
        .then(result => {
            // Update the UI with the list of files
            displayFileList(result.files);
        })
        .catch(error => console.log('error', error));
};

function displayFileList(files) {
    const fileListContainer = document.getElementById('fileList');

    // Clear existing content
    fileListContainer.innerHTML = '';

    // Display each file in the list
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.innerHTML = `
            <span>${file.file_name}</span>
            <button onclick="renameFile(${file.file_id})">Rename</button>
            <button onclick="deleteFile(${file.file_id})">Delete</button>
        `;
        fileListContainer.appendChild(fileItem);
    });
}

function logout() {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        redirect: 'follow'
    };

    fetch(HOST + '/signout/', requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            window.location.href = '/';
        })
        .catch(error => console.log('error', error));
}
