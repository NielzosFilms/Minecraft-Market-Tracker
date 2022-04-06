import { Injectable } from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {PostgrestResponse, SupabaseClient} from "@supabase/supabase-js";
import {Category, Item, Price} from "./item-type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private supabase: SupabaseClient;

  constructor(private _supabase: SupabaseService, private snackbar: MatSnackBar) {
    this.supabase = _supabase.getClient();
  }

  public getCategories(): Promise<Category[]> {
    return new Promise<Category[]>(async (resolve, reject) => {
      this.supabase
        .from('category')
        .select('*')
        .order('name', {ascending: true})
        .then(result => this.handleResult<Category[]>(result, resolve, reject));
    })
  }

  public getCategoriesWithItemsForSale(): Promise<Category[]> {
    return new Promise<Category[]>(async (resolve, reject) => {
      const categories = await this.getCategories();
      const items = await this.getItemsForSaleWithPrices();
      resolve(categories.map(category => {
        return {
          ...category,
          items: items.filter(item => item.category_id === category.id),
        }
      }));
    })
  }

  public getItems(): Promise<Item[]> {
    return new Promise<Item[]>(async (resolve, reject) => {
      this.supabase
        .from('item')
        .select('*')
        .order('name', {ascending: true})
        .then(result => this.handleResult<Item[]>(result, resolve, reject));
    })
  }

  public getItemsForSaleWithPrices(): Promise<Item[]> {
    return new Promise<Item[]>(async (resolve, reject) => {
      const prices = await this.getPrices();
      const itemsForSale = await this.getItemsForSale();
      resolve(itemsForSale.map(item => {
        return {
          ...item,
          price: prices.find(price => price.item_id === item.id),
        }
      }));
    });
  }

  public getItemsForSale(): Promise<Item[]> {
    return new Promise<Item[]>(async (resolve, reject) => {
      this.supabase
        .from('item')
        .select('*')
        .is('for_sale', true)
        .order('name', {ascending: true})
        .then(result => this.handleResult<Item[]>(result, resolve, reject));
    });
  }

  public getPrices(): Promise<Price[]> {
    return new Promise<Price[]>(async (resolve, reject) => {
      this.supabase
        .from('prices')
        .select('*')
        .then(result => this.handleResult<Price[]>(result, resolve, reject));
    });
  }

  private handleResult<T>(result: PostgrestResponse<any>, resolve: any, reject: any) {
    if(result.error?.message) {
      this.snackbar.open(result.error.message, 'X', {
        duration: 5000,
        panelClass: "snackbar-error",
      });
      reject(result.error.message);
    } else {
      resolve(result.data as unknown as T);
    }
  }
}
