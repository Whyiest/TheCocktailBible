let searchbar; // Link to search bar element
let resultGrid; // Link to grid where cocktail are displayed
let resultMessage; // Link to the message under the search bar
let resultNumber; // Show the number of result found
let displayResult; // Store how many cocktail are displayed

// Linking elements at general scope :
searchbar = document.getElementById('search-bar');
resultGrid = document.getElementById("result-grid");
resultMessage = document.getElementById("result-message");


function getCocktailsByName() {

    let imagePath, name, category, alcohol, glass, ingredients, instruction, measure;

    ingredients = [];

    fetch("http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchbar.value)
        .then(response => response.json())
        .then(listCocktails => {

            // Log response
            console.log(listCocktails);

            // Check if there is cocktail in response
            let resultIngredientsPath;
            if (listCocktails.drinks == null) {
                alert("Sorry, can't find any cocktail with this name, please enter a valid search.");
                resultMessage.innerHTML = "No result found";
            } else {

                // Display matches
                resultNumber = listCocktails.drinks.length;
                resultMessage.innerHTML = resultNumber + " cocktails founds :";

                // Limit display
                if (resultNumber > 15) {
                    displayResult = 15;
                } else {
                    displayResult = resultNumber;
                }

                // ------------ Starting to add to grid ---------------

                for (let currentCocktail = 0; currentCocktail < 15; currentCocktail++) {

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
                    addCocktailHTML(imagePath, name, category, alcohol, glass, ingredients, instruction, measure);

                }
            }
        });
}


function getCocktailsByID(cocktailID) {


    let imagePath, name, category, alcohol, glass, ingredients, instruction, measure;
    ingredients = [];

    fetch("http://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=" + cocktailID)
        .then(response => response.json())
        .then(thisCocktail => {

            // Log response
            console.log(thisCocktail);

            // Check if there is cocktail in response
            if (thisCocktail.drinks == null) {
                alert("Sorry, can't find any cocktail with this ID, please contact owner.");
                resultMessage.innerHTML = "Aborted : error.";
                return;
            } else {


                // NON TERMINE !!!!!!!!!!!!!

                // ------------ Starting to add to grid ---------------

                // Setting values :
                imagePath = thisCocktail.drinks[currentCocktail].strDrinkThumb;
                name = thisCocktail.drinks[currentCocktail].strDrink;
                category = thisCocktail.drinks[currentCocktail].strCategory;
                alcohol = thisCocktail.drinks[currentCocktail].strAlcoholic;
                glass = thisCocktail.drinks[currentCocktail].strGlass;
                measure = thisCocktail.drinks[currentCocktail].strMeasure1;

                resultIngredientsIterator = 0;
                resultIngredientsPath = "";

                if (thisCocktail.drinks[currentCocktail].strIngredient1 === null) {
                    resultCocktailIngredients[loadedCocktailNumber].innerHTML = "Not specified";
                } else {
                    // Adding ingredients to an array
                    do {
                        resultIngredientsIterator++;
                        // Evaluate the value at this path in JSON
                        resultIngredientsPath = thisCocktail.drinks[currentCocktail]['strIngredient' + resultIngredientsIterator];
                        if (resultIngredientsPath !== null) {
                            ingredients.push(resultIngredientsPath);
                        }
                    } while (resultIngredientsPath !== null && resultIngredientsIterator <= 15);
                }

                instruction = thisCocktail.drinks[currentCocktail].strInstructions;
                addCocktailHTML(imagePath, name, category, alcohol, glass, ingredients, instruction, measure);

            }

        });
}


function getCocktailsByIngredient() {

    fetch("http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchbar.value)
        .then(response => response.json())
        .then(listCocktails => {

            // Log response
            console.log(listCocktails);

            // Check if there is cocktail in response
            if (listCocktails.drinks == null) {
                alert("Sorry, can't find any cocktail with this ingredient, please enter a valid search.");
                resultMessage.innerHTML = "No result found";
            } else {

                // Display matches
                resultNumber = listCocktails.drinks.length;
                resultMessage.innerHTML = resultNumber + " cocktails founds :";

                // Limit display
                if (resultNumber > 15) {
                    displayResult = 15;
                } else {
                    displayResult = resultNumber;
                }

                for (let currentCocktail = 0; currentCocktail < listCocktails.length; currentCocktail++) {
                    getCocktailsByID(listCocktails[currentCocktail].idDrink)
                }
            }
            return false;
        });
}


// ----------------- General Tools for the page ------------------


setInterval(checkEmpty, 100);

function checkEmpty() {
    if (searchbar.value == "") {
        resultGrid.innerHTML = "";
        resultMessage.innerHTML = "Search a cocktail with the field above !";
    }
}

searchbar.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});


function addCocktailHTML(imagePath, name, category, alcohol, glass, ingredients, instruction, measure) {


    let resultElements;
    let resultImageContainer;
    let resultImage;
    let resultCocktailName;
    let resultCocktailCategory;
    let resultCocktailIngredients;
    let resultCocktailAlcohol;
    let resultIngredientsIterator;
    let resultCocktailInstruction;
    let resultCocktailGlass;

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


    // Setting values :
    resultImage.src = imagePath;
    resultImage.style.borderRadius = "10px";
    resultCocktailName.innerHTML = name;
    resultCocktailCategory.innerHTML = "<i class=\"fa-solid fa-boxes-stacked\"></i><span class=\n'coloredBold\'> Category : </span>";
    resultCocktailCategory.innerHTML += category
    resultCocktailAlcohol.innerHTML = "<i class=\"fa-solid fa-wine-bottle\"></i><span class=\n'coloredBold\'> Type : </span>";
    resultCocktailAlcohol.innerHTML += alcohol
    resultCocktailGlass.innerHTML = "<i class=\"fa-solid fa-martini-glass-citrus\"></i><span class=\n'coloredBold\'> Glass : </span>";
    resultCocktailGlass.innerHTML += glass
    resultCocktailGlass.innerHTML += " (" + measure + ")";
    resultCocktailIngredients.innerHTML = "<i class=\"fa-solid fa-leaf\"></i><span class=\n'coloredBold\'> Ingredients : </span>";

    resultIngredientsIterator = 0;

    for (let h = 0; h < ingredients.length; h++) {
        resultCocktailIngredients.innerHTML += '- ' + ingredients[h] + '<br>';
    }

    resultCocktailInstruction.innerHTML = "<i class=\"fa-solid fa-paste\"></i><span class=\n'coloredBold\'> Instructions : </span>";
    resultCocktailInstruction.innerHTML += instruction;


    // Linking elements

    resultGrid.appendChild(resultElements);
    resultElements.appendChild(resultImageContainer);
    resultImageContainer.appendChild(resultImage);
    resultElements.appendChild(resultCocktailName);
    resultElements.appendChild(resultCocktailCategory);
    resultElements.appendChild(resultCocktailAlcohol);
    resultElements.appendChild(resultCocktailGlass);
    resultElements.appendChild(resultCocktailIngredients);
    resultElements.appendChild(resultCocktailInstruction);

    console.log("One cocktail was added to the grid.")

    return false;
}