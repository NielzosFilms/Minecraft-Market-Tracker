import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../login/login-dialog.component";

interface Route {
  route: string,
  label: string,
  active: boolean,
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public publicRoutes: Route[] = [
    {route: '/', label: 'Dashboard', active: false},
    {route: '/items', label: 'What we sell', active: false},
    {route: '/team', label: 'Team', active: false}
  ];

  public authRoutes: Route[] = [
    {route: '/market-entries', label: 'Market Entries', active: false},
  ];

  constructor(public auth: AuthService, private snackbar: MatSnackBar, private dialog: MatDialog) {
  }

  public login() {
    this.dialog.open(LoginDialogComponent, {
      width: '400px',
    })
  }

  public logout() {
    this.auth.signOut().catch((error) => {
      this.snackbar.open(error.error.message, 'X', {
        duration: 5000,
        panelClass: "snackbar-error",
      });
    });
  }

}
