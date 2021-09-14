import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/service/project.service';
import { PurposalService } from 'src/app/service/purposal.service';
import { ReviewsService } from 'src/app/service/reviews.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css'],
})
export class RightComponent implements OnInit {
  faComment = faComment;
  faHome = faHome;
  allUsers: any = [];
  user = new User();
  data: any;
  Reviews: any = [];
  checkUser: any;
  onlineUser: User = new User();
  clientProjects: any = [];

  constructor(
    private userService: UserService,
    private reviewService: ReviewsService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private proposalService: PurposalService
  ) {}
  ngOnInit(): void {
    this.userService.getUser(this.route.snapshot.params.id).subscribe((res) => {
      this.data = res;
      this.user = this.data;
      console.log(this.user);
      if (this.user.type == 'client') {
        this.checkUser = true;
      } else {
        this.checkUser = false;
      }
    });

    this.onlineUser.id = localStorage.getItem('id');
    console.log(this.user);

    this.showReview();
    // this.getProjects();
    this.getِActiveProposal();
    this.getPendingProposal();
  }

  showReview() {
    this.reviewService.showreviews(this.onlineUser.id).subscribe((res) => {
      this.Reviews = res;
      console.log(this.Reviews);
    });
  }

  proposalData: any;
  proposal: any = [];

  getِActiveProposal() {
    this.proposalService
      .getProposalforClient(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.proposalData = res;
        this.proposal = this.proposalData;
        console.log(this.proposal);
      });
  }

  pendingData: any;
  pending: any = [];

  getPendingProposal() {
    this.projectService
      .getPending(this.route.snapshot.params.id)
      .subscribe((res) => {
        this.pendingData = res;
        this.pending = this.pendingData;
        console.log(this.pending);
      });
  }

  // getProjects() {
  //   this.projectService
  //     .getClientProject(this.route.snapshot.params.id)
  //     .subscribe((res) => {
  //       this.project = res;
  //       this.clientProjects = this.project;
  //       console.log(this.clientProjects);

  //     });
  // }
}
