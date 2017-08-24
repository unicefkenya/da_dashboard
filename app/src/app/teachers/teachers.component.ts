import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TeachersService} from './teachers.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [TeachersService]
})
export class TeachersComponent implements OnInit{
  teacher:number;
  firstname:any;
  lastname:any;
  phone:any;
  dateJoined:any;
  gender:any;

  constructor(private teachersService: TeachersService,private router: Router) {  }

  ngOnInit(){
    this.teacher = JSON.parse(localStorage.getItem('teacherId'));
    this.getTeacher(this.teacher);
  }

  getTeacher(id){
    this.teachersService.getTeacherId(id).subscribe(data=>{
      //console.log(data);
      this.firstname = data.fstname
      this.lastname = data.lstname
      this.phone = data.phone_no
      this.dateJoined = data.joined_current_school
       if(data.gender == 'M'){
         this.gender ='Male';
       }
       else if(data.gender == 'F'){
         this.gender = 'Female';
       }

    })
  }
}
