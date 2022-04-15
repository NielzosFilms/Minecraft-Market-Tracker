import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MarketEntry} from "./market-entry-type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarketEntryService {
  constructor(private snackbar: MatSnackBar, private http: HttpClient) {
  }

  public getMarketEntries(): Promise<MarketEntry[]> {
    return new Promise<MarketEntry[]>(((resolve, reject) => {
      this.http.get<MarketEntry[]>(`https://${window.location.host}/.netlify/functions/get-market-entries`)
        .subscribe(result => resolve(result));
    }))
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  public sortByDate(entries: MarketEntry[]): MarketEntry[] {
    return entries.sort((a, b) =>
      this.getTime(new Date(a.transaction_date)) - this.getTime(new Date(b.transaction_date)))
  }
}
