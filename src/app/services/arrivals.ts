import { inject, Injectable } from '@angular/core';
import {
  collectionData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  orderBy,
  Query,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Arrivals {
  arrivalsCollection: any;
  arrivals$: Observable<any> | undefined;

  constructor(private firestore: Firestore) {
    this.arrivalsCollection = collection(this.firestore, 'arrivals');
  }

  async loadSpecificDay(dateStr: string) {
    const target = new Date(dateStr);

    const startUTC = new Date(
      Date.UTC(
        target.getUTCFullYear(),
        target.getUTCMonth(),
        target.getUTCDate(),
        0,
        0,
        0
      )
    );
    const endUTC = new Date(
      Date.UTC(
        target.getUTCFullYear(),
        target.getUTCMonth(),
        target.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    const startOfDay = Timestamp.fromDate(startUTC);
    const endOfDay = Timestamp.fromDate(endUTC);

    const arrivalsQuery: Query<DocumentData> = query(
      this.arrivalsCollection,
      where('date', '>=', startOfDay),
      where('date', '<=', endOfDay)
    );

    console.log('llega aca');
    this.arrivals$ = collectionData(arrivalsQuery, { idField: 'id' });
  }

  loadAllArrivals() {
    const arrivalsQuery: Query<DocumentData> = query(
      this.arrivalsCollection,
      orderBy('date', 'desc')
    );
    this.arrivals$ = collectionData(arrivalsQuery, { idField: 'id' });
  }

  async createArrival(data: {
    code: string;
    date: string;
    observations: string;
  }) {
    try {
      await addDoc(this.arrivalsCollection, {
        ...data,
        state: 0,
        createdAt: new Date(),
        date: Timestamp.fromDate(new Date(data.date)),
      });
      console.log('Arrival agregado con éxito');
    } catch (err) {
      console.error('Error al agregar arrival:', err);
    }
  }

  async removeArrival(id: string) {
    const docRef = doc(this.firestore, `arrivals/${id}`);
    try {
      await deleteDoc(docRef);
      console.log('Arraival deleted');
    } catch (e) {
      console.log(`Error on delete arrival with id: ${id} `);
    }
  }

  async updateArrival(arrivalId: string, updatedData: any) {
    console.log('updatedData', updatedData);
    const docRef = doc(this.firestore, `arrivals/${arrivalId}`);
    await updateDoc(docRef, updatedData);
  }
}
