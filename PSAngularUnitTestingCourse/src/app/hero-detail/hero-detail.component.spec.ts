import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("hero-detail", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 3 } } },
        },
        {
          provide: HeroService,
          useValue: jasmine.createSpyObj(["getHero", "updateHero"]),
        },
        { provide: Location, useValue: jasmine.createSpyObj(["back"]) },
      ],
      imports:[FormsModule]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService = TestBed.get(HeroService);
  });

  it("should have the correct name in h2", () => {
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "string", strength: 3 })
    );

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "STRING"
    );
  });
});
