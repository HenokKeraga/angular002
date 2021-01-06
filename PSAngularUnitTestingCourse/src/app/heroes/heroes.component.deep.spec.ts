import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";
@Directive({
  selector: "[routerLink]",
  host: { '(click)': "onClick()" },
})
class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  naviagtedList: any = null;

  onClick() {
    this.naviagtedList = this.linkParams;
  }
}

describe("deep test", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes;

  beforeEach(() => {
    heroes = [
      { id: 1, name: "string", strength: 1 },
      { id: 2, name: "string", strength: 2 },
      { id: 3, name: "string", strength: 3 },
    ];
 
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: HeroService,
          useValue: jasmine.createSpyObj([
            "getHeroes",
            "addHero",
            "deleteHero",
          ]),
        },
      ],
    });

    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService =TestBed.get(HeroService)
  });

  it("should display Hero Component", () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();

    console.log(fixture.debugElement.queryAll(By.directive(HeroComponent)));

    expect(
      fixture.debugElement.queryAll(By.directive(HeroComponent)).length
    ).toEqual(3);

    for (let i = 0; i < heroes.length; i++) {
      expect(
        fixture.debugElement.queryAll(By.directive(HeroComponent))[i]
          .componentInstance.hero
      ).toEqual(heroes[i]);
    }
  });
  it("should call heroService.deleteHero when delete method is called", () => {
    spyOn(fixture.componentInstance, "delete");

    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    let heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    heroComponents[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
  });

  it("shuld add new hero to the list of hero when we press addhero button", () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    mockHeroService.addHero.and.returnValue(of({
      id: 4,
      name: "name",
      strength: 4
    }));

   

    fixture.debugElement.query(By.css('input')).nativeElement.value="name"

    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click',null)
    fixture.detectChanges()


    expect(fixture.debugElement.query(By.css('ul')).nativeElement.textContent).toContain('name')
    expect(fixture.componentInstance.heroes.length).toEqual(4)
     

  });

  it('should have a correct route of the first Hero',()=>{

      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();

    const heroComponents=fixture.debugElement.queryAll(By.directive(HeroComponent))

    const routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click',null)
    

    expect(routerLink.naviagtedList).toBe("/detail/1");

  })
});
