import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Crews {
  firestore = inject(Firestore);
  crewCollection = collection(this.firestore, 'crews');
  crews$ = collectionData(this.crewCollection, { idField: 'id' });

  constructor() {}

  async createCrew(data: any) {
    try {
      await addDoc(this.crewCollection, {
        ...data,
        createdAt: new Date(),
      });
      console.log('Empleado agregado con éxito');
    } catch (err) {
      console.error('Error al agregar empleado:', err);
    }
  }

  async removeCrew(id: string) {
    const docRef = doc(this.firestore, `crews/${id}`);
    try {
      await deleteDoc(docRef);
      console.log('Crew deleted');
    } catch (e) {
      console.log(`Error on delete crew with id: ${id} `);
    }
  }
}
