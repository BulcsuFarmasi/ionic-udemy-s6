import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


import { Ingredient } from '../models/ingredient';

import { AuthService } from "./auth";

@Injectable()
export class ShoppingListService {
    private ingredients:Ingredient[] = [];

    constructor (private http:Http, private authService:AuthService) {}

    addItem (name:string, amount:number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    addItems (items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    fetchList (token:string) {
        const userId = this.authService.getActiveUser().uid
        const listObservable = this.http.get(`https://ionic-recipe-book-15ab7.firebaseio.com/${userId}/shopping-list.json?auth=${token}`)
        return listObservable;
    }

    getItems() {
        return this.ingredients.slice();
    }

    removeItem (index:number) {
        this.ingredients.splice(index, 1)
    }

    storeList (token:string) {
        const userId = this.authService.getActiveUser().uid
        return this.http
            .put(`https://ionic-recipe-book-15ab7.firebaseio.com/${userId}/shopping-list.json?auth=${token}`,
                this.ingredients)
    }
}