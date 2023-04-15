import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTableDirective,  } from 'angular-datatables';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Placement as PopperPlacement, Options } from '@popperjs/core';
import Swal from 'sweetalert2';
import { GuestService } from './guest.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  params!: any;
  guestList!: any;
  guestForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private guestService: GuestService,
  ) { }

  ngOnInit(): void {

    // this.authService.list(this.params).subscribe(async resp => {
    //   this.guestList = await resp.data;
    //   console.log(resp)

    // });

    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      scrollX: true,
      stateSave: true,
      ajax: (dataTablesParameters: any, callback) => {
       
        // console.log(dataTablesParameters)
        this.authService.list(dataTablesParameters).subscribe(async resp => {
          this.guestList = await resp.data;
          // console.log(resp)

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });

      },
      columns: [
        { data: 'fname', width: '10%' },
        { data: 'lname', width: '10%' },
        { data: 'vcode', width: '10%' },
        { data: 'vfname', width: '10%' },
        { data: 'vlname', width: '10%' },
        { data: 'response', width: '10%' },
        { data: 'remarks', width: '10%' },
        { data: 'role', width: '10%' },
        { data: 'assigned_to', width: '10%' },
        { data: null, title: "Actions", width: "10%", className: "dt-body-center", orderable: false, searchable: false},
      ]
    };

    this.guestForm = this.fb.group({
      id: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      vcode: ['', Validators.required],
      vfname: ['', Validators.required],
      vlname: ['', Validators.required],
      response: ['', Validators.required],
      remarks: ['', Validators.required],
      role: ['', Validators.required],
      assigned_table: ['', Validators.required],
      assigned_to: ['', Validators.required],
      company: ['', Validators.required],
    });

  }

  add(targetModal:any){

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl',
    });

    this.guestForm = this.fb.group({
      id: [''],
      fname: [''],
      lname: [''],
      vcode: [''],
      vfname: [''],
      vlname: [''],
      response: [''],
      remarks: [''],
      role: [''],
      assigned_table: [''],
      assigned_to: [''],
      company: [''],
    });

  }

  edit(targetModal:any, raw:any) {

    console.log(raw)

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'sm',
    });

    this.guestForm.patchValue({
      id: raw.id,
      fname: raw.fname,
      lname: raw.lname,
      vcode: raw.vcode,
      vfname: raw.vfname,
      vlname: raw.vlname,
      response: raw.response,
      remarks: raw.remarks,
      role: raw.role,
      assigned_table: raw.assigned_table,
      assigned_to: raw.assigned_to,
      company: raw.company,
    });

  }

  async onSubmitSave(): Promise<any> {

    alert('submitted')
    
    // const raw = this.guestForm.getRawValue();
    // console.log(raw)

    // await this.opexDataService.save(raw).subscribe((data: any) => {

    //   console.log(data)
    //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //     dtInstance.draw();

    //     // Swal.fire({
    //     //   // position: 'top-end',
    //     //   icon: 'success',
    //     //   title: 'Successfully save!',
    //     //   showConfirmButton: false,
    //     //   timer: 1500
    //     // })

    //   });

    //   this.modalService.dismissAll();

    // });

  }

  async onSubmitUpdate(): Promise<any> {

    // Swal.fire('Any fool can use a computer')

    alert('updated')
    
    const raw = this.guestForm.getRawValue();
    console.log(raw)

    await this.guestService.update(raw).subscribe((data: any) => {

      console.log(data)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();

        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Successfully save!',
          showConfirmButton: false,
          timer: 1500
        })

      });

      this.modalService.dismissAll();

    });

  }

  // remove(raw: any) {
    
  //   Swal.fire({
  //     title: 'Are you sure you want to delete this record?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {

  //       this.opexDataService.delete(raw).subscribe((data: any) => {

  //         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //           dtInstance.draw();
    
  //           Swal.fire(
  //             'Deleted!',
  //             'This record has been deleted.',
  //             'success'
  //           )
            
  //         });


  //       });

  //     }
  //   })
  // }

}
