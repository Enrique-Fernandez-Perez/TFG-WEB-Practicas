import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharcterComponent } from './add-charcter.component';

describe('AddCharcterComponent', () => {
  let component: AddCharcterComponent;
  let fixture: ComponentFixture<AddCharcterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCharcterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCharcterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
