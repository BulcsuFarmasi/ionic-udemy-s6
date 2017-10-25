import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, LoadingController, PopoverController} from 'ionic-angular';


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
                 private authService:AuthService,
                 private loadingController:LoadingController,
                 private alertController:AlertController){}
    
    ionViewWillEnter () {
        this.loadItems();
    }

    handleError (errorMessage:string) {
        const alert = this.alertController.create({
            title: 'An error occured!',
            message: errorMessage,
            buttons: ['Ok']
        })
        alert.present();
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
        const loading = this.loadingController.create({
            content: 'Please wait...'
        });
        const popover = this.popoverController.create(ShoppingListOptionsPage);
        popover.present({ev: event});
        popover.onDidDismiss((data) => {
            if (data.action == 'load') {
                loading.present();
                this.authService.getActiveUser().getToken()
                    .then((token) => {
                        this.shoppingListService.fetchList(token)
                            .subscribe(
                                (list:Ingredient[]) => {
                                    loading.dismiss();
                                    if (list) {
                                        this.listItems = list;
                                    } else {
                                        this.listItems = [];
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
                        this.shoppingListService.storeList(token)
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

    private loadItems () {
        this.listItems = this.shoppingListService.getItems();
    }
}