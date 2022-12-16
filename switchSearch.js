let switchButton = document.getElementById("switcher-container");
let searchText = document.getElementById("switcher-text");
let searchBarText = document.getElementById("search-bar");
let searchButton = document.getElementById("search-button");

let searchState = new Array(1);
searchState[0] = 1;
// 0 = Currently searching by ingredient
// 1 = Currently searching by name

function processRequest () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('s');
    if (searchValue == "ingredient") {
        switchSearch(searchState);
    }

}

function switchSearch (searchState) {

    if (searchState[0] == 0) {
        resultGrid.innerHTML = "";
        searchText.innerHTML = "Search by <span class=\"switch-state-color\">ingredients</span>";
        searchBarText.placeholder = "Search a cocktail by name";
        searchButton.setAttribute('onclick','getCocktailsByName()')

        searchState[0] = 1;
    }
    else if (searchState[0] == 1) {
        resultGrid.innerHTML = "";
        searchText.innerHTML = "Search by <span class=\"switch-state-color\">name</span>";
        searchBarText.placeholder = "Search a cocktail with specified ingredients";
        searchButton.setAttribute('onclick','getCocktailsByIngredient()')

        searchState[0] = 0;
    }
    else {
        alert("Critical error, refreshing page...");
        window.location.reload();
    }
    return false
}
