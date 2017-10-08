import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Recipe } from '../../models/recipe'

import { EditRecipePage } from '../edit-recipe/edit-recipe';

import { RecipesService } from '../../services/recipes';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  public recipes:Recipe[] = [];

  constructor (private navController:NavController,
               private recipesService:RecipesService) {}
  
  ionViewWillEnter () {
    this.loadRecipes();
  }

  loadRecipes () {
    this.recipes = this.recipesService.getRecipes();
  }

  onLoadRecipe () {

  }

  onNewRecipe () {
    this.navController.push(EditRecipePage, {mode: 'New'});
  }
  
}
