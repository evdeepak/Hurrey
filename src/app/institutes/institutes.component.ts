import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../share/service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss']
})
export class InstitutesComponent implements OnInit {
  InstitutionForm: FormGroup;
  InstitutionList: any;
  twocol: any;
  onecol: any;
  constructor(private service: ServiceService, private _snackBar: MatSnackBar, private fb: FormBuilder, private db: AngularFirestore) {
    this.createForm();
  }

  ngOnInit() {
    this.twocol = (window.innerWidth <= 1200) ? 1 : 3;
    this.onecol = (window.innerWidth <= 1200) ? 1 : 1;

    this.getInstitution();
  }
  onResize1(event) {
    this.twocol = (event.target.innerWidth <= 500) ? 1 : 2;
  }
  onResize2(event) {
    this.onecol = (event.target.innerWidth <= 500) ? 1 : 1;
  }
  createForm() {
    this.InstitutionForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],

    });
  }

  addInstitution() {
    this.service.createInstitution(
      this.InstitutionForm.value.name,
      this.InstitutionForm.value.city,
      this.InstitutionForm.value.district,
      this.InstitutionForm.value.state,
    )
      .then(
        res => {
          this._snackBar.open('Institution Added', 'Undo', {
            duration: 3000
          });
          console.log(res);
        }
      )
  }

  getInstitution() {
    this.service.getinstitutioServie().subscribe(data => {
      this.InstitutionList = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          city: e.payload.doc.data()['city'],
          district: e.payload.doc.data()['district'],
          state: e.payload.doc.data()['state'],
        }
      })
      console.log(this.InstitutionList);

    });
  }

}
