import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActionSheetController, AlertController,
         NavController, NavParams, ToastController} from 'ionic-angular';

import { Recipe } from '../../models/recipe';

import { RecipesService } from '../../services/recipes';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

   public mode:string = 'New';
   public recipeForm:FormGroup;
   public selectOptions:string[] = ['Easy', 'Medium', 'Hard'];

    private index:number;
    private recipe:Recipe;


  constructor (private navParams:NavParams,
               private actionSheetController:ActionSheetController,
               private alertController:AlertController,
               private toastController:ToastController,
               private recipesService:RecipesService,
               private navController:NavController) {}

  ngOnInit () {
      this.mode = this.navParams.get('mode');
      if (this.mode === 'Edit') {
          this.recipe = this.navParams.get('recipe');
          this.index = this.navParams.get('index');
      }
      this.initializeForm();
  }

  onManageIngredients () {
        const actionSheet = this.actionSheetController.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Add Ingredient',
                    handler: () => {
                        this.createNewIngedientAlert().present();
                    }
                },
                {
                    text: 'Remove all Ingredients',
                    role:  'destructive',
                    handler: () => {
                        const formArray:FormArray = <FormArray>this.recipeForm.get('ingredients');
                        const length = formArray.length;
                        if (length > 0) {
                            for (let i = length - 1; i >= 0; i--){
                                formArray.removeAt(i);
                            }
                            const toast = this.toastController.create({
                                message: 'All ingredients were deleted!',
                                duration: 1500,
                                position: 'bottom'
                            });
                            toast.present();
                        }
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        })
      actionSheet.present();
  }

  onSubmit () {
      const value = this.recipeForm.value;
      let ingredients = [];
      if(value.ingredients.length > 0) {
          ingredients = value.ingredients.map((name:string) => {
              return {name, amount: 1};
          })
      }
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients)
      this.recipeForm.reset();
      this.navController.popToRoot();
  }

  private createNewIngedientAlert () {
     return this.alertController.create({
          title: 'Add Ingredient',
          inputs: [
              {
                  name: 'name',
                  placeholder: 'Name'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel'
              },
              {
                  text: 'Add',
                  handler: data => {
                      if (data.name.trim() == '' || data.name == null){
                          const toast = this.toastController.create({
                              message: 'Please enter a valid value!',
                              duration: 1500,
                              position: 'bottom'
                          });
                          toast.present();
                      } else {
                          (<FormArray>this.recipeForm.get('ingredients'))
                              .push(new FormControl(data.name, Validators.required))
                          const toast = this.toastController.create({
                              message: 'Item added!',
                              duration: 1500,
                              position: 'bottom'
                          });
                          toast.present();
                      }
                  }
              }
          ]
      });
  }

  private initializeForm () {
     let title = null;
     let description = null;
     let difficulty = 'Medium';
     let ingredients = [];

     if (this.mode === 'Edit') {
         title = this.recipe.title;
         description = this.recipe.description;
         difficulty = this.recipe.difficulty;
         for (let ingredient of this.recipe.ingredients) {
            ingredients.push(new FormControl(ingredient.name, Validators.required))
         }
     }

     this.recipeForm = new FormGroup({
         title: new FormControl(title, Validators.required),
         description: new FormControl(description, Validators.required),
         difficulty: new FormControl(difficulty, Validators.required),
         ingredients: new FormArray(ingredients)
     })
  }

}
