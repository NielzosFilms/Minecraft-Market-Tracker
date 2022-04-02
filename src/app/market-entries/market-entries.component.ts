import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MarketEntriesCreateDialogComponent} from "../market-entries-create-dialog/market-entries-create-dialog.component";
import {Item} from "../database-services/item-type";
import {ItemService} from "../database-services/item.service";
import {MarketEntryService} from "../database-services/market-entry.service";

@Component({
  selector: 'app-market-entries',
  templateUrl: './market-entries.component.html',
  styleUrls: ['./market-entries.component.scss']
})
export class MarketEntriesComponent {
  public loading = false;

  private items: Item[] = [];

  constructor(private dialog: MatDialog,
              private itemService: ItemService,
              private marketEntryService: MarketEntryService) {
    this.itemService.getItems()
      .then(result => {
        this.items = result;
      });

    this.marketEntryService.getMarketEntries()
      .then(result => {
        console.log(result);
      })
  }

  public openCreateDialog(): void {
    const dialogRef = this.dialog.open(MarketEntriesCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("closed");
    });
  }

}
