import { Component, inject } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductsComponent {
  productService = inject(ProductService);
  products$: Observable<Product[]> = this.productService.getProducts();

  newProduct: Product = {
    productName: '',
    productDescription: '',
    code: '',
    qnt: 0,
  };

  addProduct() {
    this.productService.addProduct(this.newProduct).then(() => {
      this.newProduct = {
        productName: '',
        productDescription: '',
        code: '',
        qnt: 0,
      };
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }

  ngOnInit() {
    this.products$.subscribe((products) => {
      console.log(products); // Check if products are being loaded
    });
  }
}
