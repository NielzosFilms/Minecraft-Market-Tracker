import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarketEntry} from "../database-services/market-entry-type";

@Component({
  selector: 'app-market-create-dialog',
  templateUrl: './market-entries-create-dialog.component.html',
  styleUrls: ['./market-entries-create-dialog.component.scss']
})
export class MarketEntriesCreateDialogComponent {
  public entryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.entryForm = this.fb.group({
      selectedItem: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      transactionDate: [null, [Validators.required]],
      isBulk: [null, [Validators.required]],
      isPurchase: [null, [Validators.required]],
    });

    this.entryForm.setValue({
      selectedItem: null,
      price: '',
      transactionDate: new Date(),
      isBulk: false,
      isPurchase: false,
    })
  }

  handleSubmit(entryForm: any) {
    console.log(entryForm.value as MarketEntry);
  }

}
