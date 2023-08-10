import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDocumentComponent } from './send-document.component';

describe('SendDocumentComponent', () => {
  let component: SendDocumentComponent;
  let fixture: ComponentFixture<SendDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendDocumentComponent]
    });
    fixture = TestBed.createComponent(SendDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
