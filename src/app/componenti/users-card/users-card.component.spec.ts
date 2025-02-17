import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersCardComponent } from './users-card.component';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';



describe('UsersCardComponent', () => {
  let component: UsersCardComponent;
  let fixture: ComponentFixture<UsersCardComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy : jasmine.SpyObj<Router>
  let userServiceSpy : jasmine.SpyObj<UserService>
  
  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    userServiceSpy = jasmine.createSpyObj('userService', ['deleteUserById'])

    await TestBed.configureTestingModule({
      imports: [UsersCardComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user on ngOnInit', () => {
    spyOn(component, 'getUser')

    component.ngOnInit()
    expect(component.users).toEqual(userServiceSpy.getUserIndex)
  })


  it('should update pageIndex, pageSize, and call getUser', () => {
    const pageIndex = 1;
    const pageSize = 10;
    const pageEvent: PageEvent = { pageIndex, pageSize, length: 100 };

    const getUserSpy = spyOn(component, 'getUser');

    component.handlePageEvent(pageEvent);

    expect(component.pageSize).toBe(pageSize);
    expect(component.pageIndex).toBe(pageIndex);
    expect(getUserSpy).toHaveBeenCalledWith()
  })

  it('should open the dialog when openDialog is called', () => {
    const dialogSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    dialogSpy.open.and.returnValue(dialogSpyObj);

    dialogSpyObj.afterClosed.and.returnValue(of(true));

    component.openDialog();

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(AddUserComponent, { width: '450px' });


    expect(dialogSpyObj.afterClosed).toHaveBeenCalled();
  })


  it('should be able to go to userDetails on click', () => {
    const userId = 123
    const expectedPath = '/homePage/userDetails/' + userId;
    component.btnClick(userId);

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(expectedPath)
  })
});
