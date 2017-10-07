import { Component, OnInit } from '@angular/core';

import { ActionSheetController, NavParams} from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

   public mode:string = 'New';
   public recipeForm:FormGroup;
   public selectOptions:string[] = ['Easy', 'Medium', 'Hard'];

  constructor (private navParams:NavParams,
               private actionSheetController:ActionSheetController) {}

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
                    handler: () => {}
                },
                {
                    text: 'Remove all Ingredients',
                    role:  'destructive',
                    handler: () => {

                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        })
  }

  onSubmit () {
      console.log(this.recipeForm);
  }

  private initializeForm () {
     this.recipeForm = new FormGroup({
         title: new FormControl(null, Validators.required),
         description: new FormControl(null, Validators.required),
         difficulty: new FormControl('Medium', Validators.required)
     })
  }

}
