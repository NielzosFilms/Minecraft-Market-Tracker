import {Component} from '@angular/core';
import {MarketEntryService} from "../database-services/market-entry.service";
import {Item} from "../database-services/item-type";
import {HttpClient} from "@angular/common/http";
import {ItemService} from "../database-services/item.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  saleData: GraphEntry[] = [];
  items: ItemWithLineGraph[] = [];

  constructor(private http: HttpClient, private marketService: MarketEntryService, private itemService: ItemService) {
    this.getSalesData();

    this.getItemData();
  }

  private getSalesData() {
    this.marketService.getMarketEntries().then(result => {
      const reduced = result.reduce((prev, cur) => {
        if (cur.was_purchase) {
          return {
            ...prev,
            spent: prev.spent = prev.spent + cur.amount_of_diamonds
          };
        } else {
          return {
            ...prev,
            earned: prev.earned = prev.earned + cur.amount_of_diamonds
          };
        }
      }, {earned: 0, spent: 0})
      this.saleData = [
        {name: "Diamonds earned", value: reduced.earned},
        {name: "Diamonds spent", value: reduced.spent},
      ]
    });
  }

  private async getItemData() {
    const items = await this.itemService.getItems();
    const marketEntries = this.marketService.sortByDate(await this.marketService.getMarketEntries());
    items.forEach(item => {
      const itemMarketEntries = marketEntries.filter(entry => entry.item_id === item.id);
      this.items.push({
        ...item,
        graphData: [{
          name: item.name,
          series: itemMarketEntries.map<GraphEntry>(entry => ({
            value: Math.round(entry.amount / entry.amount_of_diamonds * 100) / 100,
            name: new Date(entry.transaction_date).toDateString(),
          }))
        }]
      })
    });
  }

}

interface GraphEntry {
  value: number;
  name: string;
}

interface LineGraphEntry {
  name: string;
  series: GraphEntry[];
}

interface ItemWithLineGraph extends Item {
  graphData: LineGraphEntry[];
}
