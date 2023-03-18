import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSignProcessComponent } from './document-sign-process.component';

describe('DocumentSignProcessComponent', () => {
  let component: DocumentSignProcessComponent;
  let fixture: ComponentFixture<DocumentSignProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentSignProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSignProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
