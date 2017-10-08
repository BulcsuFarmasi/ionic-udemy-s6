import { Component, OnInit } from '@angular/core';

import { ActionSheetController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

   public mode:string = 'New';
   public recipeForm:FormGroup;
   public selectOptions:string[] = ['Easy', 'Medium', 'Hard'];

  constructor (private navParams:NavParams,
               private actionSheetController:ActionSheetController,
               private alertController:AlertController,
               private toastController:ToastController) {}

  ngOnInit () {
      this.mode = this.navParams.get('mode');
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
      console.log(this.recipeForm);
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
     this.recipeForm = new FormGroup({
         title: new FormControl(null, Validators.required),
         description: new FormControl(null, Validators.required),
         difficulty: new FormControl('Medium', Validators.required),
         ingredients: new FormArray([])
     })
  }

}
