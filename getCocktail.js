let searchbar; // Link to search bar element
let resultGrid; // Link to grid where cocktail are displayed
let resultMessage; // Link to the message under the search bar
let resultNumber; // Show the number of result found
let displayResult; // Store how many cocktail are displayed
let ingredientsList = []; // Store all the possible ingredients
let currentlyDisplay = [false]; // True if displaying cocktails

// All messages displayed :

let searchByNameMessage = "Search a cocktail with the field above !";
let ingredientNotFoundMessage = "Sorry, we didn\'t recognize this ingredient.";
let noCocktailFoundMessage = "No result found, please retry.";
let cocktailFoundMessage = " cocktail(s) found(s) :";
let errorOccurredMessage = "An error occurred. Result may be affected.";


// ERROR TO PATCH (14/12/2022) : getCocktail.js:49 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'strDrinkThumb')


// Linking elements at general scope :
searchbar = document.getElementById('search-bar');
resultGrid = document.getElementById("result-grid");
resultMessage = document.getElementById("result-message");

function getIngredientsList() {

    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then(response => response.json())
        .then(list => {

            console.log(list)
            ingredientsList = [];

            for (let i = 0; i < list.drinks.length; i++) {
                ingredientsList.push(list.drinks[i].strIngredient1);
            }

            console.log(ingredientsList);
        });

}

function getCocktailsByName() {


    let imagePath, name, category, alcohol, glass, ingredients, instruction, measure, linkVideo;
    ingredients = [];

    // Clearing result grid
    currentlyDisplay [0] = true;
    resultGrid.innerHTML = "";

    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchbar.value)
        .then(response => response.json())
        .then(listCocktails => {

            // Log response
            console.log(listCocktails);

            // Check if there is cocktail in response
            let resultIngredientsPath;
            if (listCocktails.drinks == null) {
                resultMessage.innerHTML = noCocktailFoundMessage;
            } else {

                // Display matches
                resultNumber = listCocktails.drinks.length;
                resultMessage.innerHTML = resultNumber + cocktailFoundMessage;

                // Limit display
                if (resultNumber >= 15) {
                    displayResult = 15;
                } else {
                    displayResult = resultNumber;
                }

                // ------------ Starting to add to grid ---------------

                for (let currentCocktail = 0; currentCocktail < displayResult; currentCocktail++) {

                    // Setting values :
                    imagePath = listCocktails.drinks[currentCocktail].strDrinkThumb;
                    name = listCocktails.drinks[currentCocktail].strDrink;
                    category = listCocktails.drinks[currentCocktail].strCategory;
                    alcohol = listCocktails.drinks[currentCocktail].strAlcoholic;
                    glass = listCocktails.drinks[currentCocktail].strGlass;
                    measure = listCocktails.drinks[currentCocktail].strMeasure1;

                    resultIngredientsIterator = 0;
                    resultIngredientsPath = "";

                    if (listCocktails.drinks[currentCocktail].strIngredient1 === null) {
                        resultCocktailIngredients.innerHTML = "Not specified";
                    } else {
                        // Adding ingredients to an array
                        do {
                            resultIngredientsIterator++;
                            // Evaluate the value at this path in JSON
                            resultIngredientsPath = listCocktails.drinks[currentCocktail]['strIngredient' + resultIngredientsIterator];
                            if (resultIngredientsPath !== null) {
                                ingredients.push(resultIngredientsPath);
                            }
                        } while (resultIngredientsPath !== null && resultIngredientsIterator <= 15);
                    }

                    instruction = listCocktails.drinks[currentCocktail].strInstructions;

                    linkVideo = listCocktails.drinks[currentCocktail].strVideo;

                    // Create the cocktail
                    addCocktailHTML(imagePath, name, category, alcohol, glass, ingredients, instruction, measure, linkVideo);


                }
            }
        });
}


