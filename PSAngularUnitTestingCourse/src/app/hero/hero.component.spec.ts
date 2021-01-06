import { NO_ERRORS_SCHEMA } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { HeroComponent } from "./hero.component"

describe("hero component ",()=>{

    let fixture:ComponentFixture<HeroComponent>

    beforeEach(()=>{
      TestBed.configureTestingModule({
          declarations: [HeroComponent],
          schemas:[NO_ERRORS_SCHEMA]
      })

      fixture= TestBed.createComponent(HeroComponent)
    })
    
    it("should have a correct hero",()=>{
     
         fixture.componentInstance.hero = {
           id: 1,
           name: "string",
           strength: 1,
         };

         expect(fixture.componentInstance.hero.name).toEqual("string");
   
    })

    it('should have hero name in anchor tag ',()=>{

         fixture.componentInstance.hero = {
           id: 1,
           name: "string",
           strength: 1,
         };

         fixture.detectChanges()

         expect(
           fixture.debugElement.query(By.css("a")).nativeElement.textContent
         ).toContain("string");

        //  expect(fixture.nativeElement.querySelector('a').textContent).toContain(
        //    'string'
        //  );

    })

    

})