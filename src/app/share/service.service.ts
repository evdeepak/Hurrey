import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Batch } from '../batch.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  constructor(private firestore: AngularFirestore) { }

  c1reateBatch(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("Batches")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  createBatch(instituteName,batchname, batchsubject, batchboard, batchclass, batchfee, batchstartTime, batchEndTime) {
    return this.firestore.collection('Batches').add({
      institute:instituteName,
      name: batchname,
      subject: batchsubject,
      board: batchboard,
      class: batchclass,
      fee: batchfee,
      batch_start_time: batchstartTime,
      batch_end_time: batchEndTime
    });
  }

  createInstitution(institutioNname, institutiocity, institutiodist, institutiostate) {
    return this.firestore.collection('Institutes').add({
      name: institutioNname,
      city: institutiocity,
      district: institutiodist,
      state: institutiostate,
    });
  }

  getBatchServie() {
    return this.firestore.collection('Batches').snapshotChanges();
  }

  getinstitutioServie() {
    return this.firestore.collection('Institutes').snapshotChanges();
  }
}