function getCocktailsByID(cocktailID) {

    let imagePath = null;
    let name = null;
    let category = null;
    let alcohol = null;
    let glass = null;
    let ingredients = null;
    let instruction = null;
    let measure = null;
    let resultIngredientsPath = null;
    let linkVideo = null;
    let indexToLookup = 0

    ingredients = [];

    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailID)
        .then(response => response.json())
        .then(thisCocktail => {

            // Log response
            console.log(thisCocktail);

            // Check if there is cocktail in response
            if (thisCocktail.drinks[0] === null) {
                alert("Sorry, can't find any cocktail with this ID, please contact owner.");
                resultMessage.innerHTML = errorOccurredMessage;
                return;
            } else {

                // ------------ Starting to add to grid ---------------

                // Setting values :
                imagePath = thisCocktail.drinks[indexToLookup].strDrinkThumb;
                name = thisCocktail.drinks[indexToLookup].strDrink;
                category = thisCocktail.drinks[indexToLookup].strCategory;
                alcohol = thisCocktail.drinks[indexToLookup].strAlcoholic;
                glass = thisCocktail.drinks[indexToLookup].strGlass;
                measure = thisCocktail.drinks[indexToLookup].strMeasure1;

                resultIngredientsIterator = 0;
                resultIngredientsPath = "";

                if (thisCocktail.drinks[indexToLookup].strIngredient1 === null) {
                    resultCocktailIngredients[loadedCocktailNumber].innerHTML = "Not specified";
                } else {
                    // Adding ingredients to an array
                    do {
                        resultIngredientsIterator++;
                        // Evaluate the value at this path in JSON
                        resultIngredientsPath = thisCocktail.drinks[indexToLookup]['strIngredient' + resultIngredientsIterator];
                        if (resultIngredientsPath !== null) {
                            ingredients.push(resultIngredientsPath);
                        }
                    } while (resultIngredientsPath !== null && resultIngredientsIterator <= 15);
                }

                instruction = thisCocktail.drinks[indexToLookup].strInstructions;
                linkVideo = thisCocktail.drinks[indexToLookup].strVideo;

                addCocktailHTML(imagePath, name, category, alcohol, glass, ingredients, instruction, measure, linkVideo);

            }

        });
}


function getCocktailsByIngredient() {

    if (ingredientsList.length == 0) {
        alert("Critical error : unable to contact API.");
        window.location.reload();
    } else {

        let verif = false;

        // Clearing result grid
        resultGrid.innerHTML = "";
        currentlyDisplay [0] = true;

        for (let i = 0; i < ingredientsList.length; i++) {
            if (ingredientsList[i].toLowerCase() === searchbar.value.toLowerCase()) {
                verif = true;
                break;
            }
        }
        if (verif == true) {

            fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchbar.value)
                .then(listCocktailIngredient => listCocktailIngredient.json())
                .then(listCocktailIngredient => {

                    // Log response
                    console.log(listCocktailIngredient);

                    // Check if there is cocktail in response
                    if (listCocktailIngredient.drinks == null) {
                        resultMessage.innerHTML = noCocktailFoundMessage;
                    } else {

                        // Display matches
                        resultNumber = listCocktailIngredient.drinks.length;
                        resultMessage.innerHTML = resultNumber + cocktailFoundMessage;

                        // Limit display
                        if (resultNumber > 15) {
                            displayResult = 15;
                        } else {
                            displayResult = resultNumber;
                        }
                        for (let currentCocktail = 0; currentCocktail < displayResult; currentCocktail++) {
                            getCocktailsByID(listCocktailIngredient.drinks[currentCocktail].idDrink)
                        }
                    }
                    return false;
                });
        } else {
            resultMessage.innerHTML = ingredientNotFoundMessage;
        }

    }

}


