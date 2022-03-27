import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WhatWeSellComponent} from "./what-we-sell/what-we-sell.component";
import {TeamComponent} from "./team/team.component";
import {MarketEntriesComponent} from "./market-entries/market-entries.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: DashboardComponent},
  {path: 'items', component: WhatWeSellComponent},
  {path: 'team', component: TeamComponent},
  {path: 'market-entries', component: MarketEntriesComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
