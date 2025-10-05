// Search JSON for recipes including ingredients specified by user
function searchByIngredient(jsonData, searchTerm) {
    const results = [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // convert input lowercase

    for (const item of jsonData) {
        if (item.tags) { // if item in the database has tags aka ingredient names
            for (const ingredient of item.tags) {
                if (ingredient.toLowerCase().includes(lowerCaseSearchTerm)) {
                    results.push(item); // add items to results list
                    break;
                }
            }
        }
    }
    return results; // return list of items
}

// populate cards onto the recipe page from JSON data
document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('card-container');
    const ingredientForm = document.getElementById('ingredient-form');
    const ingredientInput = document.getElementById('srch-ingredients');
    let allRecipes = [];

    // Load recipes
    fetch('/json/recipes.json')
        .then(response => response.json()) // JSON responds with data
        .then(recipes => {
            allRecipes = recipes;
            displayRecipes(allRecipes); // access all recipes in JSON
        })
        .catch(error => console.error('Error loading recipes:', error));

    // Display recipe cards
    function displayRecipes(recipes) {
        recipeContainer.innerHTML = ''; // add container into HTML
        recipes.forEach(recipe => { // for each recipe in recipes
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            // add name
            const recipeName = document.createElement('h2');
            recipeName.textContent = recipe.title;
            // add image
            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;
            recipeImage.classList.add('recipe-image');
            recipeCard.appendChild(recipeImage);
            // add ingredients
            const ingredientsTitle = document.createElement('h3');
            ingredientsTitle.textContent = 'Ingredients:';
            const ingredientsList = document.createElement('ul');
            recipe.ingredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.textContent = ingredient;
                ingredientsList.appendChild(listItem);
            });
            // add instructions
            const instructionsTitle = document.createElement('h3');
            instructionsTitle.textContent = 'Instructions:';
            const instructionsParagraph = document.createElement('p');
            instructionsParagraph.textContent = recipe.directions;
            // add elements to card
            recipeCard.appendChild(recipeName);
            recipeCard.appendChild(ingredientsTitle);
            recipeCard.appendChild(ingredientsList);
            recipeCard.appendChild(instructionsTitle);
            recipeCard.appendChild(instructionsParagraph);
            // add cards to container
            recipeContainer.appendChild(recipeCard);
        });
    }

    // Search for recipes by ingredients
    ingredientForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // find recipe; convert to lowercase
        const query = ingredientInput.value.toLowerCase().trim();
        if (!query) return;
        // split ingredients with a ',' when listing in search
        const queryTerms = query.split(',').map(term => term.trim());

        const filtered = allRecipes.filter(recipe =>
            recipe.ingredients.some(ingredient =>
                queryTerms.some(term =>
                    ingredient.toLowerCase().includes(term)
                )
            )
        );

        displayRecipes(filtered);
        document.getElementById('id01').style.display = 'none';
    });
});