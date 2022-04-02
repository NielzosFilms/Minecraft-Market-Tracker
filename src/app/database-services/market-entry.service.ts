import {Injectable} from "@angular/core";
import {PostgrestResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseService} from "../supabase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MarketEntry, MarketEntryInput} from "./market-entry-type";

@Injectable({
  providedIn: 'root'
})
export class MarketEntryService {
  private supabase: SupabaseClient;

  constructor(private _supabase: SupabaseService, private snackbar: MatSnackBar) {
    this.supabase = _supabase.getClient();
  }

  public getMarketEntries(): Promise<MarketEntry[]> {
    return new Promise<MarketEntry[]>(async (resolve, reject) => {
      this.supabase
        .from('market_entry')
        .select('*')
        .then(result => this.handleResult<MarketEntry[]>(result, resolve, reject));
    });
  }

  public createMarketEntry(entry: MarketEntryInput) {
    return new Promise<MarketEntryInput>(async (resolve, reject) => {
      this.supabase
        .from('market_entry')
        .insert(entry)
        .then(result => this.handleResult<MarketEntryInput>(result, resolve, reject));
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
