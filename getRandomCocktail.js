let loadedCocktailNumber = 0;
let indexCocktail = 0;
let resultArea;
let resultMessage;
let resultAnimation;
let areaEmpty = true;

function getRandomCocktails() {

    // Set all variable :

    let resultIngredientsImage = null;
    let resultRandom = null;
    let resultImageContainer = null;
    let resultImage = null;
    let resultCocktailName = null;
    let resultCocktailCategory = null;
    let resultCocktailIngredients = null;
    let resultCocktailAlcohol = null;
    let resultIngredientsPath = "";
    let resultIngredientsIterator = 0;
    let resultCocktailInstruction = null;
    let resultCocktailGlass = null;
    let resultCocktailQuantity = null;

    // Set all message :

    let loadingMessage;
    let changeMessage;

    if (localStorage.getItem('lang') === 'fr') {
        loadingMessage = "Préparation d\'une super recette...";
        changeMessage = "Clique à nouveau pour découvrir un autre cocktail !";
    } else {
        loadingMessage = "Making some good receipt...";
        changeMessage = "Click again to discover another cocktail !";
    }

    // Change result message
    resultMessage = document.getElementById("random-message");
    resultMessage.innerHTML = loadingMessage;

    // Define result area
    resultArea = document.getElementById("random-container");

    // Restart animation during loading
    resultAnimation = document.getElementById('random-empty-result');

    if (areaEmpty == false) { // If the result area is not empty
        resultRandom = document.getElementById("resultRandom");
        resultRandom.remove();
    }

    if (resultAnimation.classList.contains('random-hidden')) {
        resultAnimation.classList.remove("random-hidden");
    }

    // Call API
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(randomCocktail => {

            // Prevent multi-API call
            areaEmpty = false;

            // Hide animation
            resultAnimation.classList.add("random-hidden");
            console.log(randomCocktail)

            // Creating the different element of the result display :

            resultRandom = document.createElement("div");
            resultImage = document.createElement("img");
            resultCocktailName = document.createElement("p");
            resultCocktailCategory = document.createElement("p");
            resultCocktailAlcohol = document.createElement("p");
            resultCocktailGlass = document.createElement("p");
            resultCocktailIngredients = document.createElement("p");
            resultImageContainer = document.createElement("div");
            resultCocktailInstruction = document.createElement("p");

            // Adding class to elements :

            resultRandom.classList.add("result-element");
            resultImageContainer.classList.add("result-element-image-container");
            resultImage.classList.add("result-element-image");
            resultCocktailName.classList.add("result-element-title");
            resultCocktailName.classList.add("visible");
            resultCocktailCategory.classList.add("result-element-category");
            resultCocktailAlcohol.classList.add("result-element-category");
            resultCocktailGlass.classList.add("result-element-glass");
            resultCocktailIngredients.classList.add("result-element-category");
            resultCocktailInstruction.classList.add("result-element-instruction");

            // Adding values :

            resultRandom.setAttribute("id", "resultRandom");
            resultImage.src = randomCocktail.drinks[indexCocktail].strDrinkThumb;
            resultImage.style.borderRadius = "10px";
            resultCocktailName.innerHTML = randomCocktail.drinks[indexCocktail].strDrink;
            resultCocktailCategory.innerHTML = "<i class=\"fa-solid fa-boxes-stacked\"></i><span class=\n'coloredBold\'> Category : </span>";
            resultCocktailCategory.innerHTML += randomCocktail.drinks[indexCocktail].strCategory;
            resultCocktailAlcohol.innerHTML = "<i class=\"fa-solid fa-wine-bottle\"></i><span class=\n'coloredBold\'> Type : </span>";
            resultCocktailAlcohol.innerHTML += randomCocktail.drinks[indexCocktail].strAlcoholic;
            resultCocktailGlass.innerHTML = "<i class=\"fa-solid fa-martini-glass-citrus\"></i><span class=\n'coloredBold\'> Glass : </span>";
            resultCocktailGlass.innerHTML += randomCocktail.drinks[indexCocktail].strGlass;
            resultCocktailQuantity = randomCocktail.drinks[indexCocktail].strMeasure1;
            resultCocktailGlass.innerHTML += " (" + resultCocktailQuantity + ")";
            resultCocktailIngredients.innerHTML = "<i class=\"fa-solid fa-leaf\"></i><span class=\n'coloredBold\'> Ingredients : </span>";
            resultCocktailInstruction.innerHTML = "<i class=\"fa-solid fa-paste\"></i><span class=\n'coloredBold\'> Instructions : </span>";
            resultCocktailInstruction.innerHTML += randomCocktail.drinks[indexCocktail].strInstructions;

            // Reset values and setting ingredients
            resultIngredientsIterator = 0;
            resultIngredientsPath = "";

            if (randomCocktail.drinks[indexCocktail].strIngredient1 === null) { // Preventing errors
                resultCocktailIngredients.innerHTML = "Not specified";
            } else {
                resultIngredientsIterator = 0;
                do {
                    resultIngredientsIterator++;
                    resultIngredientsPath = randomCocktail.drinks[indexCocktail]['strIngredient' + resultIngredientsIterator];
                    if (resultIngredientsPath !== null) {
                        resultIngredientsImage = "http://www.thecocktaildb.com/images/ingredients/" + resultIngredientsPath.replace(' ', '%20') + ".png";
                        resultCocktailIngredients.innerHTML += '- ' + resultIngredientsPath + ' <img class = \"result-element-ingredient-image\" src= ' + resultIngredientsImage + '> <br>';
                    }
                } while (resultIngredientsPath !== null && resultIngredientsIterator <= 15);
            }

            // Adding to element to structure
            resultArea.appendChild(resultRandom);
            resultRandom.appendChild(resultImageContainer);
            resultImageContainer.appendChild(resultImage);
            resultRandom.appendChild(resultCocktailName);
            resultRandom.appendChild(resultCocktailCategory);
            resultRandom.appendChild(resultCocktailAlcohol);
            resultRandom.appendChild(resultCocktailGlass);
            resultRandom.appendChild(resultCocktailIngredients);
            resultRandom.appendChild(resultCocktailInstruction);

            // Change message
            resultMessage.innerHTML = changeMessage;

        }).catch(error => {
        throw(error);
    });
}