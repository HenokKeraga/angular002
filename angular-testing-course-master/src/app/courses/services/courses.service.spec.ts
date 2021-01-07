import { HttpRequest } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";
import { CoursesService } from "./courses.service";

describe("courses service", () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should retrive all courses", () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses.length).toBe(12);
    });
    let testRequest: TestRequest = httpTestingController.expectOne(
      "/api/courses"
    );
    testRequest.flush({ payload: Object.values(COURSES) });
    let httpRequest: HttpRequest<any> = testRequest.request;
    expect(httpRequest.method).toBe("GET");
    httpTestingController.verify()
  });

  it('should get one course for the given course id ',()=>{

    coursesService.findCourseById(1).subscribe(course=>{
        expect(course.id).toBe(1)
       
    })

    let testRequest:TestRequest=httpTestingController.expectOne("/api/courses/1")
    testRequest.flush(COURSES[1]);
    expect(testRequest.request.method).toBe("GET");
    httpTestingController.verify()

  })

  it('should save the change in the course object',()=>{

    let change: Partial<Course> = {
      titles: {
        description: "test description",
        longDescription: "test long description"
      },
    };

    coursesService.saveCourse(1, change).subscribe(course=>{
        expect(course.id).toBe(1)
        expect(course.titles.description).toBe("test description");
    })
    
    let testRequest:TestRequest=httpTestingController.expectOne("/api/courses/1");

    testRequest.flush({...COURSES[1],...change})

    expect(testRequest.request.method).toBe("PUT")
    expect(testRequest.request.body.titles.description).toBe(
      "test description"
    );

    httpTestingController.verify()


  })
});
