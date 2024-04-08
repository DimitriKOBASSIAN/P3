// Fetch works from the API and store them in the works variable
let works;
try {
    const reponse = await fetch('http://localhost:5678/api/works/');
    works = await reponse.json();
} catch (error) {
    console.error("Error fetching works:", error);
}
/* console.log(works) */

// fetch the categories from the API
let categories;
try {
    const response = await fetch('http://localhost:5678/api/categories/');
    categories = await response.json();
} catch (error) {
    console.error("Error fetching categories:", error);
}
/* console.log(categories); */

//function used to update the works
function fetchWorks() {
    fetch("http://localhost:5678/api/works")
                .then(response => response.json())
                .then(data => {
                    works = data;
                })
        .catch(error => {
            console.error("Error fetching works:", error);
        });
}

//Function to reload the works in the index
function fetchWorksAndUpdateIndex() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(works => {
            // Clear the index
            index.textContent = '';
            generateWorks(works, index)
        })
        .catch(error => {
            console.error('Error fetching works to update index:', error);
        });
}

const index = document.querySelector(".index");
// Create a function to generate the works cards in the index
function generateWorks(works, index){

    for (let i = 0; i < works.length; i++) {

        const figure = works[i];
        // Selecting the DOM element that will host the fiches

        // Creating a tag dedicated to a figure
        const worksElement = document.createElement("figure");

        // Creating tags for the image, the title and the alt
        index.appendChild(worksElement);
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = figure.title;

        // Linking the article tag to the index
        index.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(nomElement);
    }
    
}

generateWorks(works, index);

// Function to filter works based on category
function filterWorks(categoryId) {
    const filteredWorks = works.filter(function (work) {
        return work.categoryId === categoryId;
    });
    const index = document.querySelector(".index");
    index.textContent = "";
    generateWorks(filteredWorks, index);
}

// All Filter
const btnFilterAll = document.querySelector(".btn-filter-all");
btnFilterAll.addEventListener("click", () => {
    const worksAll = works.filter(work => work.categoryId !== null);
    document.querySelector(".index").textContent = "";
    generateWorks(worksAll, index);
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
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    const text = document.createTextNode(" Mode édition");
    banner.appendChild(icon);
    banner.appendChild(text);
    banner.classList.add('banner');

    // Add the banner to the top of the body
    document.body.insertBefore(banner, document.body.firstChild);
}

// add a modifier link next to the Mes Projets title when the user is logged in
if (sessionStorage.getItem("token")) {
    let modifierLink = document.createElement('a');
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    const text = document.createTextNode(" Modifier");
    modifierLink.appendChild(icon);
    modifierLink.appendChild(text);
    modifierLink.classList.add('modifier-link');
    modifierLink.href = "#"; // Add the desired href for the link
    document.querySelector('.mes-projets').appendChild(modifierLink);
}


// Function to delete a work
function deleteWork(deleteButton, token) {
    deleteButton.addEventListener("click", (event) => {
        const workId = deleteButton.parentNode.firstChild.id;
        
        // Display a confirmation dialog before deleting the work
        if (confirm("Are you sure you want to delete this work?")) {
            fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer: ' + token
                }
            })
            .then(response => {
                if (response.ok) {
                    event.preventDefault();
                    deleteButton.parentNode.remove();
/*                     console.log("Work deleted successfully"); */
                    fetchWorks();
                    fetchWorksAndUpdateIndex()
                } else {
                    console.log("Failed to delete work");
                }
            })
            .catch(error => {
                console.log("An error occurred while deleting the work:", error);
            });
        }
    });
}

