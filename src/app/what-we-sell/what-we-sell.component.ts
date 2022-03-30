import { Component } from '@angular/core';
import {ItemService} from "../database-services/item.service";
import {Category} from "../database-services/item-type";

@Component({
  selector: 'app-what-we-sell',
  templateUrl: './what-we-sell.component.html',
  styleUrls: ['./what-we-sell.component.scss']
})
export class WhatWeSellComponent {
  public loading = false;
  public categories: Category[] = [];
  public selectedCategory: Category[] = [];

  constructor(private itemService: ItemService) {
    this.loading = true;
    itemService.getCategoriesWithItemsForSale().then(result => {
      this.categories = result;
      console.log(this.categories);
      this.selectedCategory = [this.categories[0]];
      this.loading = false;
    });
  }

  public getNumberInStacks(number: number): number {
    return Math.round((number / 64) * 100) / 100;
  }
}
