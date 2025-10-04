function searchByIngredient(jsonData, searchTerm) {
    const results = [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    for (const item of jsonData) {
        if (item.tags) {
            for (const ingredient of item.tags) {
                if (ingredient.toLowerCase().includes(lowerCaseSearchTerm)) {
                    results.push(item);
                    break;
                }
            }
        }
    }
    return results;
}

document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('card-container');
    const ingredientForm = document.getElementById('ingredient-form');
    const ingredientInput = document.getElementById('srch-ingredients');
    let allRecipes = [];

    // Load recipes
    fetch('/json/recipes.json')
        .then(response => response.json())
        .then(recipes => {
            allRecipes = recipes;
            displayRecipes(allRecipes);
        })
        .catch(error => console.error('Error loading recipes:', error));

    // Display recipe cards
    function displayRecipes(recipes) {
        recipeContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const recipeName = document.createElement('h2');
            recipeName.textContent = recipe.title;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;
            recipeImage.classList.add('recipe-image');
            recipeCard.appendChild(recipeImage);

            const ingredientsTitle = document.createElement('h3');
            ingredientsTitle.textContent = 'Ingredients:';
            const ingredientsList = document.createElement('ul');
            recipe.ingredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.textContent = ingredient;
                ingredientsList.appendChild(listItem);
            });

            const instructionsTitle = document.createElement('h3');
            instructionsTitle.textContent = 'Instructions:';
            const instructionsParagraph = document.createElement('p');
            instructionsParagraph.textContent = recipe.directions;

            recipeCard.appendChild(recipeName);
            recipeCard.appendChild(ingredientsTitle);
            recipeCard.appendChild(ingredientsList);
            recipeCard.appendChild(instructionsTitle);
            recipeCard.appendChild(instructionsParagraph);

            recipeContainer.appendChild(recipeCard);
        });
    }

    // Ingredient search form handler
    ingredientForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const query = ingredientInput.value.toLowerCase().trim();
        if (!query) return;

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