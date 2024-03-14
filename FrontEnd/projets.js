let oeuvres;

// Récupération des oeuvres depuis l'API
try {
    const reponse = await fetch('http://localhost:5678/api/works/');
    oeuvres = await reponse.json();
} catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des oeuvres depuis l'API:", error);
}
console.log(oeuvres)

function genererOeuvres(oeuvres){

    for (let i = 0; i < oeuvres.length; i++) {

        const figure = oeuvres[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".gallery");

        // Création d’une balise dédiée à une figure
        const oeuvresElement = document.createElement("figure");

        // Création des balises
        sectionFiches.appendChild(oeuvresElement);
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = figure.title;

        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(oeuvresElement);
        oeuvresElement.appendChild(imageElement);
        oeuvresElement.appendChild(nomElement);
    }
    
}

genererOeuvres(oeuvres);


// Filtre Objets
const BtnFilterAll = document.querySelector(".btn-filter-all");
BtnFilterAll.addEventListener("click", function () {
    const OeuvresAll = oeuvres.filter(function (oeuvres) {
        return oeuvres.categoryId !== null;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererOeuvres(OeuvresAll);
});

// Filtre Objets
const BtnFilterObjets = document.querySelector(".btn-filter-Objets");
BtnFilterObjets.addEventListener("click", function () {
    const OeuvresObjets = oeuvres.filter(function (oeuvres) {
        return oeuvres.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererOeuvres(OeuvresObjets);
});

// Filtre Appartements & Villa
const BtnFilterApptVilla = document.querySelector(".btn-filter-appt-villa");
BtnFilterApptVilla.addEventListener("click", function () {
    const OeuvresApptVilla = oeuvres.filter(function (oeuvres) {
        return oeuvres.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererOeuvres(OeuvresApptVilla);
});

// Filtre Hotels et restaurants
const BtnFilterHotelResto = document.querySelector(".btn-filter-hotel-resto");
BtnFilterHotelResto.addEventListener("click", function () {
    const OeuvresHotelResto = oeuvres.filter(function (oeuvres) {
        return oeuvres.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererOeuvres(OeuvresHotelResto);
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