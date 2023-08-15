import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySignersComponent } from './notify-signers.component';

describe('NotifySignersComponent', () => {
  let component: NotifySignersComponent;
  let fixture: ComponentFixture<NotifySignersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifySignersComponent]
    });
    fixture = TestBed.createComponent(NotifySignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
