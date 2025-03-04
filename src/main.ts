import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environment';
import { ProductsComponent } from './app/pages/products/products.component';
import { ProductService } from './app/services/product.service';
import { FormsModule } from '@angular/forms';

bootstrapApplication(ProductsComponent, {
  providers: [
    ProductService,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
});
