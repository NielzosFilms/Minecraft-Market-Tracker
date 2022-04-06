import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MarketEntriesCreateDialogComponent} from "../market-entries-create-dialog/market-entries-create-dialog.component";
import {Item} from "../database-services/item-type";
import {ItemService} from "../database-services/item.service";
import {MarketEntryService} from "../database-services/market-entry.service";
import {MarketEntry} from "../database-services/market-entry-type";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-market-entries',
  templateUrl: './market-entries.component.html',
  styleUrls: ['./market-entries.component.scss']
})
export class MarketEntriesComponent implements AfterViewInit{
  private loading: string[] = [];
  private items: Item[] = [];

  public entriesDataSource: MatTableDataSource<MarketEntry> = new MatTableDataSource<MarketEntry>();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private createDialogRef: MatDialogRef<MarketEntriesCreateDialogComponent> | null = null;

  constructor(private dialog: MatDialog,
              private itemService: ItemService,
              private marketEntryService: MarketEntryService) {
    this.loading.push("itemService");
    this.itemService.getItems()
      .then(result => {
        this.items = result;
        this.loading = this.loading.filter(l => l !== "itemService");
      });

    this.loadEntries();
  }

  ngAfterViewInit(): void {
    this.entriesDataSource.paginator = this.paginator;
  }

  private loadEntries() {
    this.loading.push("marketEntryService");
    this.marketEntryService.getMarketEntries()
      .then(result => {
        this.entriesDataSource.data = result;
        this.loading = this.loading.filter(l => l !== "marketEntryService");
      })
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.ctrlKey && event.key === " ") {
      this.openCreateDialog();
    }
  }

  public openCreateDialog(): void {
    if(this.createDialogRef) return;
    this.createDialogRef = this.dialog.open(MarketEntriesCreateDialogComponent, {
      width: '500px',
      data: {
        items: this.items,
      }
    });

    this.createDialogRef.afterClosed().subscribe(() => {
      this.createDialogRef = null;
      this.loadEntries();
    });
  }

  public isLoading(): boolean {
    return this.loading.length > 0;
  }

  public getPerDiamond(amount: number, price: number): number {
    return Math.round((amount / price) * 100) / 100;
  }

}
