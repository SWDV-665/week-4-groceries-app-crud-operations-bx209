import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Component, OnInit, Input } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page]
})

export class Tab1PageModule{
  @Input() name: string;
  title = "Grocery";

  items = [
    {
      name: "Soup",
      quantity: 2    
    },
    {
      name: "Cabbage",
      quantity: 1    
    },
    {
      name: "Steak",
      quantity: 3    
    },
    {
      name: "Potatoes",
      quantity: 1    
    },
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async removeItem(item: any, index: string | number): Promise<void> {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    (await toast).present();
  
    const newLocal = this.items.splice(1);
  }
  
  async editItem(item: any, index: string) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    (await toast).present();
    this.showAddItemPrompt();
  }  

  addItem(): void {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const prompt = this.alertCtrl.create({

      message: "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items.push(item);
          }
        }
      ]
    });
    (await prompt).present();
  }

}