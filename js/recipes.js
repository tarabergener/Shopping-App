function searchByIngredient(jsonData, searchTerm) {
    const results = [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    for (const item in jsonData) {
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

    fetch('/json/recipes.json') // Path to your JSON file
        .then(response => response.json())
        .then(recipes => {
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
        })
        .catch(error => console.error('Error loading recipes:', error));
});