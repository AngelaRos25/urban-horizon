import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostPageComponent } from './post-page.component';
import { PageEvent } from '@angular/material/paginator';
import { PostService } from '../../service/post/post.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AddPostComponent } from '../add-post/add-post.component';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('postService', ['getPostIndex']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);


    await TestBed.configureTestingModule({
      imports: [PostPageComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pageIndex, pageSize and call getPosts', () => {
    const pageIndex = 1;
    const pageSize = 10;
    const pageEvent: PageEvent = { pageIndex, pageSize, length: 100 };

    const getPostSpy = spyOn(component, 'getPosts');
    component.handlePageEvent(pageEvent);

    expect(component.pageIndex).toBe(pageIndex);
    expect(component.pageSize).toBe(pageSize);
    expect(getPostSpy).toHaveBeenCalledWith()
  })

  it('should open the dialog when openDialog is called', () => {
    const dialogSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogSpy.open.and.returnValue(dialogSpyObj);
    dialogSpyObj.afterClosed.and.returnValue(of(true));

    component.openDialogPost();

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(AddPostComponent, { width: '450px' });
    expect(dialogSpyObj.afterClosed).toHaveBeenCalled();
  })
});
