import { Injectable } from '@angular/core';
import {PostgrestResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseService} from "../supabase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Profile} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private supabase: SupabaseClient;

  constructor(private _supabase: SupabaseService, private snackbar: MatSnackBar) {
    this.supabase = _supabase.getClient();
  }

  public getProfiles(): Promise<Profile[]> {
    return new Promise<Profile[]>(async (resolve, reject) => {
      this.supabase
        .from('profiles')
        .select('*')
        .then(result => this.handleResult<Profile[]>(result, resolve, reject));
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
