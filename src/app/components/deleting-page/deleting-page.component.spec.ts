import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletingPageComponent } from './deleting-page.component';

describe('DeletingPageComponent', () => {
  let component: DeletingPageComponent;
  let fixture: ComponentFixture<DeletingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
