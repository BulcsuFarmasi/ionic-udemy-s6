import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PopoverController } from 'ionic-angular';


import { Ingredient } from '../../models/ingredient';

import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';

import { AuthService } from '../../services/auth';
import { ShoppingListService } from '../../services/shopping-list';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
    
    public listItems:Ingredient[] = [];
    
    constructor (private shoppingListService:ShoppingListService,
                 private popoverController:PopoverController,
                 private authService:AuthService){}
    
    ionViewWillEnter () {
        this.loadItems();
    }

    onAddItem (form:NgForm) {
        const name = form.value.ingredientName;
        const amount = form.value.amount;
        this.shoppingListService.addItem(name, amount);
        this.loadItems();
        form.reset();
    }

    onRemoveItem (index:number) {
        this.shoppingListService.removeItem(index);
        this.loadItems();
    }

    onShowOptions (event:MouseEvent) {
        const popover = this.popoverController.create(ShoppingListOptionsPage);
        popover.present({ev: event});
        popover.onDidDismiss((data) => {
            if (data.action == 'load') {

            } else {
                this.authService.getActiveUser().getToken()
                    .then((token) => {

                    })
            }
        })
    }

    private loadItems () {
        this.listItems = this.shoppingListService.getItems();
    }
}