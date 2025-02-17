import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';


// material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// service
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-homepage',
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterOutlet, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  logoPath = '../../../assets/image/logo.png';
  

  constructor(private userService: UserService) { }

  logout() {
    this.userService.logout();
    console.log('logout')
  }
}
