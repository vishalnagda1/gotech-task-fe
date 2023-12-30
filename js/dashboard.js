const BASE_URL = 'http://127.0.0.1:8000';
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
            <button onclick="downloadFile(${file.file_id}, '${file.file_name}')">Download</button>
            <button onclick="extractData(${file.file_id})">Extract Data</button>
        `;
        fileListContainer.appendChild(fileItem);
    });
}

// Function to download a file
function downloadFile(fileId, fileName) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        redirect: 'follow'
    };

    fetch(`${HOST}/download/${fileId}/`, requestOptions)
        .then(response => response.blob())
        .then(blob => {
            // Create an anchor element
            const downloadLink = document.createElement('a');

            // Create a Blob URL from the blob data
            const blobUrl = window.URL.createObjectURL(blob);

            // Set the anchor's href to the Blob URL
            downloadLink.href = blobUrl;

            // Set the download attribute with the desired file name
            downloadLink.download = fileName;

            // Append the anchor to the document
            document.body.appendChild(downloadLink);

            // Simulate a click to trigger the download
            downloadLink.click();

            // Remove the anchor from the document
            document.body.removeChild(downloadLink);
        })
        .catch(error => console.log('error', error));
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

function renameFile(fileId) {
    const newFileName = prompt('Enter the new name for the file:');
    if (newFileName) {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ new_name: newFileName }),
            redirect: 'follow'
        };

        fetch(HOST + `/rename/${fileId}/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // Refresh the file list after renaming
                window.location.reload();
            })
            .catch(error => console.log('error', error));
    }
}

function deleteFile(fileId) {
    const confirmDelete = confirm('Are you sure you want to delete this file?');
    if (confirmDelete) {
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            redirect: 'follow'
        };

        fetch(HOST + `/delete/${fileId}/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // Refresh the file list after deletion
                window.location.reload();
            })
            .catch(error => console.log('error', error));
    }
}

function extractData(fileId) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ force_extraction: false }),
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    };

    fetch(HOST + `/extract/${fileId}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            handleExtractedData(result.images, result.text);
            // Refresh the file list after extraction
            // window.location.reload();
        })
        .catch(error => console.log('error', error));
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData,
            redirect: 'follow'
        };

        fetch(HOST + '/upload/', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // Refresh the file list after upload
                window.location.reload();
            })
            .catch(error => console.log('error', error));
    }
}

function handleExtractedData(images, text) {
    const modal = document.getElementById('extractedDataModal');
    const modalContent = document.getElementById('extractedDataContent');

    // Clear existing content
    modalContent.innerHTML = '';

    // Display extracted text
    const textElement = document.createElement('p');
    textElement.textContent = 'Extracted Text:\n' + text;
    modalContent.appendChild(textElement);

    // Display extracted images
    images.forEach(imagePath => {
        const imageElement = document.createElement('img');
        imageElement.src = BASE_URL + imagePath;
        modalContent.appendChild(imageElement);
    });

    // Display the modal
    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('extractedDataModal');
    modal.style.display = 'none';
}
