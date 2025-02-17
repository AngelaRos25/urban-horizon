import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

// interface
import { AddComment, Comment } from '../../modelli/interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private urlPost = 'https://gorest.co.in/public/v2/posts';

  constructor(private http: HttpClient) { }

  // ottieni commenti
  getComment(post_id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.urlPost}/${post_id}/comments`)
  }

  // aggiungi commenti
  addComment(comment: AddComment): Observable<AddComment>  {
    return this.http.post<AddComment>(`${this.urlPost}/${comment.post_id}/comments`, comment)
  }

}
