// Variable stored know what we are looking for
sessionStorage.setItem('pageState', 'name');


function processRequest () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('s');
    if (searchValue == "ingredient") {
        switchSearch();
    }

}

function switchSearch() {

    let searchBarNamePlaceholder = "";
    let searchBarIngredientPlaceholder = "";
    let buttonNamePlaceholder = "";
    let buttonIngredientPlaceholder = "";
    let resultMessagePlaceholder = "";

    let searchButtonTextArea = document.getElementById("switcher-text");
    let searchBar = document.getElementById("search-bar");
    let searchButton = document.getElementById("search-button");
    let resultMessageArea = document.getElementById("result-message");

    // Setting values -----------

    if (localStorage.getItem('lang') === 'fr') {
        searchBarNamePlaceholder = "Cherchez un cocktail par nom";
        searchBarIngredientPlaceholder = "Cherchez un cocktail par ingredient";
        buttonIngredientPlaceholder = "Cherchez par <span class=\"switch-state-color\">ingredients</span>";
        buttonNamePlaceholder = "Cherchez par <span class=\"switch-state-color\">nom</span>";
        resultMessagePlaceholder = "Cherche un cocktail avec la barre au-dessus !";
    }
    else {
        searchBarNamePlaceholder = "Search a cocktail by name";
        searchBarIngredientPlaceholder = "Search a cocktail by ingredient";
        buttonIngredientPlaceholder = "Search by <span class=\"switch-state-color\">ingredients</span>";
        buttonNamePlaceholder = "Search by <span class=\"switch-state-color\">name</span>";
        resultMessagePlaceholder = "Search a cocktail with the field above !";
    }

    // Switch element -----------

    if (sessionStorage.getItem('pageState') === 'ingredient') {


        resultGrid.innerHTML = "";
        searchButtonTextArea.innerHTML = buttonIngredientPlaceholder;
        searchBar.placeholder = searchBarNamePlaceholder;
        resultMessageArea.innerHTML = resultMessagePlaceholder;
        searchButton.setAttribute('onclick','getCocktailsByName()')
        sessionStorage.setItem('pageState', 'name');
    }
    else if (sessionStorage.getItem('pageState') === 'name') {

        resultGrid.innerHTML = "";
        searchButtonTextArea.innerHTML = buttonNamePlaceholder  ;
        searchBar.placeholder = searchBarIngredientPlaceholder;
        searchButton.setAttribute('onclick','getCocktailsByIngredient()')
        sessionStorage.setItem('pageState', 'ingredient');
    }
    else {
        alert("Critical error, refreshing page...");
        window.location.reload();
    }
    return false
}

