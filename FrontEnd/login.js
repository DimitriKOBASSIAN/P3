fetch('http://localhost:5678/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'your_username',
        password: 'your_password'
    })
})
    .then(response => response.json())
    .then(data => {
        // Handle the response data here
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occur during the request
        console.error(error);
    });