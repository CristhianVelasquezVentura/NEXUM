import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNexumComponent } from './header-nexum.component';

describe('HeaderNexumComponent', () => {
  let component: HeaderNexumComponent;
  let fixture: ComponentFixture<HeaderNexumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNexumComponent]
    });
    fixture = TestBed.createComponent(HeaderNexumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
