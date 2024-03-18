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
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".gallery");

        // Création d’une balise dédiée à une figure
        const worksElement = document.createElement("figure");

        // Création des balises
        sectionFiches.appendChild(worksElement);
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = figure.title;

        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(nomElement);
    }
    
}

generateWorks(works);


// Filtre Objets
const BtnFilterAll = document.querySelector(".btn-filter-all");
BtnFilterAll.addEventListener("click", function () {
    const worksAll = works.filter(function (works) {
        return works.categoryId !== null;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksAll);
});

// Filtre Objets
const BtnFilterObjets = document.querySelector(".btn-filter-Objets");
BtnFilterObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (works) {
        return works.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksObjets);
});

// Filtre Appartements & Villa
const BtnFilterApptVilla = document.querySelector(".btn-filter-appt-villa");
BtnFilterApptVilla.addEventListener("click", function () {
    const worksApptVilla = works.filter(function (works) {
        return works.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksApptVilla);
});

// Filtre Hotels et restaurants
const BtnFilterHotelResto = document.querySelector(".btn-filter-hotel-resto");
BtnFilterHotelResto.addEventListener("click", function () {
    const worksHotelResto = works.filter(function (works) {
        return works.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksHotelResto);
});

// Changement de couleur des boutons lors du clic pour filtrer
const btns = document.querySelectorAll(".button-filter");
btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        btns.forEach(function (btn) {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    });
});