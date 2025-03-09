export interface CourseListResponse {
    courseName: string;
    courseCode: string;
    courseCredit: number;
    courseStudentCount: number;
    courseStudentCountLimit: number;
    courseTeacher: string;
    courseDescription: string,
    courseStatus: string,
    courseCalendar: [{
        startDate: Date,
        endDate: Date,
        length: number
    }]
}