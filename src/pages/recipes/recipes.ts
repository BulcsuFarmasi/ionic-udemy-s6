import { Component } from '@angular/core';

import { AlertController, LoadingController, NavController, PopoverController} from 'ionic-angular';

import { Recipe } from '../../models/recipe'

import { DatabaseOptionsPage } from '../database-options/database-options';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';

import { AuthService } from '../../services/auth';
import { RecipesService } from '../../services/recipes';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  public recipes:Recipe[] = [];

  constructor (private navController:NavController,
               private recipesService:RecipesService,
               private popoverController:PopoverController,
               private loadingController:LoadingController,
               private alertController:AlertController,
               private authService:AuthService) {}
  
  ionViewWillEnter () {
    this.loadRecipes();
  }

    handleError (errorMessage:string) {
        const alert = this.alertController.create({
            title: 'An error occured!',
            message: errorMessage,
            buttons: ['Ok']
        })
        alert.present();
    }

  loadRecipes () {
    this.recipes = this.recipesService.getRecipes();
  }

  onLoadRecipe (recipe:Recipe, index:number) {
      this.navController.push(RecipePage, {recipe, index});
  }

  onNewRecipe () {
    this.navController.push(EditRecipePage, {mode: 'New'});
  }

  onShowOptions (event:MouseEvent) {
        const loading = this.loadingController.create({
            content: 'Please wait...'
        });
        const popover = this.popoverController.create(DatabaseOptionsPage);
        popover.present({ev: event});
        popover.onDidDismiss((data) => {
            if (data.action == 'load') {
                loading.present();
                this.authService.getActiveUser().getToken()
                    .then((token) => {
                        this.recipesService.fetchList(token)
                            .subscribe(
                                (list:Recipe[]) => {
                                    loading.dismiss();
                                    if (list) {
                                        this.recipes = list;
                                    } else {
                                        this.recipes = [];
                                    }
                                },
                                (error) => {
                                    loading.dismiss();
                                    this.handleError(error.json().error);
                                }
                            );
                    })
            } else if (data.action == 'store') {
                loading.present();
                this.authService.getActiveUser().getToken()
                    .then((token) => {
                        this.recipesService.storeList(token)
                            .subscribe(
                                () => {loading.dismiss()},
                                (error) => {
                                    loading.dismiss()
                                    this.handleError(error.json().error);
                                }
                            );
                    })
            }
        })
    }
  
}
