import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AddUser, Login} from '../../modelli/interface';
import { Router } from '@angular/router';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>
  let urlUser = 'https://gorest.co.in/public/v2/users';

  let mockUser: AddUser = {
    name: 'Test User',
    email: 'test@test.com',
    gender: 'male',
    status: 'active',
  }

  let mockLogin: Login = {
    token: 'mocked-token',
    name: 'Test User',
    email: 'test@test.com',
    id: 1

  }

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add Authorization header when calling loginUSer', () => {
    service.loginUser(mockLogin).subscribe();

    const req = httpTestingController.expectOne(urlUser);
    expect(req.request.method).toEqual('GET');

    req.flush({})

  })

  it('should handle login error', () => {
    service.loginUser(mockLogin).subscribe({
      error: (error) => {
        expect(error.status).toBe(401);
      }
    })
    const req = httpTestingController.expectOne(urlUser);
    req.flush({}, {status: 401, statusText: 'Unauthorized'})
  })

  it('should make a GET request to get users by index', () => {
    const pageIndex = 1;
    const pageSize = 10;

    service.getUserIndex(pageIndex, pageSize).subscribe();

    const req = httpTestingController.expectOne(`${urlUser}?page=${pageIndex}&per_page=${pageSize}`);
    expect(req.request.method).toEqual('GET');
    req.flush({})
  })

  it('shoud make POST request to add a user', () => {
    service.AddUser(mockUser).subscribe();

    const req = httpTestingController.expectOne(urlUser);
    expect(req.request.method).toEqual('POST');

    req.flush({})
  })

  it('should make DELETE request to delete a user', () => {
    const idUser = 1;
    service.deleteUserById(idUser).subscribe();
    const req = httpTestingController.expectOne(`${urlUser}/${idUser}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({})
  })

  it('should make GET request to get user by id', () => {
    const idUser = 1;
    service.getUserId(idUser).subscribe();

    const req = httpTestingController.expectOne(`${urlUser}/${idUser}`);
    expect(req.request.method).toEqual('GET');

    req.flush({})
  })

  it('should call logout and remove token', () => {
    spyOn(localStorage, 'removeItem');

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('ApiData');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login'])
  })

  it('should call get token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ token: 'mocked-token' }));
    expect(service.getToken()).toBe('mocked-token');
  })
});
