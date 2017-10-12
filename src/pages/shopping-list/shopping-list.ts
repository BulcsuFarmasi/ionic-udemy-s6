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
    public amount:number
    public ingredientName:string;
    public index:number;
    public mode:string = 'Add';


    constructor (private shoppingListService:ShoppingListService){}
    
    ionViewWillEnter () {
        this.loadItems();
    }

    onEditItem (index: number) {
        this.index = index;
        this.ingredientName = this.listItems[index].name;
        this.amount = this.listItems[index].amount;
        this.mode = 'Edit'
    }

    onRemoveItem (index:number) {
        this.shoppingListService.removeItem(index);
        this.loadItems();
    }

    onSubmit (form:NgForm) {
        if (this.mode === 'Add') {
            this.shoppingListService.addItem(this.ingredientName, this.amount)
        } else {
            this.shoppingListService.editItem(this.index, this.ingredientName, this.amount);
            this.mode = 'Add';
        };
        this.loadItems();
        form.reset();
    }

    loadItems () {
        this.listItems = this.shoppingListService.getItems();
    }
}