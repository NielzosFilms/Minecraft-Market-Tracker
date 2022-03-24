import { Component } from '@angular/core';
import {ProfileService} from "../database-services/profile.service";
import {Profile} from "../auth.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  public loading = false;
  public profiles: Profile[] = [];

  constructor(private profileService: ProfileService) {
    this.loading = true;
    profileService.getProfiles().then(profiles => {
      this.profiles = profiles;
      this.loading = false;
    });
  }
}
