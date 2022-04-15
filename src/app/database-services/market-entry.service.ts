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

  public getMarketEntries(): Observable<MarketEntry[]> {
    return this.http.get<MarketEntry[]>(`https://${window.location.host}/.netlify/functions/get-market-entries`);
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  public sortByDate(entries: MarketEntry[]): MarketEntry[] {
    return entries.sort((a, b) =>
      this.getTime(a.transaction_date) - this.getTime(b.transaction_date))
  }
}
