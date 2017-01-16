export class SchoolRegistration {
  constructor(
    public schoolName: string,
    public schoolCode: number,
    public emisCode: string,
    public waterSource: string,
    public constituency: string,
    public county: string,
    public geo_cordinates: string,
    public headTeacherName: string,
    public headTeacherPhone: string
  ){}
}
