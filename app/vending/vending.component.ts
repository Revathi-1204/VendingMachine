import { Component, OnInit } from '@angular/core';
import { Section } from '../section';

@Component({
  selector: 'app-vending',
  templateUrl: './vending.component.html',
  styleUrls: ['./vending.component.css']
})
export class VendingComponent{
  selectedSection: Section | null | undefined;
  selectedProductId: number;
  bill: number = 0;
  message:string="";
  sections: Section[] = [
    {
      id: 1,
      products: [
        { id: 1, name: 'Lays(Tomato)', price: 20, quantity: 5, selectedQuantity: 0 },
        { id: 2, name: 'Cadbaury Cake', price: 30, quantity: 3, selectedQuantity: 0 },
      ]
    },
    {
      id: 2,
      products: [
        { id: 3, name: 'Dairy Milk', price: 10, quantity: 2, selectedQuantity: 0 },
        { id: 4, name: 'Kitkat', price: 40, quantity: 4, selectedQuantity: 0 },
      ]
    },
  ];
 
  openDoor(){
    this.message="";
    this.bill=0;
    if (this.selectedProductId != null) {
      for (const section of this.sections) {
        const product = section.products.find(product => product.id == this.selectedProductId);
        if (product) {
          this.selectedSection = section;
          this.message="";
          return;
        }
      }
    }
    this.message="Error: Cannot find Product with that id!!";
  }

  closeDoor() {
    this.bill=0;
    this.message="";
    if (this.selectedSection) {
      this.selectedSection.products.forEach(product => {
        if(product.quantity >= product.selectedQuantity){
          product.quantity -= product.selectedQuantity;
          this.bill += product.selectedQuantity * product.price;
          product.selectedQuantity = 0;
        }
        else{
          this.message = "Quantity Entered is Incorrect!!"
        }
        
      });
      this.selectedSection = null;
    }
  }
}
