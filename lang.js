let home = false;
let search = false;
let random = false;
let lang;
let elements = [];


function homeActive() {
    home = true;
}

function searchActive() {
    search = true;
}

function randomActive() {
    random = true;

}

function translateHomeFr() {
    document.getElementById("nav-list").innerHTML = "<li class=\"nav-element\"><a class=\"nav-link\" href=\"index.html\"><i class=\"fa-solid fa-house-chimney\"></i>&nbsp;Accueil</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html\">Nom</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html?s=ingredient\">Ingredients</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"random.html\">Aléatoire</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"mailto:contact@cocktail.bible.com\">Contactez-nous</a></li>"
    document.getElementById("home-text").innerHTML = "La Bible du <span class=\"colored-text\">Cocktail</span>";
    document.getElementById("home-button-byname-text").innerHTML = "Chercher par nom&nbsp; <i class=\"fa-solid fa-spell-check\"></i>";
    document.getElementById("home-button-byingredient-text").innerHTML = "Chercher par ingrédient&nbsp; <i class=\"fa-solid fa-lemon\"></i>";
    document.getElementById("home-button-random-text").innerHTML = "Cocktail au hasard ?&nbsp; <i class=\"fa-solid fa-dice\"></i>";
    localStorage.setItem('lang', 'fr')

}

function translateHomeEn() {
    document.getElementById("nav-list").innerHTML = "<li class=\"nav-element\"><a class=\"nav-link\" href=\"index.html\"><i class=\"fa-solid fa-house-chimney\"></i>&nbsp;Home</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html\">Name</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html?s=ingredient\">Ingredients</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"random.html\">Random</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"mailto:contact@cocktail.bible.com\">Contact</a></li>"
    document.getElementById("home-text").innerHTML = "The <span class=\"colored-text\">Cocktail</span> Bible";
    document.getElementById("home-button-byname-text").innerHTML = "Search by name&nbsp; <i class=\"fa-solid fa-spell-check\"></i>";
    document.getElementById("home-button-byingredient-text").innerHTML = "Search by ingredient&nbsp; <i class=\"fa-solid fa-lemon\"></i>";
    document.getElementById("home-button-random-text").innerHTML = "Random cocktail ?&nbsp; <i class=\"fa-solid fa-dice\"></i>";
    localStorage.setItem('lang', 'en')
}

function translateRandomEn() {
    document.getElementById("nav-list").innerHTML = "<li class=\"nav-element\"><a class=\"nav-link\" href=\"index.html\"><i class=\"fa-solid fa-house-chimney\"></i>&nbsp;Home</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html\">Name</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html?s=ingredient\">Ingredients</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"random.html\">Random</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"mailto:contact@cocktail.bible.com\">Contact</a></li>"
    document.getElementById("random").innerHTML = " <p id=\"random-text\">Find <span class=\"colored-text\">Random</span> cocktail</p><p id=\"random-message\">Search a cocktail with the field above !</p><div id=\"random-container\"onclick=\"getRandomCocktails()\"><div id=\"random-empty-result\"></div></div>"
    localStorage.setItem('lang', 'en')
}

function translateRandomFr() {
    document.getElementById("nav-list").innerHTML = "<li class=\"nav-element\"><a class=\"nav-link\" href=\"index.html\"><i class=\"fa-solid fa-house-chimney\"></i>&nbsp;Accueil</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html\">Nom</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"search.html?s=ingredient\">Ingredients</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"random.html\">Aléatoire</a></li>"
        + "<li class=\"nav-element\"><a class=\"nav-link\" href=\"mailto:contact@cocktail.bible.com\">Contactez-nous</a></li>"


    document.getElementById("random").innerHTML = " <p id=\"random-text\">Trouver <span class=\"colored-text\">au hasard</span> un cocktail</p><p id=\"random-message\">Cherchez un cocktail avec le champ ci-dessus !</p><div id=\"random-container\"onclick=\"getRandomCocktails()\"><div id=\"random-empty-result\"></div></div>"
    localStorage.setItem('lang', 'fr')
}

function translateSearchEn() {
    document.getElementById("banner-container").innerHTML = "<div id=\"switcher-container\" onclick=\"switchSearch()\"><p id=\"switcher-text\">Search by <span class=\"button-text-color\">name</span></p><img id=\"switcher-icon\" src=\"images/switch-icon-white.png\" alt=\"switch arrow\"></div><p id=\"banner-title\">Search</p><div id=\"back-button\"><a id=\"back-button-text\" href=\"index.html\"> <i class=\"fa-solid fa-circle-chevron-left\"></i>&nbsp;&nbsp;Go back to <span class=\"button-text-color\">menu</span></a></div>"
    document.getElementById("search-bar").setAttribute("placeholder", "Search a cocktail by name")
    document.getElementById("result-message").innerHTML = "Loading search API..."
    localStorage.setItem('lang', 'en')
}

function translateSearchFr() {
    document.getElementById("banner-container").innerHTML = "<div id=\"switcher-container\" onclick=\"switchSearch()\"><p id=\"switcher-text\">Chercher par <span class=\"button-text-color\">nom</span></p><img id=\"switcher-icon\" src=\"images/switch-icon-white.png\" alt=\"switch arrow\"></div><p id=\"banner-title\">Rechercher</p><div id=\"back-button\"><a id=\"back-button-text\" href=\"index.html\"> <i class=\"fa-solid fa-circle-chevron-left\"></i>&nbsp;&nbsp;Retourner au <span class=\"button-text-color\">menu</span></a></div>"
    document.getElementById("search-bar").setAttribute("placeholder", "Rechercher un cocktail par nom")
    document.getElementById("result-message").innerHTML = "Chargement de l'API..."
    localStorage.setItem('lang', 'fr')

}

function checkLanguageHome() {
    if (localStorage.getItem('lang') === 'fr') {
        document.getElementById("language-select").innerHTML = "<option value=\"fr\">FR</option><option value=\"en\">EN</option>"
        translateHomeFr()
    } else if (localStorage.getItem('lang') === 'en') {
        translateHomeEn()
    }

}

function checkLanguageRandom() {
    if (localStorage.getItem('lang') === 'fr') {
        document.getElementById("language-select").innerHTML = "<option value=\"fr\">FR</option><option value=\"en\">EN</option>"
        translateRandomFr()
    } else if (localStorage.getItem('lang') === 'en') {
        translateRandomEn()
    }

}


function checkLanguageSearch() {
    if (localStorage.getItem('lang') === 'fr') {
        translateSearchFr()
    } else if (localStorage.getItem('lang') === 'en') {
        translateSearchEn()
    }
}


$("#language-select").change(function () {
    var language = $(this).val();

    if (home) {
        search = false;
        random = false;

        if (language === "en") {
            translateHomeEn()
        } else if (language === "fr") {
            translateHomeFr()
        }
    }

    if (random) {

        home = false;
        search = false;

        if (language === "en") {
            translateRandomEn()
        } else if (language === "fr") {
            translateRandomFr()
        }


    }

    if (search) {

        home = false;
        random = false;

        if (language === "en") {
            translateSearchEn()

        } else if (language === "fr") {
            translateSearchFr()
        }
    }
});