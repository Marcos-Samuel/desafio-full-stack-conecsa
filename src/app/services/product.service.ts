import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id?: string;
  productName: string;
  productDescription: string;
  code: string;
  qnt: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'products');
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  addProduct(product: Product) {
    return addDoc(this.collectionRef, product);
  }

  updateProduct(product: Product) {
    const productDoc = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDoc, { ...product });
  }

  deleteProduct(id: string) {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }
}
