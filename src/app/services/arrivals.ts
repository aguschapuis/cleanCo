import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, addDoc } from '@angular/fire/firestore';
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
} from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class Arrivals {
  firestore = inject(Firestore);
  arrivalsCollection = collection(this.firestore, 'arrivals');
  arrivalsQuery = query(this.arrivalsCollection, orderBy('date', 'desc'));
  arrivals$ = collectionData(this.arrivalsQuery, { idField: 'id' });

  constructor() {}

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
