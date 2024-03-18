let works;

// Fetch works from the API and store them in the oeuvres variable
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
function filterWorks(categoryId) {
    const filteredWorks = works.filter(function (work) {
        return work.categoryId === categoryId;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
}

// All Filter
const btnFilterAll = document.querySelector(".btn-filter-all");
btnFilterAll.addEventListener("click", function () {
    const worksAll = works.filter(function (work) {
        return work.categoryId !== null;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksAll);
});

// Objets Filter
const btnFilterObjets = document.querySelector(".btn-filter-Objets");
btnFilterObjets.addEventListener("click", function () {
    filterWorks(1);
});

// Appartements & Villa Filter
const btnFilterApptVilla = document.querySelector(".btn-filter-appt-villa");
btnFilterApptVilla.addEventListener("click", function () {
    filterWorks(2);
});

// Hotels et restaurants Filter
const btnFilterHotelResto = document.querySelector(".btn-filter-hotel-resto");
btnFilterHotelResto.addEventListener("click", function () {
    filterWorks(3);
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
    loginElement.textContent = "log out";
    loginElement.href = "index.html";
    loginElement.classList.add("logged");
    loginElement.addEventListener("click", () => {
        // Remove the token from the SessionStorage
        sessionStorage.removeItem("token");
    });
}

// Check if a token is present in the SessionStorage
if (sessionStorage.getItem("token")) {
    // Modify the login li element to display "log out" bold text. Modify the href to the login page
    let loginElement = document.getElementById("login");
    loginElement.textContent = "log out";
    loginElement.href = "index.html";
    loginElement.classList.add("logged");
    loginElement.addEventListener("click", () => {
        // Remove the token from the SessionStorage
        sessionStorage.removeItem("token");
    });

    // Create a new banner element
    let banner = document.createElement('div');
    banner.textContent = 'Vous êtes connecté.';
    banner.classList.add('banner');

    // Add the banner to the top of the body
    document.body.insertBefore(banner, document.body.firstChild);
}