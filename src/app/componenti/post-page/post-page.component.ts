import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// material 
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

// interface
import { Post } from '../../modelli/interface';

// service
import { PostService } from '../../service/post/post.service';

// component
import { PostComponent } from "../post/post.component";
import { AddPostComponent } from '../add-post/add-post.component';

// pipe
import { FilterPipe } from "../../pipe/filter.pipe";

@Component({
  selector: 'app-post-page',
  imports: [MatIconModule, PostComponent, CommonModule, MatPaginatorModule, FormsModule, FilterPipe],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  pageSize: number = 10;
  pageIndex: number = 1;
  pageEvent !: PageEvent;

  searchValue: any;
  AllPosts!: Post[];
  post: any;

  constructor(private postService: PostService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts()
  }

  // tutti i post
  getPosts() {
    this.postService.getPostIndex(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.AllPosts = data;
      console.log('Tutti i post:', this.AllPosts)
    })
  }

  // open to add post
  openDialogPost() {
    const openDialogPost = this.matDialog.open(AddPostComponent, { width: '450px' });
    openDialogPost.afterClosed().subscribe((result) => {
      console.log(`dialog result: ${result}`)
      this.getPosts()
    })
  }

  // paginator
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getPosts()
  }


}
