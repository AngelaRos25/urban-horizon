import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// material
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

// pipe
import { TruncatePipe } from "../../pipe/truncate.pipe";
import { FilterPipe } from "../../pipe/filter.pipe";

// service
import { UserService } from '../../service/user/user.service';

// componenti
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users-card',
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule, MatPaginatorModule, TruncatePipe, FormsModule, FilterPipe],
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.css']
})
export class UsersCardComponent implements OnInit {
  photofemale: string = "https://cdn-icons-png.flaticon.com/128/4140/4140047.png";
  photomale: string = "https://cdn-icons-png.flaticon.com/128/1999/1999625.png";

  users: any;
  searchName: string = '';
  searchValue: any;

  pageSize: number = 10;
  pageIndex: number = 1;
  pageEvent !: PageEvent;

  token: string = ''

  constructor(private userService: UserService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser()
  }

  // utenti
  getUser() {
    this.userService.getUserIndex(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.users = data;
    })
  }

  // button page user
  btnClick(get: any) {
    this.router.navigateByUrl('/homePage/userDetails/' + get)
  }

  // add user
  openDialog() {
    const openDialog =this.matDialog.open(AddUserComponent, { width: '450px' });
    openDialog.afterClosed().subscribe((result)=> {
      console.log(`Dialog result: ${result}` )
      this.getUser()
    })
  }

  // delete
  deleteUser(idUser: number) {
    this.userService.deleteUserById(idUser).subscribe({
      next: (result) => {
        console.log('users deleted', result)
        this.getUser()
      },
      error: (error) => {
        console.error('Error during request', error)
      }
    })
  }

  // paginator
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getUser()
  }
}
