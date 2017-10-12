import { Component, OnInit } from '@angular/core';


import  { AlertController, NavController, NavParams } from 'ionic-angular';

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
                 private recipesService:RecipesService,
                 private alertController:AlertController) {}

    ngOnInit () {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    onAddIngredients () {
      this.shoppingListService.addItems(this.recipe.ingredients);
    }

    onDeleteRecipe () {
        const alert = this.alertController.create({
            title: 'Confirm deleting',
            message: 'Do you want to delete this recipe?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.recipesService.removeRecipe(this.index);
                        this.navController.popToRoot();
                    }
                }
            ]
        })
        alert.present();
    }

    onEditRecipe () {
        this.navController.push(EditRecipePage,
                          {mode: 'Edit', recipe: this.recipe, index: this.index});
    }
}
