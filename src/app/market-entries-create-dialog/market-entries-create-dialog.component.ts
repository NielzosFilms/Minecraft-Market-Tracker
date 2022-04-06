import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarketEntryInput} from "../database-services/market-entry-type";
import {FormItemValidator, Item} from "../database-services/item-type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {map, Observable, startWith} from "rxjs";
import { v4 as uuid } from 'uuid';
import {AuthService} from "../auth.service";
import {MarketEntryService} from "../database-services/market-entry.service";

@Component({
  selector: 'app-market-create-dialog',
  templateUrl: './market-entries-create-dialog.component.html',
  styleUrls: ['./market-entries-create-dialog.component.scss']
})
export class MarketEntriesCreateDialogComponent {
  public loading = false;
  public entryForm: FormGroup;
  private readonly items: Item[];
  public filteredItems: Observable<Item[]>;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private marketEntryService: MarketEntryService,
              @Inject(MAT_DIALOG_DATA) private data: MarketEntriesCreateDialogData,
              private dialogRef: MatDialogRef<MarketEntriesCreateDialogComponent>) {
    this.items = this.data.items;
    this.entryForm = this.fb.group({
      selectedItem: [null, [Validators.required, FormItemValidator.selectedValidValue(this.items)]],
      amount_of_diamonds: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      amount: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      transactionDate: [null, [Validators.required]],
      isBulk: [null, [Validators.required]],
      isPurchase: [null, [Validators.required]],
    });

    this.entryForm.setValue({
      selectedItem: null,
      amount_of_diamonds: 0,
      amount: 0,
      transactionDate: new Date(),
      isBulk: false,
      isPurchase: false,
    });

    this.filteredItems = this.entryForm.controls["selectedItem"].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.items.slice())),
    );
  }

  public handleSubmit(entryForm: FormGroup) {
    if(!entryForm.valid) return;
    if(entryForm.value.amount_of_diamonds <= 0) return;
    if(entryForm.value.amount <= 0) return;
    const marketEntry: MarketEntryInput = {
      id: uuid().toString(),
      item_id: entryForm.value.selectedItem.id,
      amount_of_diamonds: entryForm.value.amount_of_diamonds,
      amount: entryForm.value.amount,
      transaction_date: entryForm.value.transactionDate,
      bulk: entryForm.value.bulk || false,
      was_purchase: entryForm.value.was_purchase || false,
      created_by: this.auth.profile.id,
    }
    this.loading = true;
    this.marketEntryService.createMarketEntry(marketEntry).then(r => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

  public displayItem(item: Item): string {
    return item?.name || "";
  }

  private _filter(name: string): Item[] {
    const filterValue = name.toLowerCase();
    return this.items.filter(item => item.name.toLowerCase().includes(filterValue));
  }
}

export interface MarketEntriesCreateDialogData {
  items: Item[];
}
