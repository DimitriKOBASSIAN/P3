// Fetch works from the API and store them in the oeuvres variable
let works;

try {
    const reponse = await fetch('http://localhost:5678/api/works/');
    works = await reponse.json();
} catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des oeuvres depuis l'API:", error);
}
console.log(works)

    // fetch the categories from the API
    let categories;
    try {
        const response = await fetch('http://localhost:5678/api/categories/');
        categories = await response.json();
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des catégories depuis l'API:", error);
    }
console.log(categories);

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
btnFilterAll.addEventListener("click", () => {
    const worksAll = works.filter(work => work.categoryId !== null);
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksAll);
});

// Objets Filter
const btnFilterObjets = document.querySelector(".btn-filter-Objets");
btnFilterObjets.addEventListener("click", () => {
    filterWorks(1);
});

// Appartements & Villa Filter
const btnFilterApptVilla = document.querySelector(".btn-filter-appt-villa");
btnFilterApptVilla.addEventListener("click", () => {
    filterWorks(2);
});

// Hotels et restaurants Filter
const btnFilterHotelResto = document.querySelector(".btn-filter-hotel-resto");
btnFilterHotelResto.addEventListener("click", () => {
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

// add a modifier link next to the Mes Projets title when the user is logged in
if (sessionStorage.getItem("token")) {
    let modifierLink = document.createElement('a');
    modifierLink.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';
    modifierLink.classList.add('modifier-link');
    modifierLink.href = "#"; // Add the desired href for the link
    document.querySelector('.mes-projets').appendChild(modifierLink);
}

// Function to open the modal
function openModal() {
    // Create the modal element
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Create the content element
    const content = document.createElement("div");
    content.classList.add("modal-content");

    // Add the content to the modal
    modal.appendChild(content);

    // Add a close button to the modal content
    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.classList.add("close-button");
    content.appendChild(closeButton);

    // Add a title to the modal content
    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Galerie photo";
    content.appendChild(modalTitle);
    modalTitle.classList.add("modal-title");

    // Create the gallery element
    const gallery = document.createElement("div");
    gallery.classList.add("gallery-modal");

    // Loop through the works and create image elements with delete buttons
    works.forEach(work => {
        const miniImg = document.createElement("div");
            miniImg.classList.add("mini-img");
        const imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;
            imageElement.alt = work.title;        
        const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            deleteButton.classList.add("delete-button");
        gallery.appendChild(miniImg);
        miniImg.appendChild(imageElement);
        miniImg.appendChild(deleteButton);
    });

    // Add the gallery to the modal content
    content.appendChild(gallery);

    // add a separator under the gallery
    const separator = document.createElement("hr");
    content.appendChild(separator);

    // add a button to add a new image to the gallery
    const addImageButton = document.createElement("button");
    addImageButton.textContent = "Ajouter une photo";
    addImageButton.classList.add("button-addimg");
    content.appendChild(addImageButton);

    // Add the modal to the body
    document.body.appendChild(modal);

    //Add event listener to conole.log "you tried to delete an image" when clicking on the delete button
    const deleteButtons = document.querySelectorAll(".delete-button");  
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
            console.log("You tried to delete the image");
        });
    });

    // Add event listener to close the modal when clicking outside of the modal-content
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    //add event listener to the add image button to console.log "you tried to add an image"
    addImageButton.addEventListener("click", () => {
        console.log("Opening the page to add image");
        // Completely empty the modal content
        content.innerHTML = '';
        //add a back button to the modal content
        const backButton = document.createElement("button");
        backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        backButton.classList.add("back-button");
        content.appendChild(backButton);
        // Add event listener to the back button to go back to the gallery
        backButton.addEventListener("click", () => {
            content.innerHTML = '';
            content.appendChild(closeButton);
            content.appendChild(modalTitle);
            content.appendChild(gallery);
            content.appendChild(separator);
            content.appendChild(addImageButton);
        });

        // Add the close button to the modal content
        content.appendChild(closeButton);
        // Add the title to the modal content
        const modalTitleAdd = document.createElement("h2");
        modalTitleAdd.textContent = "Ajout photo";
        content.appendChild(modalTitleAdd);
        modalTitleAdd.classList.add("modal-title");
        content.appendChild(modalTitleAdd);
        
        // Create a form element
        const form = document.createElement("form");
        form.classList.add("add-image-form");
        // Create an input for uploading an image
        const imageUpload = document.createElement("div");
        imageUpload.classList.add("image-upload");
        // Create a label for the image input
        const imageLabel = document.createElement("label");
        imageLabel.setAttribute("for", "image");
        imageLabel.innerHTML = '<i class="fa-regular fa-image"></i>';
        imageUpload.appendChild(imageLabel);
        // Create a button to add an image
        const imageUploaButton = document.createElement("button");
        imageUploaButton.classList.add("image-upload-button");
        imageUploaButton.textContent = " + Ajouter photo";
        const imageParameter = document.createElement("p");
        imageParameter.classList.add("image-parameter");
        imageParameter.textContent = ".jpg, .png : 4Mo max";


        // Create an input for the image
        const imageInput = document.createElement("input");
        imageInput.setAttribute("type", "file");
        imageInput.setAttribute("accept", "image/jpeg, image/png");
        imageInput.classList.add("image-input");
        
// add eventListener to the imageUploadButton to trigger the imageInput without clicking on it
imageUploaButton.addEventListener("click", () => {
    imageInput.click();
});


        // Add event listener to the add image button to preview the selected image
        imageInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const previewImage = document.createElement("img");
                previewImage.classList.add("previewImg");
                previewImage.src = e.target.result;
                content.appendChild(previewImage);
            };
            reader.readAsDataURL(file);
        });
        // create a title input
        const titleInput = document.createElement("input");
        titleInput.classList.add("title-input");
        titleInput.setAttribute("id", "title");
        titleInput.setAttribute("name", "title");
        titleInput.setAttribute("required", "required");
        titleInput.setAttribute("maxlength", "50");
        titleInput.setAttribute("minlength", "3");
        titleInput.setAttribute("size", "50");
        titleInput.setAttribute("autocomplete", "off");
        titleInput.setAttribute("autofocus", "autofocus");
        titleInput.setAttribute("type", "text");

        // create a paragraph element
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("title-paragraph");
        titleParagraph.textContent = "Titre";
        titleParagraph.appendChild(titleInput);

        // create a paragraph element for the category
        const categoryParagraph = document.createElement("p");
        categoryParagraph.classList.add("category-paragraph");
        categoryParagraph.textContent = "Catégorie";
        // Create a select element
        const categorySelect = document.createElement("select");
        categorySelect.classList.add("category-select");
        categorySelect.setAttribute("id", "category");
        categorySelect.setAttribute("name", "category");
        categorySelect.setAttribute("required", "required");
        // Create an option element for the default category
        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", "");
        defaultOption.textContent = " ";
        categorySelect.appendChild(defaultOption);
        // Create an option element for each category
        categories.forEach(category => {
            const option = document.createElement("option");
            option.classList.add("category-option");
            option.setAttribute("value", category.id);
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

            // add a separator for the form
    const formSeparator = document.createElement("hr");
    formSeparator.classList.add("form-separator");

        // Create a submit button
        const submitButton = document.createElement("button");
        submitButton.classList.add("image-submit-button");
        submitButton.setAttribute("type", "submit");
        submitButton.textContent = "Valider";
        submitButton.classList.add("submit-button");
        // Append the inputs and the submit button to the form
        form.appendChild(imageUpload);
        imageUpload.appendChild(imageUploaButton);
        imageUpload.appendChild(imageInput);
        imageUpload.appendChild(imageParameter);
        form.appendChild(titleParagraph);
        form.appendChild(titleInput);
        form.appendChild(categoryParagraph);
        form.appendChild(categorySelect);
        form.appendChild(formSeparator)
        form.appendChild(submitButton);
        // Append the form to the modal content
        content.appendChild(form);
        // Prevent the default action of the form
        submitButton.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("You tried to add an image");
        });
    });


    // Add event listener to the close button to close the modal when clicked
    closeButton.addEventListener("click", closeModal);
}

// Function to close the modal
function closeModal() {
    // Remove the modal element
    const modal = document.querySelector(".modal");
    modal.remove();

    // Remove the darken effect from the page
    const page = document.querySelector("body");
    page.classList.remove("darken");
}

// Add event listener to the modifier link
const modifierLink = document.querySelector(".modifier-link");
modifierLink.addEventListener("click", openModal);

