import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from '../comments/comments.component';
import { PostComponent } from './post.component';
import { Post } from '../../modelli/interface';
import { By } from '@angular/platform-browser';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent, CommentsComponent, CommonModule],
      providers: [provideHttpClient(), provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive @input() post and UserEmail', () =>{
    const mockPosts:Post = {id:1, user_id:1, title: 'post 1', body: 'post body 1'}
    
    component.post = mockPosts;
    component.UserEmail = 'test@mail.com';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(titleElement.textContent).toContain('post 1');

    const emailElement = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    expect(emailElement.textContent).toContain('test@mail.com');

    const bodyElement = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;
    expect(bodyElement.textContent).toContain('post body 1')
  })

  it('should render commentsComponent', ()=> {
    const mockPosts:Post = {id:1, user_id:1, title: 'post 1', body: 'post body 1'}
    component.post = mockPosts;
    fixture.detectChanges();

    const commentsComponent = fixture.debugElement.query(By.directive(CommentsComponent));
    expect(commentsComponent).toBeTruthy();
    expect(commentsComponent.componentInstance.postId).toBe(1)
  })
});
