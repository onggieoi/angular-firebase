import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFieldComponent } from './area-field.component';

describe('AreaFieldComponent', () => {
  let component: AreaFieldComponent;
  let fixture: ComponentFixture<AreaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
