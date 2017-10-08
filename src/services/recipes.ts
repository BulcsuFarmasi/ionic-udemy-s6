import { Injectable } from '@angular/core';

import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';

@Injectable()
export class RecipesService {
    private recipes: Recipe[] = [];

    addRecipe (title:string, description:string,
                  difficulty:string, ingredients:Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    }

    getRecipes () {
        return this.recipes.slice();
    }

    removeRecipe (index:number) {
        this.recipes.splice(index, 1)
    }

    updateRecipe (index: number,
                  title:string,
                  desciption:string,
                  difficulty:string,
                  ingredients:Ingredient[]) {
        this.recipes[index] = new Recipe(title, desciption, difficulty, ingredients);
    }



}