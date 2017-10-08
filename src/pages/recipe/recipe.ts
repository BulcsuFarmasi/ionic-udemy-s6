import { Component, OnInit } from '@angular/core';


import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe';

import { EditRecipePage } from '../edit-recipe/edit-recipe';

import { ShoppingListService } from '../../services/shopping-list';
import { RecipesService } from "../../services/recipes";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
    public recipe:Recipe;
    private index:number;

    constructor (private navParams:NavParams,
                 private navController:NavController,
                 private shoppingListService:ShoppingListService,
                 private recipesService:RecipesService) {}

    ngOnInit () {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    onAddIngredients () {
      this.shoppingListService.addItems(this.recipe.ingredients);
    }

    onDeleteRecipe () {
        this.recipesService.removeRecipe(this.index);
        this.navController.popToRoot();
    }

    onEditRecipe () {
        this.navController.push(EditRecipePage,
                          {mode: 'Edit', recipe: this.recipe, index: this.index});
    }
}
