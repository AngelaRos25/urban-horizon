import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './add-user.component';
import { NgForm, FormsModule} from '@angular/forms';
import { UserService } from '../../service/user/user.service';
import { of } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['AddUser'])


    await TestBed.configureTestingModule({
      imports: [AddUserComponent, HttpClientTestingModule, BrowserAnimationsModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AddUser when form is valid', () => {
    const form = {valid: true, value:{name: 'test', email:'test@example.com', gender:'male', status: 'active'}}as NgForm;

    userServiceSpy.AddUser.and.returnValue(of({ success: true}))
   
    component.AddFormUser(form)
    
    expect(userServiceSpy.AddUser).toHaveBeenCalledWith({
      name: 'test', 
      email:'test@example.com', 
      gender:'male', 
      status:'active'
    })

  })
});
