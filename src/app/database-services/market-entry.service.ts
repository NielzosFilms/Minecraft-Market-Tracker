import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MarketEntry, MarketEntryInput} from "./market-entry-type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarketEntryService {
  constructor(private snackbar: MatSnackBar, private http: HttpClient) {
  }

  public getMarketEntries(): Observable<MarketEntry[]> {
    return this.http.get<MarketEntry[]>(`https://${window.location.host}/.netlify/functions/get-market-entries`);
    // return new Promise<MarketEntry[]>(async (resolve, reject) => {
      // this.supabase
      //   .from('market_entry')
      //   .select(`
      //     *,
      //     item:item_id (
      //       *
      //     )
      //   `)
      //   .order('transaction_date', {ascending: false})
      //   .then(result => this.handleResult<MarketEntry[]>(result, resolve, reject));
    // });
  }

  public getMarketEntriesASC(): Promise<MarketEntry[]> {
    return new Promise<MarketEntry[]>(async (resolve, reject) => {
      // this.supabase
      //   .from('market_entry')
      //   .select(`
      //     *,
      //     item:item_id (
      //       *
      //     )
      //   `)
      //   .order('transaction_date', {ascending: true})
      //   .then(result => this.handleResult<MarketEntry[]>(result, resolve, reject));
    });
  }

  public createMarketEntry(entry: MarketEntryInput) {
    return new Promise<MarketEntryInput>(async (resolve, reject) => {
      // this.supabase
      //   .from('market_entry')
      //   .insert(entry)
      //   .then(result => this.handleResult<MarketEntryInput>(result, resolve, reject));
    });
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
