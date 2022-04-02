import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";

import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import { LoginDialogComponent } from './login/login-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DashboardComponent } from './dashboard/dashboard.component';
import { WhatWeSellComponent } from './what-we-sell/what-we-sell.component';
import {MatTableModule} from "@angular/material/table";
import { TeamComponent } from './team/team.component';
import { MarketEntriesComponent } from './market-entries/market-entries.component';
import { MarketEntriesCreateDialogComponent } from './market-entries-create-dialog/market-entries-create-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    NavComponent,
    PageNotFoundComponent,
    DashboardComponent,
    WhatWeSellComponent,
    TeamComponent,
    MarketEntriesComponent,
    MarketEntriesCreateDialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatButtonModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatAutocompleteModule,
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
