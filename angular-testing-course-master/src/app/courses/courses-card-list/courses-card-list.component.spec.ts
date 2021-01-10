import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { COURSES } from "../../../../server/db-data";

import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

describe("cousrse-card-list", () => {
  let fixture: ComponentFixture<CoursesCardListComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoursesModule],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CoursesCardListComponent);
        });
    })
  );

  it("should create the component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should display the course list", () => {
    fixture.componentInstance.courses = Object.values(COURSES);

    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css(".course-card"));

    expect(de.length).toEqual(12);
  });

  it("shuold display the first course", () => {
    fixture.componentInstance.courses = Object.values(COURSES);

    fixture.detectChanges();

    let card = fixture.debugElement.query(By.css(".course-card:first-child"));

    expect(
      card.query(By.css(".mat-card-title")).nativeElement.textContent
    ).toBe(COURSES[1].titles.description);
    expect(card.query(By.css("img")).nativeElement.src).toBe(
      COURSES[1].iconUrl
    );

    "img";
  });
});
