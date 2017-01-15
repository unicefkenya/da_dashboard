import { Routes } from "@angular/router";
import { SchoolComponent } from './school/school.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { StudentComponent } from './student/student.component';

export const MainRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'school',
      component: SchoolComponent
    },{
      path: 'teacher',
      component: TeacherComponent
    },{
      path: 'class',
      component: ClassComponent
    },{
      path: 'student',
      component: StudentComponent
    },]
  }
];
