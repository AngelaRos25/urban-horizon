import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../../service/user/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spyRouter: jasmine.SpyObj<Router>
  let userServiceSpy: jasmine.SpyObj<UserService>

  beforeEach(async () => {

    spyRouter = jasmine.createSpyObj('Router', ['navigate'])
    userServiceSpy = jasmine.createSpyObj('UserService', ['loginUSer', 'saveRoken'])

    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
      providers: [provideHttpClient(),
        { provide: UserService, useValue: userServiceSpy },
      { provide: Router, useValue: spyRouter },]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
