import { Injectable } from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {PostgrestResponse, SupabaseClient} from "@supabase/supabase-js";
import {Category, Item, ItemForSale} from "./item-type";
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
        .then(result => this.handleResult<Category[]>(result, resolve, reject));
    })
  }

  public getCategoriesWithItemsForSale(): Promise<Category[]> {
    return new Promise<Category[]>(async (resolve, reject) => {
      const categories = await this.getCategories();
      const items = await this.getItemsForSale();
      resolve(categories.map(category => {
        return {
          ...category,
          items: items.filter(item => item.category === category.id),
        }
      }))
    })
  }

  public getItems(): Promise<Item[]> {
    return new Promise<Item[]>(async (resolve, reject) => {
      this.supabase
        .from('item')
        .select('*')
        .then(result => this.handleResult<Item[]>(result, resolve, reject));
    })
  }

  public getItemsForSale(): Promise<ItemForSale[]> {
    return new Promise<ItemForSale[]>(async (resolve, reject) => {
      this.supabase
        .from('item')
        .select('*')
        .is('for_sale', true)
        .then(result => this.handleResult<ItemForSale[]>(result, resolve, reject));
    })
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
