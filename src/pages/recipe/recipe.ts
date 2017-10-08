import { Component, OnInit } from '@angular/core';


import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
    public recipe:Recipe;
    private index:number;

    constructor (private navParams:NavParams,
                 private navController:NavController) {}

    ngOnInit () {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    onEditRecipe () {
        this.navController.push(EditRecipePage,
                          {mode: 'Edit', recipe: this.recipe, index: this.index});
    }
}
