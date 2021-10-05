import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CheckountsService } from 'src/app/core/services/checkounts.service';

@Component({
  selector: 'app-check-ounts',
  templateUrl: './check-ounts.page.html',
  styleUrls: ['./check-ounts.page.scss'],
})
export class CheckOuntsPage implements OnInit {
  
  constructor(
    public checkOunts: CheckountsService,
    private auth: AuthService
  ) { 
  
  }

  ngOnInit() {
  }


}
