import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private snackbar: MatSnackBar) {
  }

  public getProfiles(): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {

    })
  }

  // private handleResult<T>(result: PostgrestResponse<any>, resolve: any, reject: any) {
  //   if(result.error?.message) {
  //     this.snackbar.open(result.error.message, 'X', {
  //       duration: 5000,
  //       panelClass: "snackbar-error",
  //     });
  //     reject(result.error.message);
  //   } else {
  //     resolve(result.data as unknown as T);
  //   }
  // }
}
