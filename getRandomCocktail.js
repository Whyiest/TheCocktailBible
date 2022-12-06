let loadedCocktailNumber = 0;
let indexCocktail = 0;
let resultArea;
let resultMessage;
let resultAnimation;
let resultRandom = [];
let resultImageContainer = [];
let resultImage = [];
let resultCocktailName = [];
let resultCocktailCategory = [];
let resultCocktailIngredients = [];
let resultCocktailAlcohol = [];
let resultIngredientsPath = "";
let resultIngredientsIterator = 0;
let resultCocktailInstruction = [];
let resultCocktailGlass = [];
let resultCocktailQuantity = [];

function resetData () {
    resultRandom = [];
    resultImageContainer = [];
    resultImage = [];
    resultCocktailName = [];
    resultCocktailCategory = [];
    resultCocktailIngredients = [];
    resultCocktailAlcohol = [];
    resultIngredientsPath;
    resultIngredientsIterator;
    resultCocktailInstruction = [];
    resultCocktailGlass = [];
    resultCocktailQuantity = [];
}

function getRandomCocktails () {

    // Change result message
    resultMessage = document.getElementById("random-message");
    resultMessage.innerHTML = "Making some good receipt...";

    // Define result area
    resultArea = document.getElementById("random-container");

    // Restart animation during loading
    resultAnimation = document.getElementById('random-empty-result');

    if (resultRandom.length !== 0) { // If the result area is not empty
        resultRandom = document.getElementById("resultRandom");
        resultRandom.remove();
    }

    if (resultAnimation.classList.contains('random-hidden')) {
        resultAnimation.classList.remove("random-hidden");
    }

    fetch("http://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(randomCocktail => {

            resultAnimation.classList.add("random-hidden");
            console.log(randomCocktail)

            resetData();

            // Creating the different element of the result display :

            resultRandom.push(document.createElement("div"));
            resultImage.push(document.createElement("img"));
            resultCocktailName.push(document.createElement("p"));
            resultCocktailCategory.push(document.createElement("p"));
            resultCocktailAlcohol.push(document.createElement("p"));
            resultCocktailGlass.push(document.createElement("p"));
            resultCocktailIngredients.push(document.createElement("p"));
            resultImageContainer.push(document.createElement("div"));
            resultCocktailInstruction.push(document.createElement("p"));

            // Adding class to elements :

            resultRandom[loadedCocktailNumber].classList.add("result-element");
            resultImageContainer[loadedCocktailNumber].classList.add("result-element-image-container");
            resultImage[loadedCocktailNumber].classList.add("result-element-image");
            resultCocktailName[loadedCocktailNumber].classList.add("result-element-title");
            resultCocktailName[loadedCocktailNumber].classList.add("visible");
            resultCocktailCategory[loadedCocktailNumber].classList.add("result-element-category");
            resultCocktailAlcohol[loadedCocktailNumber].classList.add("result-element-category");
            resultCocktailGlass[loadedCocktailNumber].classList.add("result-element-glass");
            resultCocktailIngredients[loadedCocktailNumber].classList.add("result-element-category");
            resultCocktailInstruction[loadedCocktailNumber].classList.add("result-element-instruction");

            // Adding values :

            resultRandom[loadedCocktailNumber].setAttribute("id","resultRandom");
            resultImage[loadedCocktailNumber].src = randomCocktail.drinks[indexCocktail].strDrinkThumb;
            resultImage[loadedCocktailNumber].style.borderRadius = "10px";
            resultCocktailName[loadedCocktailNumber].innerHTML = randomCocktail.drinks[indexCocktail].strDrink;
            resultCocktailCategory[loadedCocktailNumber].innerHTML = "<i class=\"fa-solid fa-boxes-stacked\"></i><span class=\n'coloredBold\'> Category : </span>";
            resultCocktailCategory[loadedCocktailNumber].innerHTML += randomCocktail.drinks[indexCocktail].strCategory;
            resultCocktailAlcohol[loadedCocktailNumber].innerHTML = "<i class=\"fa-solid fa-wine-bottle\"></i><span class=\n'coloredBold\'> Type : </span>";
            resultCocktailAlcohol[loadedCocktailNumber].innerHTML += randomCocktail.drinks[indexCocktail].strAlcoholic;
            resultCocktailGlass[loadedCocktailNumber].innerHTML = "<i class=\"fa-solid fa-martini-glass-citrus\"></i><span class=\n'coloredBold\'> Glass : </span>";
            resultCocktailGlass[loadedCocktailNumber].innerHTML += randomCocktail.drinks[indexCocktail].strGlass;
            resultCocktailQuantity[loadedCocktailNumber] = randomCocktail.drinks[indexCocktail].strMeasure1;
            resultCocktailGlass[loadedCocktailNumber].innerHTML += " (" + resultCocktailQuantity[loadedCocktailNumber] + ")";
            resultCocktailIngredients[loadedCocktailNumber].innerHTML = "<i class=\"fa-solid fa-leaf\"></i><span class=\n'coloredBold\'> Ingredients : </span>";
            resultCocktailInstruction[loadedCocktailNumber].innerHTML = "<i class=\"fa-solid fa-paste\"></i><span class=\n'coloredBold\'> Instructions : </span>";
            resultCocktailInstruction[loadedCocktailNumber].innerHTML += randomCocktail.drinks[indexCocktail].strInstructions;

            // Reset values and setting ingredients
            resultIngredientsIterator = 0;
            resultIngredientsPath = "";

            if (randomCocktail.drinks[indexCocktail].strIngredient1 === null) { // Preventing errors
                resultCocktailIngredients[loadedCocktailNumber].innerHTML = "Not specified";
            }
            else {
                resultIngredientsIterator = 0;
                do {
                    resultIngredientsIterator++;
                    resultIngredientsPath = randomCocktail.drinks[indexCocktail]['strIngredient' + resultIngredientsIterator];
                    if (resultIngredientsPath !== null) {
                        resultCocktailIngredients[loadedCocktailNumber].innerHTML += '- ' + resultIngredientsPath + '<br>';
                    }
                } while (resultIngredientsPath !== null && resultIngredientsIterator <= 15);
            }

            // Adding to element to structure

            resultArea.appendChild(resultRandom[loadedCocktailNumber]);
            resultRandom[loadedCocktailNumber].appendChild(resultImageContainer[loadedCocktailNumber]);
            resultImageContainer[loadedCocktailNumber].appendChild(resultImage[loadedCocktailNumber]);
            resultRandom[loadedCocktailNumber].appendChild(resultCocktailName[loadedCocktailNumber]);
            resultRandom[loadedCocktailNumber].appendChild(resultCocktailCategory[loadedCocktailNumber]);
            resultRandom[loadedCocktailNumber].appendChild(resultCocktailAlcohol[loadedCocktailNumber]);
            resultRandom[loadedCocktailNumber].appendChild(resultCocktailGlass[loadedCocktailNumber]);
            resultRandom[loadedCocktailNumber].appendChild(resultCocktailIngredients[loadedCocktailNumber]);
            resultRandom[loadedCocktailNumber].appendChild(resultCocktailInstruction[loadedCocktailNumber]);

            // Change message
            resultMessage.innerHTML = "Click again to discover another cocktail !";

        });
}