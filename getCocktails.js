let searchbar;
let resultGrid;
let resultElements = [];
let resultImageContainer = [];
let resultImage = [];
let resultCocktailName = [];
let resultCocktailIngredients = [];
let loadedCocktailNumber = -1;

let resultMessage;
let resultNumber;
let displayResult;
let verif1;
let verif2;


searchbar = document.getElementById('search-bar');
resultGrid = document.getElementById("result-grid");
resultMessage = document.getElementById("result-message");


function getCocktailsByName() {

    if (searchbar.value === "") {
        alert("Error : you don't specify any term to search. Please retry !");
    } else {


        document.getElementById("result-grid").innerHTML = "";
        resultMessage.innerHTML = "Loading...";

        fetch("http://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita" + searchbar.value +
            {method: "GET", headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(response => response.json())
            .then(listCocktails => {

                console.log(listCocktails);
                resultNumber = null;

                if (resultNumber == 0) {
                    alert("Sorry, can't find any cocktail with this name, please enter a valid search.");
                    resultMessage.innerHTML = "No result found";
                } else {

                    resultMessage.innerHTML = resultNumber + " cocktails founds :";

                    if (resultNumber > 15) {
                        displayResult = 15;
                    } else {
                        displayResult = resultNumber;
                    }


                    // ------------------ DYNAMIC ELEMENT CREATION -----------------

                    for (let i = 0; i < displayResult; i++) {

                        // Verification :
                        /*
                        verif1 = listBooks.hits.hits[i];
                        verif2 = listBooks.hits.hits[i].fields;

                        if (!("edition" in verif1) || !("highlight" in verif1) || !("meta_subjectSorter" in verif2) || !("meta_publisher" in verif2)) {
                            console.log("fail");
                            displayResult++;
                        } else {
                            loadedCocktailNumber++;

                            resultElements.push(document.createElement("div"));
                            resultElements[loadedCocktailNumber].classList.add("result-element");
                            resultGrid.appendChild(resultElements[loadedCocktailNumber]);


                            resultImageContainer.push(document.createElement("a"));
                            resultImageContainer[loadedCocktailNumber].classList.add("result-element-image-container");
                            resultImageContainer[loadedCocktailNumber].setAttribute('target', '_blank');
                            resultElements[loadedCocktailNumber].appendChild(resultImageContainer[loadedCocktailNumber]);


                            resultImage.push(document.createElement("img"));
                            resultImage[loadedCocktailNumber].classList.add("result-element-image");
                            resultImageContainer[loadedCocktailNumber].appendChild(resultImage[loadedCocktailNumber]);

                            resultCocktailName.push(document.createElement("p"));
                            resultCocktailName[loadedCocktailNumber].classList.add("result-element-title");
                            resultCocktailName[loadedCocktailNumber].classList.add("visible");
                            resultElements[loadedCocktailNumber].appendChild(resultCocktailName[loadedCocktailNumber]);
                        }

                         */
                    }
                }
            });
    }
    return false;
}

function getCocktailsByIngredients() {
    alert("Non configuré");
    return false;
}


setInterval(checkEmpty, 100);

function checkEmpty() {
    if (searchbar.value == "") {
        resultGrid.innerHTML = "";
        resultMessage.innerHTML = "Search a book with the field above !";
    }
}

searchbar.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});
