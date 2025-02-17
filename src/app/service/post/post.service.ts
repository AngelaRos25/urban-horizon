import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface
import { AddPost, Post } from '../../modelli/interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private urlPost = 'https://gorest.co.in/public/v2/posts';
  private urlUser = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) { }

  // ottieni i post 
  getPostIndex(pageIndex: number, pageSize: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.urlPost}?page=${pageIndex}&per_page=${pageSize}`)
  }

  // ottieni un singolo post
  userPost(idUser: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.urlUser}/${idUser}/posts`)
  }

  // aggiungi post
  addPost(post: AddPost) {
    return this.http.post(`${this.urlUser}/${post.user_id}/posts`, post)
  }
}
