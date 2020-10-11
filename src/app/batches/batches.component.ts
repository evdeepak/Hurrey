import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceService } from '../share/service.service';
import { Batch } from '../batch.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  exampleForm: FormGroup;
  batchList: any;
  Batches: Observable<any[]>;
  _db
  InstitutionList: any;
  constructor(private service: ServiceService,
    private fb: FormBuilder, private db: AngularFirestore, private _snackBar: MatSnackBar) {
    this.createForm();
    this.Batches = db.collection('Batches').valueChanges();
    this._db = db;
  }

  ngOnInit() {
    this.getBatch();
    this.getInstitution();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      institute: ['', Validators.required],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      board: ['', Validators.required],
      class: ['', Validators.required],
      fee: ['', Validators.required],
      batch_start_time: ['', Validators.required],
      batch_end_time: ['', Validators.required],
    });
  }


  AddBatch() {
    this.service.createBatch(
      this.exampleForm.value.institute,
      this.exampleForm.value.name,
      this.exampleForm.value.subject,
      this.exampleForm.value.board,
      this.exampleForm.value.class,
      this.exampleForm.value.fee,
      this.exampleForm.value.batch_start_time,
      this.exampleForm.value.batch_end_time)
      .then(
        res => {
          this._snackBar.open('Batch Added', 'Undo', {
            duration: 3000
          });
          console.log(res);
        }
      )
  }



  getBatch() {
    this.service.getBatchServie().subscribe(data => {
      this.batchList = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          subject: e.payload.doc.data()['subject'],
          batch_start_time: e.payload.doc.data()['batch_start_time'],
          batch_end_time: e.payload.doc.data()['batch_end_time'],
          board: e.payload.doc.data()['board'],
          class: e.payload.doc.data()['class'],
          fee: e.payload.doc.data()['fee'],
          institute: e.payload.doc.data()['institute'],
        } as Batch;
      })

    });
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

    });
  }

}