function addCocktailHTML(imagePath, name, category, alcohol, glass, ingredients, instruction, measure, linkVideo) {

    // All content :

    let resultElements = null;
    let resultImageContainer = null;
    let resultImage = null;
    let resultCocktailName = null;
    let resultCocktailCategory = null;
    let resultCocktailIngredients = null;
    let resultCocktailAlcohol = null;
    let resultIngredientsIterator = null;
    let resultCocktailInstruction = null;
    let resultCocktailGlass = null;
    let resultVideoContainer = null;
    let resultVideoText = null;

    // All cocktail placeholder :

    let categoryPlaceholder = "";
    let glassPlaceholder = "";
    let typePlaceholder = "";
    let ingredientsPlaceholder = "";
    let instructionsPlaceholder = "";
    let videoPlaceholder = "";

    if (localStorage.getItem('lang') === 'fr') {
        categoryPlaceholder = "Catégorie";
        glassPlaceholder = "Verre";
        typePlaceholder = "Type";
        ingredientsPlaceholder = "Ingrédients";
        instructionsPlaceholder = "Instructions";
        videoPlaceholder = "Tutoriel vidéo";
    } else {
        categoryPlaceholder = "Category";
        glassPlaceholder = "Glass";
        typePlaceholder = "Type";
        ingredientsPlaceholder = "Ingredients";
        instructionsPlaceholder = "Instructions";
        videoPlaceholder = "View video";
    }


    // Create element :

    resultElements = document.createElement("div");
    resultImageContainer = document.createElement("div");
    resultImage = document.createElement("img");
    resultCocktailName = document.createElement("p");
    resultCocktailCategory = document.createElement("p");
    resultCocktailAlcohol = document.createElement("p");
    resultCocktailGlass = document.createElement("p");
    resultCocktailIngredients = document.createElement("p");
    resultCocktailInstruction = document.createElement("p");
    resultVideoContainer = document.createElement("div");
    resultVideoText = document.createElement("a");


    // Add class :

    resultElements.classList.add("result-element");
    resultImageContainer.classList.add("result-element-image-container");
    resultImage.classList.add("result-element-image");
    resultCocktailName.classList.add("result-element-title");
    resultCocktailName.classList.add("visible");
    resultCocktailCategory.classList.add("result-element-category");
    resultCocktailAlcohol.classList.add("result-element-category");
    resultCocktailGlass.classList.add("result-element-glass");
    resultCocktailIngredients.classList.add("result-element-category");
    resultCocktailInstruction.classList.add("result-element-instruction");
    resultVideoContainer.classList.add("result-element-video-container");
    resultVideoText.classList.add("result-element-video-text");


    // Setting values :

    resultImage.src = imagePath;
    resultImage.style.borderRadius = "10px";
    resultCocktailName.innerHTML = name;
    resultCocktailCategory.innerHTML = "<i class=\"fa-solid fa-boxes-stacked\"></i><span class=\n'coloredBold\'> " + categoryPlaceholder + ": </span>";
    resultCocktailCategory.innerHTML += category
    resultCocktailAlcohol.innerHTML = "<i class=\"fa-solid fa-wine-bottle\"></i><span class=\n'coloredBold\'> " + typePlaceholder + ": </span>";
    resultCocktailAlcohol.innerHTML += alcohol
    resultCocktailGlass.innerHTML = "<i class=\"fa-solid fa-martini-glass-citrus\"></i><span class=\n'coloredBold\'> " + glassPlaceholder + " : </span>";
    resultCocktailGlass.innerHTML += glass
    resultCocktailGlass.innerHTML += " (" + measure + ")";
    resultCocktailIngredients.innerHTML = "<i class=\"fa-solid fa-leaf\"></i><span class=\n'coloredBold\'> " + ingredientsPlaceholder + " :</span>";

    resultIngredientsIterator = 0;

    for (let h = 0; h < ingredients.length; h++) {
        resultCocktailIngredients.innerHTML += '- ' + ingredients[h] + '<br>';
    }

    resultCocktailInstruction.innerHTML = "<i class=\"fa-solid fa-paste\"></i><span class=\n'coloredBold\'> " + instructionsPlaceholder + " </span>";
    resultCocktailInstruction.innerHTML += instruction;

    // Linking and displaying elements :

    resultGrid.appendChild(resultElements);
    resultElements.appendChild(resultImageContainer);
    resultImageContainer.appendChild(resultImage);
    resultElements.appendChild(resultCocktailName);
    resultElements.appendChild(resultCocktailCategory);
    resultElements.appendChild(resultCocktailAlcohol);
    resultElements.appendChild(resultCocktailGlass);
    resultElements.appendChild(resultCocktailIngredients);
    resultElements.appendChild(resultCocktailInstruction);

    // Adding video if provided :

    if (!(linkVideo === null)) {
        resultVideoText.innerHTML = videoPlaceholder + " <i class=\"fa-solid fa-video\"></i>";
        resultVideoText.href = linkVideo;
        resultElements.appendChild(resultVideoContainer);
        resultVideoContainer.appendChild(resultVideoText);
    }

    return false;
}

// ----------------- General Tools for the page ------------------


// Check if input area is empty, and clear it if so
setInterval(checkEmpty, 1000);

function checkEmpty() {
    if (searchbar.value == "") {
        resultGrid.innerHTML = "";
        currentlyDisplay[0] = false;
    }

}

// Display random suggest
setInterval(displayRandomSuggest, 1000);

let searchButtonText = document.getElementById("switcher-text");

function displayRandomSuggest() {
    console.log(searchButtonText.innerHTML);
    if (sessionStorage.getItem('pageState') === 'name' && currentlyDisplay[0] == false) {
        resultMessage.innerHTML = searchByNameMessage;
    }

    if (sessionStorage.getItem('pageState') === 'ingredient' && currentlyDisplay[0] == false) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        let randomIndex = getRandomInt(0, ingredientsList.length - 1);
        let randomIngredient = ingredientsList[randomIndex];
        resultMessage.innerHTML = "Search a cocktail with the field above ! What about <span class='coloredBold'>" + randomIngredient + "</span> ?";
    }
}

// Get random number

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Search by pressing enter
searchbar.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});