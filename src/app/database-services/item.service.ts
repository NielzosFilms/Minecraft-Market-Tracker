import {Injectable} from '@angular/core';
import {Category, Item} from "./item-type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private snackbar: MatSnackBar, private http: HttpClient) {
  }

  public getCategoriesWithItemsForSale(): Promise<Category[]> {
    return new Promise<Category[]>(async (resolve, reject) => {
      const items = await this.getItemsForSaleWithPrices();
      const categories: Category[] = [];
      items.forEach(item => {
        if (!item.category) return;
        const foundCategory = categories.find(cat => cat.name === item.category);
        if (foundCategory) {
          categories[categories.indexOf(foundCategory)].items.push(item);
          return;
        }
        categories.push({
          id: '',
          name: item.category,
          items: [],
        })
      });
      resolve(categories);
    });
  }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`https://${window.location.host}/.netlify/functions/get-items`);
  }

  public getItemsForSaleWithPrices(): Promise<Item[]> {
    return new Promise<Item[]>(async (resolve, reject) => {
      this.getItems().subscribe(items => {
        resolve(items.filter(item => item.for_sale));
      })
    })
  }
}
