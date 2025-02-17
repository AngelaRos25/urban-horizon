
import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient, HttpClient, withInterceptors} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { tokenInterceptor } from './token.interceptor';


describe('tokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const urlUser = 'https://gorest.co.in/public/v2/users';
  const urlPost = 'https://gorest.co.in/public/v2/posts';
  let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlvIFJvc3NpIiwiaWF0IjoxNzEyMzQ1Njc4fQ.fake-signature';


  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => tokenInterceptor(req, next));

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'user') {
        return JSON.stringify({
          name: 'mario rossi',
          email: 'mario.rossi@lola.it',
          token: mockToken, // Ensure the token is returned
          id: 0
        });
      }
      return null;
    });
    

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptors([tokenInterceptor])),
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(tokenInterceptor).toBeTruthy();
  })

  it('should add Authorization header', () => {

    console.log('Effettuando la richiesta GET con token...');

    httpClient.get('https://gorest.co.in/public/v2/users?page=1&per_page=10').subscribe();
    httpClient.get(`${urlUser}/1`).subscribe();
    httpClient.get(`${urlUser}/1/posts`).subscribe();
    httpClient.get(`${urlPost}/1/comments`).subscribe();


 
    const allRequests = httpTestingController.match(req => req.url.includes('gorest.co.in'));
    console.log('📡 Tutte le richieste intercettate:', allRequests.map((req) => req.request.url))


    allRequests.forEach((req) => {
      console.log(`Verificando richiesta: ${req.request.url}`);
      expect(req.request.headers.has('Authorization')).toBeTrue();
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`)
      req.flush({})
    })


  });


});
