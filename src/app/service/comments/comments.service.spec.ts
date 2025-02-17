import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { AddComment, Comment } from '../../modelli/interface';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
    });
    service = TestBed.inject(CommentsService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should create', () => {
    expect(service).toBeTruthy()
  })

  it('should make a GET request to get comments', () => {
    const mockComments: Comment[] = [
      {id: 1, post_id: 2, name: 'User 1', email: 'user1@test.com',
        body: 'comment body 1'},
      {id: 2, post_id: 2, name: 'User 2', email: 'user2@test.com',
        body: 'comment body 2'}
    ];
    service.getComment(2).subscribe((comments) => {
      expect(comments).toBeTruthy();
      expect(comments.length).toBeGreaterThan(0);
      expect(comments.length).toEqual(2);
      expect(comments[0].body).toEqual('comment body 1');
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/posts/2/comments');
    expect(req.request.method).toEqual("GET");
    req.flush(mockComments);
  })


  it('should make a POST request to add comment', () => {
    const mockAddComment: AddComment = { user_id: 1, post_id: 1, name: 'test Comment', email: 'comment@test.com', body: 'Comment Body' }
  
    const mockResponse = {
      id: 101,
      ...mockAddComment
    }

    service.addComment(mockAddComment).subscribe((response: AddComment) => {
      expect(response).toBeTruthy();
      expect(response.post_id).toEqual(1);
      expect(response.body).toEqual('Comment Body');
      expect(response.name).toEqual('test Comment');
    })

    const req = httpTestingController.expectOne(`https://gorest.co.in/public/v2/posts/1/comments`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockAddComment);
    req.flush(mockResponse);
  })
});
