import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, addDoc } from '@angular/fire/firestore';
import { collection, deleteDoc, doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class Arrivals {
  firestore = inject(Firestore);
  arrivalsCollection = collection(this.firestore, 'arrivals');
  arrivals$ = collectionData(this.arrivalsCollection, { idField: 'id' });

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
}
