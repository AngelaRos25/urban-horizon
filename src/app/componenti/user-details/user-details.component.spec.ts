import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../../service/user/user.service';
import { PostService } from '../../service/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HomepageComponent } from '../homepage/homepage.component';
import { UsersCardComponent } from '../users-card/users-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>
  let postServiceSpy: jasmine.SpyObj<PostService>
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('userService', ['getUserId']);
    postServiceSpy = jasmine.createSpyObj('postService', ['userPost']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    const activatedRouteStub = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: 'homePage', component: HomepageComponent, children: [
            { path: "usersCard", component: UsersCardComponent },
          ]}
      ])],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: PostService, useValue: postServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        provideAnimations()
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to initialize get a user on ngOnInit', () => {
    spyOn(component, 'getAUser');
    component.ngOnInit();
    expect(component.getAUser).toHaveBeenCalled()
  })

  it('should call getAUSer', () => {
    let idUser = 1;
    spyOn(component, 'getAUser');
    component.getAUser(idUser);
    expect(component.getAUser).toHaveBeenCalledWith(idUser)
  })

  it('should call getUserPost', () => {
    const mockPosts = [{id:1, user_id:1, title: 'post 1', body: 'post body 1'}]
    postServiceSpy.userPost.and.returnValue(of(mockPosts));

    component.getUserPost(1)
    fixture.detectChanges();

    expect(component.post).toEqual(mockPosts);
    expect(component.noPost).toBe('')
  })

  it('should be able to return in home page', () => {
    const button = fixture.debugElement.query(By.css('.undo-button'));
    expect(button).toBeTruthy();
    button.triggerEventHandler('click', null);

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/homePage/usersCard');
  })

});
