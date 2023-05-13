import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
// User interface
export type Guest = {
  id: string;
  uuid: string;
  firstName: string;
  fullname: string;
  inviteLink: string;
  status: string;
  confirmedDate: Date;
}

export type Stats = {
  pending: number;
  confirmed: number;
  declined: number;
}

export type GuestsResponse = { guest: Guest[], status: Stats }
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  response: GuestsResponse = { guest: [], status: { pending: 0, confirmed: 0, declined: 0 } };
  sortColumn = '';
  sortDirection = 1;

  constructor(public router: Router,
    private route: ActivatedRoute, public authService: AuthService) {
  }
  ngOnInit() {
    console.log(this.route.queryParams)
    this.route.queryParams.subscribe(({ passcode }) => {
      if (passcode === "secretonly") {
        this.authService.getGuests().subscribe((data: any) => {
          this.response = data;
        });
      }
    })

  }

  copy(guest: Guest) {
    navigator.clipboard.writeText(`
Hi ${guest.firstName},

Can we have a minute of your time by responding to our RSVP and letting us know your attendance status?

https://app.romgotaperfectcathch.com/${guest.uuid}

We will assume that you are unable to attend if we don't hear from you by May 25,2023.

Thank you.
    `);
  }

  sort(column: string) {
    if (column === this.sortColumn) {
      this.sortDirection *= -1;
    } else {
      this.sortColumn = column;
      this.sortDirection = 1;
    }

    this.response.guest.sort((a: any, b: any) => {
      const compareResult =
        a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
      return compareResult * this.sortDirection;
    });
  }
}