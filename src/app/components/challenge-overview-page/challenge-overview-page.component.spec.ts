import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeOverviewPageComponent } from './challenge-overview-page.component';

describe('ChallengeOverviewPageComponent', () => {
  let component: ChallengeOverviewPageComponent;
  let fixture: ComponentFixture<ChallengeOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeOverviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
