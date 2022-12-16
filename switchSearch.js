let switchButton = document.getElementById("switcher-container");
let searchText = document.getElementById("switcher-text");
let searchBarText = document.getElementById("search-bar");
let searchButton = document.getElementById("search-button");
let resultMessageArea = document.getElementById("result-message");
// Variable stored know what we are looking for
sessionStorage.setItem('pageState', 'name');


function processRequest () {

    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('s');

    if (searchValue == "ingredient") {
        switchSearch();
    }

}

function switchSearch () {

    if (sessionStorage.getItem('pageState') === 'ingredient') {
        resultGrid.innerHTML = "";
        searchText.innerHTML = "Search by <span class=\"switch-state-color\">ingredients</span>";
        searchBarText.placeholder = "Search a cocktail by name";
        searchButton.setAttribute('onclick','getCocktailsByName()')
        sessionStorage.setItem('pageState', 'name');
        resultMessageArea.innerHTML = "Search a cocktail with the field above !";
    }
    else if (sessionStorage.getItem('pageState') === 'name') {

        resultGrid.innerHTML = "";
        searchText.innerHTML = "Search by <span class=\"switch-state-color\">name</span>";
        searchBarText.placeholder = "Search a cocktail by ingredients";
        searchButton.setAttribute('onclick','getCocktailsByIngredient()')
        sessionStorage.setItem('pageState', 'ingredient');
    }
    else {
        alert("Critical error, refreshing page...");
        //window.location.reload();
    }
    return false
}

