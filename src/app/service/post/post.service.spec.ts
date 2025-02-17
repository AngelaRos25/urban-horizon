import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { AddPost } from '../../modelli/interface';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;
  let urlPost = 'https://gorest.co.in/public/v2/posts';
  let urlUser = 'https://gorest.co.in/public/v2/users'; 

  let mockPost: AddPost = {
    user_id: 0,
    title: 'Test title',
    body: 'Test body',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to get post by index', () => {
    const pageIndex = 1;
    const pageSize = 10;

    service.getPostIndex(pageIndex, pageSize).subscribe();

    const req = httpTestingController.expectOne(`${urlPost}?page=${pageIndex}&per_page=${pageSize}`);
    expect(req.request.method).toEqual('GET');
    req.flush({})
  })

  it('should make GET request to get post by id', ()=> {
    const idUser = 1; 
    service.userPost(idUser).subscribe();

    const req = httpTestingController.expectOne(`${urlUser}/${idUser}/posts`);
    expect(req.request.method).toEqual('GET');

    req.flush({})
  })

  it('shoud make POST request to add a post', () => {
    service.addPost(mockPost).subscribe();

    const req = httpTestingController.expectOne(`${urlUser}/${mockPost.user_id}/posts`);
    expect(req.request.method).toEqual('POST');

    req.flush({})
  })
});
