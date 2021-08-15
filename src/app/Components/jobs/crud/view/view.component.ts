import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/service/project.service';
import { ReviewsService } from 'src/app/service/reviews.service';
import { Review } from 'src/app/_models/review';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/service/user.service';
import { PurposalService } from 'src/app/service/purposal.service';
import { Purposal } from 'src/app/_models/purposal';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ProjectService: ProjectService,
    private router: Router,
    private ReviewService :ReviewsService,
    private userservice: UserService,
    private purposalservice:PurposalService,
  ) {}

   project:any=[];
   rate: number = 0;
   review =new Review();
   data: any;
   user:any;
   purposal:any=[];
   allpurposals:any=[];
 //  project:Project = new Project ()

  ngOnInit(): void {
    this.view();
    this.showreview();
    this.get_allpurposal();
    this.get_purposal();
  }

  view(){
    this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(res => {
        this.project = res;
        this.rate = this.project.rate;
        // this.showreview
        console.log(this.project);
        // localStorage.setItem('project_id',JSON.stringify((this.project.id)));
      });

  }


  showreview(){
    this.ReviewService.showreviews(this.route.snapshot.params.id).subscribe(response => {
      this.data=response;
      console.log(this.data);
    });
  }

  get_allpurposal(){

    this.purposalservice.getAllPurposals().subscribe(purposalres => {
      console.log(purposalres);
      this.allpurposals=purposalres ;

    });

  }
  get_purposal(){

    this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe(response => {
      this.data=response;
      console.log(this.data);
    });
  }

accept_purposal(){
  this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(res => {
    this.project = res;
    this.project.status='proccessing';
    // res='processing';
  })
  // this.project.status='proccessing'

}

}
