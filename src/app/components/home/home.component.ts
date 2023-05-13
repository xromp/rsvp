import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  statusRemarks: any = false;
  submitButton: any = false;
  uuid: string = '';
  guest: any;
  isLoaded = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      status: ['', Validators.required],
      extraAttendees: [0,],
      reason: [''],
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(({ uuid }) => {
      this.uuid = uuid
      this.authService.getGuest(this.uuid).subscribe(response => {
        this.guest = response;
        this.registerForm.setValue({
          firstName: this.guest.firstName,
          lastName: this.guest.firstName,
          status: this.guest.status === 'pending' ? '' : this.guest.status,
          extraAttendees: 0,
          reason: ''
        });
        this.cdRef.detectChanges();
        this.isLoaded = true;
      }, (error) => {
        Swal.fire({
          icon: 'error',
          // title: this.errors.message,
          title: "Something went wrong!",
          text: error.error.message,
          showConfirmButton: false,
          timer: 0
        }).then(result => this.router.navigate(['/']));

      })
    });

  }

  onChangeResponse($event: string) {
    // alert(response)
    let value = this.registerForm.get("response")?.value

    // console.log(value)
    if (value == "Yes") {
      this.statusRemarks = false;
    } else {
      this.statusRemarks = true;
    }
  }

  async onSubmit(): Promise<any> {


    this.submitButton = true;

    // console.log(this.registerForm.value);

    let raw = this.registerForm.value;

    await this.authService.registerGuest(this.uuid, raw).subscribe((result: any) => {

      // console.log(result);

      Swal.fire({
        // icon: result.icon,
        title: 'result.title',
        text: 'result.message',
        showConfirmButton: true,
        // timer: result.timer
      });

      if (result.status == 200) {
        // this.registerForm.reset();
        this.registerForm.controls['response'].setValue("");
      }

      this.submitButton = false;
      this.statusRemarks = false;

    },
      (error) => {
        this.errors = error.error;

        Swal.fire({
          icon: 'error',
          // title: this.errors.message,
          title: "Something went wrong!",
          text: this.errors.message,
          showConfirmButton: true,
          timer: 0
        });

        this.submitButton = false;
        // this.statusRemarks = false;

      },
      () => {
        this.submitButton = false;
        // this.registerForm.reset();
        Swal.fire({
          icon: 'success',
          // title: this.errors.message,
          title: "Successfully submitted",
          text: "Thank you for taking time completing RSVP. Your response is much appreciated",
          showConfirmButton: true,
          timer: 0
        });
      }
    );
  }

}
