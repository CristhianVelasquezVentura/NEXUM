import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDocumentSignComponent } from './header-document-sign.component';

describe('HeaderDocumentSignComponent', () => {
  let component: HeaderDocumentSignComponent;
  let fixture: ComponentFixture<HeaderDocumentSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDocumentSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDocumentSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
