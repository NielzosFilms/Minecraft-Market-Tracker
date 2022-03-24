import { Component } from '@angular/core';
import {ItemService} from "../database-services/item.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private itemService: ItemService) {
    itemService.getCategories().then(result => {
      console.log(result);
    });

    itemService.getItems().then(result => {
      console.log(result);
    }).catch((error) => {
      console.log("ERROR CATCHED", error);
    });
  }

}
