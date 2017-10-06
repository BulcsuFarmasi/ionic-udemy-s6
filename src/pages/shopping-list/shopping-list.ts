import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
    
    constructor (private shoppingListService:ShoppingListService){}
    
    onAddItem (form:NgForm) {
        const name = form.value.ingredientName;
        const amount = form.value.amount;
        this.shoppingListService.addItem(name, amount);
        form.reset();
    }
}