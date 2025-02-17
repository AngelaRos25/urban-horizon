import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPostComponent } from './add-post.component';
import { NgForm, FormsModule } from '@angular/forms';
import { PostService } from '../../service/post/post.service';
import { of } from 'rxjs';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('postService', ['addPost']);

    await TestBed.configureTestingModule({
      imports: [AddPostComponent,HttpClientTestingModule, BrowserAnimationsModule, FormsModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    const form = {valid: false, value:{}}as NgForm;
    spyOn(console, 'error')

    component.AddFormPost(form)
    expect(console.error).toHaveBeenCalledWith('Form is invalid:', form.value)

  })

  it('should call AddPost when form is valid', ()=> {
    const form = {valid: true, value: {title: 'test title', body: 'test body', user_id: 0}}as NgForm;

    postServiceSpy.addPost.and.returnValue(of({success: true}))

    component.AddFormPost(form)
    expect(postServiceSpy.addPost).toHaveBeenCalledWith({
      title: 'test title',
      body: 'test body',
      user_id: 1
    })
  })
});
