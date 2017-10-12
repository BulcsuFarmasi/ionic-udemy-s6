import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
    
    public listItems:Ingredient[] = [];
    public mode:string = 'Add';
    
    constructor (private shoppingListService:ShoppingListService){}
    
    ionViewWillEnter () {
        this.loadItems();
    }

    onEditItem (index: number) {
        this.mode = 'Edit'
    }

    onRemoveItem (index:number) {
        this.shoppingListService.removeItem(index);
        this.loadItems();
    }

    onSubmit (form:NgForm) {
        const name = form.value.ingredientName;
        const amount = form.value.amount;
        this.shoppingListService.addItem(name, amount);
        this.loadItems();
        form.reset();
    }

    loadItems () {
        this.listItems = this.shoppingListService.getItems();
    }
}