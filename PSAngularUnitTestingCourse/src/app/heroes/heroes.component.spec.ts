import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("heroes component", () => {
  let heroesComponent: HeroesComponent;
  let heroes: Hero[];
  let mockHeroService;

  beforeEach(() => {
    heroes = [
      { id: 1, name: "string", strength: 1 },
      { id: 2, name: "string", strength: 2 },
      { id: 3, name: "string", strength: 3 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    heroesComponent = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the give hero from heroes list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      heroesComponent.heroes = heroes;

      heroesComponent.delete(heroes[2]);

      expect(heroesComponent.heroes.length).toBe(2);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    });
  });
});
