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
    let errorText = document.querySelector(".error-text");
    if (!errorText) {
        errorText = document.createElement("p");
        errorText.classList.add("error-text"); // add class for CSS styling
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