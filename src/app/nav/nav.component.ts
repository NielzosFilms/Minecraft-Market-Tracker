import { Component } from '@angular/core';

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

  constructor() {
  }
}
