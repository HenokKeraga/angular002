import { MessageService } from "./message.service"

describe(" message service ",()=>{
 let messageService:MessageService 

 beforeEach(()=>{
     messageService= new MessageService()
 })

 it(" should be zero for the start ",()=>{
     expect(messageService.messages.length).toBe(0)

 })

 it("should add message when add is called  ",()=>{

    messageService.add("message")

    expect(messageService.messages.length).toBe(1)

 })

 it("should remove all message when clear is called ",()=>{
     messageService.add("message")

     messageService.clear()

     expect(messageService.messages.length).toBe(0)

 })

})