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


// All Filter
const BtnFilterAll = document.querySelector(".btn-filter-all");
BtnFilterAll.addEventListener("click", function () {
    const worksAll = works.filter(function (works) {
        return works.categoryId !== null;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksAll);
});

// Objets Filter
const BtnFilterObjets = document.querySelector(".btn-filter-Objets");
BtnFilterObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (works) {
        return works.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksObjets);
});

// Appartements & Villa Filter
const BtnFilterApptVilla = document.querySelector(".btn-filter-appt-villa");
BtnFilterApptVilla.addEventListener("click", function () {
    const worksApptVilla = works.filter(function (works) {
        return works.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksApptVilla);
});

// Hotels et restaurants Filter
const BtnFilterHotelResto = document.querySelector(".btn-filter-hotel-resto");
BtnFilterHotelResto.addEventListener("click", function () {
    const worksHotelResto = works.filter(function (works) {
        return works.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksHotelResto);
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
    // Modify the login element to a log out
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