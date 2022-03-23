import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService) {
  }

  public logout(): void {
    this.auth.signOut().catch((error) => {
      console.log(error);
    });
  }
}
