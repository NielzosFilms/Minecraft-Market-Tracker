import { Component } from '@angular/core';
import {ProfileService} from "../database-services/profile.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  public loading = false;
  public profiles: string[] = [];

  constructor(private profileService: ProfileService) {
    this.loading = true;
    profileService.getProfiles().then(profiles => {
      this.profiles = profiles;
      this.loading = false;
    });
  }
}
