import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { PurposalService } from 'src/app/service/purposal.service';
import { Project } from 'src/app/_models/project';
import { Purposal } from 'src/app/_models/purposal';
@Component({
  selector: 'app-active-jobs',
  templateUrl: './active-jobs.component.html',
  styleUrls: ['./active-jobs.component.css'],
})
export class ActiveJobsComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private route: Router,
    private proposalService: PurposalService
  ) {}

  ActivProjects: any = [];
  data: any;
  userId: any;
  empty: boolean = true;
  proposal: any = [];


  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.getActiveProjects(this.userId);
  }

  async getActiveProjects(id: any) {
    // const active = await this.projectService.getActiveProjects(id).subscribe((res) => {
    const active = await this.projectService.getActiveProjects(id).toPromise();
    // console.log(active);

    let res = active;
    this.data = res;
    this.ActivProjects = this.data;
    if (this.ActivProjects.length != 0) this.empty = false;
    // console.log(this.ActivProjects);
    // });
    this.getProposal();
    // console.log(this.ActivProjects);
  }

  viewProject(proposalId:any) {
    // this.route.navigate(['viewproject/'+id]);
    console.log(proposalId);
    
    this.route.navigate(['/viewAcceptPurposal/' + proposalId]);
  }

  async getProposal() {
    let i = 0;
    for (let project of this.ActivProjects) {
      // this.getProposal(this.ActivProjects[i] );

      const proposal = await this.proposalService
        .getProposalOfProject(project.id, this.userId)
        .toPromise();

      this.proposal = proposal;
      // console.log(proposal);
      // console.log(this.proposal[0].id);

      this.ActivProjects[i].proposalId = this.proposal[0].id;
      // id = this.proposal.id;
      i++;
      // this.route.navigate(['/viewAcceptPurposal/'+this.proposal.id]);
      // console.log(this.ActivProjects[i - 1]);

      // });
    }
  }
}
