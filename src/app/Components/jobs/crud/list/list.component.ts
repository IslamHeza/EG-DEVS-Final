import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  val:number=3
  searchjob:String="";

  userData: any;
  onlineUser: User = new User();
  allprojects:any=[];

  constructor(   private route: ActivatedRoute,
    private ProjectService: ProjectService,
    private router: Router,
    private userservice: UserService ){}

  ngOnInit(): void {
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);

     this.getAllProjects();

  }

 getAllProjects(){
    return this.ProjectService.getAllProjects().subscribe(res => {
      this.allprojects= res ;
      console.log(this.allprojects);

     
    });
  }
  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);
    });
  }
  



}
