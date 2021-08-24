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
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


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
    private ReviewService: ReviewsService,
    private userservice: UserService,
    private purposalservice: PurposalService,
    private http: HttpClient,
    private sanitizer: DomSanitizer

  ) {}

  project: any = [];
  rate: any = 0;
  review = new Review();
  data: any;
  status: any;
  user = new User();
  purposal: any = [];
  allpurposals: any = [];
  url: any;
  //  project:Project = new Project ()

  userData: any;
  onlineUser: User = new User();
  user_of_purposal : any = [];
  hide: boolean = false ;


  rate_pro: number = 0;

  ngOnInit(): void {
    this.onlineUser.id = localStorage.getItem('id');
    this.getUser(this.onlineUser.id);

    this.view();
    this.showreview();
    // this.get_purposal();
    this.get_allpurposal();
    this.download();
    // this.hide=!(this.purposal.developer_id== this.onlineUser && this.onlineUser.type=='developer')
    this.check_purposal();
  }
  check_purposal(){
    if(this.onlineUser.id==this.purposal.developer_id && this.onlineUser.type =='developer' && this.purposal.project_id==this.project.id){
      this.hide=true;
    }else if(this.onlineUser.type =='developer'){
      this.hide=false
    }
  }
  getUser(id: any) {
    return this.userservice.getUser(id).subscribe((res) => {
      this.userData = res;
      this.onlineUser = this.userData;
      console.log(this.onlineUser.type);
    });
  }

  view() {

    this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(
      (res) => {
        this.project = res;
        this.rate = this.project.user_rate;
        this.status=this.project.status;

        // this.showreview

        this.url = '/api/download/' + this.project.file;
        this.download();



        // localStorage.setItem('project_id',JSON.stringify((this.project.id)));
      }
    );
  }

  showreview() {
    this.ReviewService.showreviews(this.route.snapshot.params.id).subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      }
    );
  }

  get_allpurposal() {
    this.purposalservice.getAllPurposals().subscribe((purposalres) => {
      // this.purposal.project_id=this.project.id
      if (this.purposalservice.getPurposal(this.route.snapshot.params.id)) {
        console.log(purposalres);

      //   // this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe( response => {
      //   //   this.purposal=response;
      //   this.userservice.getUser(this.purposal.developer_id).subscribe(res => {
      //     this.user_of_purposal=res;

      //     console.log(res);
      //   });
      // // });
        this.allpurposals = purposalres;

      }

    });
  }

  // get_user_of_purposal(){
  // //   this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe( response => {
  // //     this.purposal=response;
  // //   this.userservice.getUser(this.purposal.developer_id).subscribe(res => {
  // //     this.user_of_purposal=res;

  // //     console.log(res);
  // //   });
  // // });


  //   this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe( response => {
  //     this.purposal=response;

  //     // console.log(this.purposal.project_id);

  //     this.userservice.getUser(this.purposal.developer_id).subscribe(res => {
  //       this.user_of_purposal =res;
  //       this.rate = this.user_of_purposal .rate;
  //       console.log(res);
  //       this.ProjectService.getProject(this.purposal.project_id).subscribe(res => {
  //         this.project=res;
  //         this.project.developer_id=this.purposal.developer_id
  //         this.ProjectService.updateProject(this.route.snapshot.params.id, this.project)
  //         .subscribe((res) => {

  //         });
  //       });

  //     });

  //   });

  // }

  // get_user(){
  //   this.userservice.getUser(this.route.snapshot.params.id).subscribe(res =>{
  //     this.data = res;
  //     this.user = this.data;
  //     console.log(this.user.name);
  //   });
  // }

  // get_purposal(){

  //   this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe(response => {
  //     this.purposal=response;
  //     // this.purposal.project_id=this.project.id
  //     console.log(response);

  //   });
  // }

  accept_purposal() {
    this.project.status = 'processing';
    this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(
      (res) => {
        this.project = res;
        this.project.status = 'processing';
        console.log(this.project.status);

        this.ProjectService.updateProject(
          this.route.snapshot.params.id,
          this.project
        ).subscribe((res) => {

        });
      }
    );
  }

  download() {
    // this.ProjectService
    //   .download(this.url)
    //   .subscribe(blob => saveAs(blob, this.project.file))
    // const blob = this.ProjectService.download(this.url).subscribe(
    const blob = this.ProjectService.download(this.project.file).subscribe(
      (blob) => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(blob)
        );
      }
    );
  }


}


