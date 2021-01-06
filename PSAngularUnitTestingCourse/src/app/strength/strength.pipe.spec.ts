import { stringify } from "@angular/core/src/util";
import { StrengthPipe } from "./strength.pipe";


describe("strenght pipe test ",()=>{
  


    it("sholud display weak if the vlaue is 5",()=>{
         let  strenght = new StrengthPipe();
        let value= strenght.transform(5)

        expect(value).toBe("5 (weak)");
        
    })
   it("should display strong if the value is 10",()=>{
       let str= new StrengthPipe();
       let value = str.transform(10)
       expect(value).toBe("10 (strong)")

   })
})