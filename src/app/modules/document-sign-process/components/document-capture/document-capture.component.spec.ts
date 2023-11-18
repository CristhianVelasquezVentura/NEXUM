import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCaptureComponent } from './document-capture.component';

describe('ComponentCaptureComponent', () => {
  let component: ComponentCaptureComponent;
  let fixture: ComponentFixture<ComponentCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentCaptureComponent]
    });
    fixture = TestBed.createComponent(ComponentCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
