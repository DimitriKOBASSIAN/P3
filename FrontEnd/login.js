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
}).then((response) => { // Check the response status
    if (response.status !== 200) { // If the status is not 200, display an error message
    let errorText = document.querySelector(".error-text");
    if (!errorText) { // If the error message is not already displayed, create a new paragraph and display the error message
        errorText = document.createElement("p");
        errorText.classList.add("error-text"); // add class for error's CSS styling
        errorText.textContent = "L'adresse email ou le mot de passe est incorrect. Veuillez réessayer.";
        document.body.appendChild(errorText);
    }
    } else {
    response.json().then((data) => {
        // Clear session storage if a token is already stored
        if (sessionStorage.getItem("token")) {
            sessionStorage.removeItem("token");
        }
        sessionStorage.setItem("token", data.token); //store the token in the session storage
/*         console.log(data); //output the data to the console to check if the token is stored */
        window.location.replace("index.html"); //redirect to the index page
    });
    }
});
});

// Check if a token is present in the SessionStorage
if (sessionStorage.getItem("token")) {
    // Modify the login element to a log out
    let loginElement = document.getElementById("login");
    loginElement.textContent = "log out";
    loginElement.addEventListener("click", () => {
        // Remove the token from the SessionStorage
        sessionStorage.removeItem("token");
        // Redirect to the login page
        window.location.replace("login.html");
    });
}