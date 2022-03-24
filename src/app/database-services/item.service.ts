import { Injectable } from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {PostgrestResponse, SupabaseClient} from "@supabase/supabase-js";
import {Category, Item} from "./item-type";
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

  public getItems(): Promise<Item[]> {
    return new Promise<Item[]>(async (resolve, reject) => {
      this.supabase
        .from('item')
        .select('*')
        .then(result => this.handleResult<Item[]>(result, resolve, reject));
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
