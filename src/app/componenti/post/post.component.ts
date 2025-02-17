import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MatCardModule } from '@angular/material/card';

// componenti
import { CommentsComponent } from "../comments/comments.component";
import { Post } from '../../modelli/interface';

@Component({
  selector: 'app-post',
  imports: [MatCardModule, CommonModule, CommentsComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Input() UserEmail!: string;
  IDPost!: number;

  constructor() { }
  ngOnInit(): void { }

}
