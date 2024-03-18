// Add event listener to the form and prevent the default action
document.addEventListener("submit", (connect) => {
    connect.preventDefault();
let form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
};

// Fetch the API and send the stringified data
fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    email: form.email.value,
    password: form.password.value,
    }),
}).then((response) => {
    if (response.status !== 200) {
    alert("Email ou mot de passe erronés"); //Display an alert if the status is not 200
    } else {
    response.json().then((data) => {
        sessionStorage.setItem("token", data.token); //store the token in the session storage
        window.location.replace("index.html"); //redirect to the index page
    });
    }
});
});