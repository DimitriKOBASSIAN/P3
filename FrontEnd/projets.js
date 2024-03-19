// Fetch works from the API and store them in the oeuvres variable
let works;

try {
    const reponse = await fetch('http://localhost:5678/api/works/');
    works = await reponse.json();
} catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des oeuvres depuis l'API:", error);
}
console.log(works)

function generateWorks(works){

    for (let i = 0; i < works.length; i++) {

        const figure = works[i];
        // Selecting the DOM element that will host the fiches
        const sectionFiches = document.querySelector(".gallery");

        // Creating a tag dedicated to a figure
        const worksElement = document.createElement("figure");

        // Creating tags for the image, the title and the alt
        sectionFiches.appendChild(worksElement);
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = figure.title;

        // Linking the article tag to the sectionFiches
        sectionFiches.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(nomElement);
    }
    
}

generateWorks(works);


// Function to filter works based on category
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories/');
        return await response.json();
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des catégories depuis l'API:", error);
    }
}

function filteredCategories(id) {
    if (id === null) {
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(works);
    } else {
        const filteredWorks = works.filter(work => work.categoryId === id);
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(filteredWorks);
    }
}

// Fetch categories from the API and store them in the categories variable
let categories = [];
fetchCategories().then(data => {
    categories = data;
    console.log(categories);
});

// Filter buttons
const filterButtons = [
    { selector: ".btn-filter-all", categoryId: null },
    { selector: ".btn-filter-Objets", categoryId: 1 },
    { selector: ".btn-filter-appt-villa", categoryId: 2 },
    { selector: ".btn-filter-hotel-resto", categoryId: 3 }
];

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    const btn = document.querySelector(button.selector);
    btn.addEventListener("click", function () {
        filteredCategories(button.categoryId);
    });
});

// Changing button aspect when filter is active
const btns = document.querySelectorAll(".button-filter");
btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        btns.forEach(function (btn) {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    });
});

// Check if a token is present in the SessionStorage
if (sessionStorage.getItem("token")) {
    // Modify the login element to a log out
    let loginElement = document.getElementById("login");
    loginElement.textContent = "logout";
    loginElement.href = "index.html";
    loginElement.classList.add("logged");
    loginElement.addEventListener("click", () => {
        // Remove the token from the SessionStorage
        sessionStorage.removeItem("token");
    });
}

// Modifying the header style and behaviour when the user is logged in
// Check if a token is present in the SessionStorage
if (sessionStorage.getItem("token")) {
    // Modify the login li element to display "log out" bold text. Modify the href to the login page
    let loginElement = document.getElementById("login");
    loginElement.textContent = "logout";
    loginElement.href = "index.html";
    loginElement.classList.add("logged");
    loginElement.addEventListener("click", () => {
        // Remove the token from the SessionStorage
        sessionStorage.removeItem("token");
    });

    // Create a new banner element
    let banner = document.createElement('div');
    banner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
    banner.classList.add('banner');

    // Add the banner to the top of the body
    document.body.insertBefore(banner, document.body.firstChild);
}