// Function to open the modal
function openModal() {
    // update the works
    fetchWorks();
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
    const closeButtonIcon = document.createElement("i");
    closeButtonIcon.classList.add("fa-solid", "fa-xmark");
    closeButton.appendChild(closeButtonIcon);
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

    //clear the gallery before adding the works
    gallery.textContent = ''; 

    // Loop through the works and create image elements with delete buttons
    works.forEach(work => {
        const miniImg = document.createElement("div");
            miniImg.classList.add("mini-img");
        const imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;
            imageElement.alt = work.title;
            imageElement.id = work.id;        
        const deleteButton = document.createElement("button");
            const deleteButtonIcon = document.createElement("i");
            deleteButtonIcon.classList.add("fa-solid", "fa-trash-can");
            deleteButton.appendChild(deleteButtonIcon);
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

    //Add event listener to the delete button to delete the work when clicked
    const deleteButtons = document.querySelectorAll(".delete-button");  
    const token = sessionStorage.getItem("token");
    deleteButtons.forEach(deleteButton => {
        deleteWork(deleteButton, token);
    });

    // Add event listener to close the modal when clicking outside of the modal-content
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            fetchWorks();
            closeModal();
        }
    });

    //add event listener to the add image button to open the form to add a new image
    addImageButton.addEventListener("click", () => {
        // Completely empty the modal content
        content.textContent = '';
        //add a back button to the modal content
        const backButton = document.createElement("button");
        const backButtonIcon = document.createElement("i");
        backButtonIcon.classList.add("fa-solid", "fa-arrow-left");
        backButton.appendChild(backButtonIcon);
        backButton.classList.add("back-button");
        content.appendChild(backButton);
        // Add event listener to the back button to go back to the gallery
        backButton.addEventListener("click", () => {
            content.textContent = '';
            gallery.textContent = '';
            // refresh the gallery
            fetch("http://localhost:5678/api/works")
            .then(response => response.json())
            .then(data => {
                const works = data;
                works.forEach(work => {
                const miniImg = document.createElement("div");
                miniImg.classList.add("mini-img");
                const imageElement = document.createElement("img");
                imageElement.src = work.imageUrl;
                imageElement.alt = work.title;
                imageElement.id = work.id;
                const deleteButton = document.createElement("button");
                deleteButton.appendChild(document.createElement("i")).classList.add("fa-solid", "fa-trash-can");
                deleteButton.classList.add("delete-button");
                gallery.appendChild(miniImg);
                miniImg.appendChild(imageElement);
                miniImg.appendChild(deleteButton);
                // Add event listener to the delete button to delete the work
                deleteWork(deleteButton, token);
                });
            });
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
        
        // Create a form element to add an work
        const form = document.createElement("form");
        form.classList.add("add-image-form");
        form.id = "add-image-form";
        
        // Create an input for uploading an image
        const imageUpload = document.createElement("div");
        imageUpload.classList.add("image-upload");
        // Create a label for the image input
        const imageLabel = document.createElement("label");
        imageLabel.setAttribute("for", "image");
        const imageIcon = document.createElement("i");
        imageIcon.classList.add("fa-regular", "fa-image");
        imageLabel.appendChild(imageIcon);
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
        imageInput.setAttribute("max-size", "4MB"); // Limit the max size of uploaded image to 4MB
        imageInput.classList.add("image-input");
        imageInput.required = true;

        // Add event listener to the add image button to check the size of the selected image
        imageInput.addEventListener("change", (event) => {
            event.preventDefault();
            const file = event.target.files[0];
            if (file.size > 4 * 1024 * 1024) {
            alert("Image size exceeds the limit of 4MB");
            imageInput.value = ""; // Clear the selected image
            }
        });
        
        // add eventListener to the imageUploadButton to trigger the imageInput without clicking on it
        imageUploaButton.addEventListener("click", (event) => {
            event.preventDefault();
            imageInput.click();
        });


        // Add event listener to the add image button to preview the selected image
        imageInput.addEventListener("change", (event) => {
            event.preventDefault();
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const previewImage = document.createElement("img");
                previewImage.classList.add("previewImg");
                previewImage.src = e.target.result;
                imageLabel.textContent = '';
                imageLabel.appendChild(previewImage);
                imageParameter.style.display = "none";
                imageUploaButton.style.display = "none";
                /* console.log(previewImage); */
            };
            reader.readAsDataURL(file);
        });
        // create a title input to add a title to the image
        const titleInput = document.createElement("input");
        titleInput.classList.add("title-input");
        titleInput.setAttribute("id", "title");
        titleInput.setAttribute("name", "title");
        titleInput.setAttribute("minlength", "3");
        titleInput.setAttribute("autocomplete", "off");
        titleInput.setAttribute("type", "text");
        titleInput.required = true;


        // create a paragraph element 
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("title-paragraph");
        titleParagraph.textContent = "Titre";
        titleParagraph.appendChild(titleInput);

        // create a paragraph element for the category
        const categoryParagraph = document.createElement("p");
        categoryParagraph.classList.add("category-paragraph");
        categoryParagraph.textContent = "Catégorie";
        // Create a select element for the category
        const categorySelect = document.createElement("select");
        categorySelect.classList.add("category-select");
        categorySelect.setAttribute("id", "category");
        categorySelect.setAttribute("name", "category");
        categorySelect.required = true;

        // Create an option element for the default category
        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", "");
        defaultOption.setAttribute("name", "");
        defaultOption.setAttribute("id", "");
        defaultOption.textContent = "";
        categorySelect.appendChild(defaultOption);
        // Create an option element for each category from the API
        fetch("http://localhost:5678/api/categories")
            .then(response => response.json())
            .then(data => {
                data.forEach(category => {
                    const option = document.createElement("option");
                    option.classList.add("category-option");
                    option.setAttribute("value", category.id);
                    option.setAttribute("id", category.id);
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                    categorySelect.setAttribute("id", option.id);
                    categorySelect.setAttribute("name", option.value);
                    categorySelect.addEventListener("change", () => {
                        categorySelect.id = option.value;
/*                         console.log(categorySelect.value); */
                    });
                });
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
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
        // Check if the title, the category and the image are not empty and remove the error messages if they are and prevent the form from being submitted
        
        if (titleInput.value === "") {
                const existingErrorMessage = document.querySelector(".title-error-message");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Titre manquant";
                errorMessage.classList.add("title-error-message");
                titleParagraph.insertAdjacentElement("afterend", errorMessage);
            } else {
                const existingErrorMessage = document.querySelector(".title-error-message");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }
            }

            if (categorySelect.value === "") {
                const existingErrorMessage = document.querySelector(".category-error-message");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Catégorie manquante";
                errorMessage.classList.add("category-error-message");
                categoryParagraph.insertAdjacentElement("afterend", errorMessage);
            } else {
                const existingErrorMessage = document.querySelector(".category-error-message");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }
            }

            if (imageInput.files.length === 0) {
                const existingErrorMessage = document.querySelector(".image-error-message");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Image manquante";
                errorMessage.classList.add("image-error-message");
                imageInput.insertAdjacentElement("afterend", errorMessage);
            } else {
                const existingErrorMessage = document.querySelector(".image-error-message");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }
            }

            if (titleInput.value === "" || categorySelect.value === "" || imageInput.files.length === 0) {
                return;
            }

            // Create headers for the request
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            // Create a new formData object
            const formData = new FormData();
            formData.append('title', titleInput.value);
            // Get the category ID from the selected category
            const selectedCategory = categorySelect.value;
            formData.append('image', imageInput.files[0]);
            formData.append('category', selectedCategory);

            
            // Send a POST request to the server
                fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: headers,
                    body: formData,
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Work added successfully:", data); 
                        form.reset();
                        // remove the preview image and put back the button and the label
                        const imageIcon = document.createElement("i");
                        imageIcon.classList.add("fa-regular", "fa-image");
                        imageLabel.textContent = "";
                        imageLabel.appendChild(imageIcon);
                        imageUploaButton.style.display = "flex" ;
                        imageParameter.style.display = "flex";
                        // Display a success message
                        const successMessage = document.createElement("p");
                        successMessage.classList.add("success-message");
                        successMessage.textContent = "Le projet a été ajouté avec succès";
                        content.appendChild(successMessage);
                        // Remove the success message after 3 seconds
                        setTimeout(() => {
                            successMessage.remove();
                        }, 3000);
                        // reload the works in the gallery in the modal
                        fetchWorks();
                        fetchWorksAndUpdateIndex();

                    })
                    .catch(error => {
                        console.error("Error adding work:", error);
                });
            });
        });

    // Add event listener to the close button to fetch the works when the modal is closed
    closeButton.addEventListener('click',  async () => {
        await fetchWorks();
        content.textContent = '';
        closeModal();
    });
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