import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// service
import { UserService } from '../../service/user/user.service';
import { PostService } from '../../service/post/post.service';

// pipe
import { TruncatePipe } from "../../pipe/truncate.pipe";

// material
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// component
import { PostComponent } from "../post/post.component";
import { Post } from '../../modelli/interface';


@Component({
  selector: 'app-user-details',
  imports: [CommonModule, MatIconModule, MatCardModule, TruncatePipe, PostComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  photofemale: string = "https://cdn-icons-png.flaticon.com/128/4140/4140047.png";
  photomale: string = "https://cdn-icons-png.flaticon.com/128/1999/1999625.png";

  users: any;
  paramValue!: 0;
  post: any;
  noPost!: string;

  constructor(private userService: UserService,private postService: PostService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void { 
    this.route.params.subscribe(params =>{
      this.paramValue = params['id']
      this.getAUser(this.paramValue)
    })
  }

  // recupera i dati dell'utente
  getAUser(idUser:number) {
    this.userService.getUserId(idUser).subscribe(data =>{
      this.users = data;
      console.log('Dati Utente',this.users)
      this.getUserPost(idUser)
    })
  }

    // post in base all'id utente
    getUserPost(idUser: number){
      this.postService.userPost(idUser).subscribe({
        next: (data: Post[]) =>{
          if(data && data.length > 0){
            this.post = data;
            console.log('Post Utente',this.post)
            this.noPost = '';
          }else {
            this.post = null;
            this.noPost = 'There are no posts yet';
          }
        },
        error: (err: any) => {
          console.error('errore nel recuper dei dati',err)
        }
      })
    }

    // button return
    undo(){
      this.router.navigateByUrl('/homePage/usersCard')
    }

}
