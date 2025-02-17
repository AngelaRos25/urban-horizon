import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentsComponent } from './comments.component';
import { CommentsService } from '../../service/comments/comments.service';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let commentServiceSpy: jasmine.SpyObj<CommentsService>

  beforeEach(async () => {
    commentServiceSpy = jasmine.createSpyObj('commentsService', ['getComment', 'addComment'])
    await TestBed.configureTestingModule({
      imports: [CommentsComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: CommentsService, useValue: commentServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserComment() on ngOnInit', () => {
    component.postId = 1;
    spyOn(component, 'getUserComment');
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.getUserComment).toHaveBeenCalled();
  })


  it('should call addFormComment', () => {
    component.postId = 1;
    localStorage.setItem('ApiData', JSON.stringify({id: 1, email: 'test@example.com', name: 'test'}))

    const form = {
      value: { body: 'new Comment'},
      reset: () => {},
    }as NgForm;

    spyOn(form, 'reset');

    commentServiceSpy.addComment.and.returnValue(of({post_id: 2, user_id:2, name: 'test', email:'test@example.it', body: 'new Comment'}))

    component.addFormComment(form);

    expect(commentServiceSpy.addComment).toHaveBeenCalled();
    expect(component.comments.length).toBe(1)
    expect(form.reset).toHaveBeenCalled();
  })
});
