import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingPageComponent } from './adding-page.component';

describe('AddingPageComponent', () => {
  let component: AddingPageComponent;
  let fixture: ComponentFixture<AddingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
