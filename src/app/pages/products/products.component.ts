import { Component, inject } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { EditProductModalComponent } from '../../components/edit-product-modal/edit-product-modal.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component'; // Importe o modal de confirmação

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditProductModalComponent,
    HeaderComponent,
    CardProductsComponent,
    ConfirmationModalComponent,
  ],
})
export class ProductsComponent {
  productService = inject(ProductService);
  products$: Observable<Product[]> = this.productService
    .getProducts()
    .pipe(map((products) => products ?? []));

  isModalOpen = false;
  isConfirmationModalOpen = false;
  selectedProduct: Product | null = null;

  productForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    qnt: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  // Método para adicionar um produto
  addProduct() {
    if (this.productForm.valid) {
      this.productService
        .addProduct(this.productForm.value as Product)
        .then(() => {
          this.productForm.reset({
            productName: '',
            productDescription: '',
            code: '',
            qnt: null,
          });
        })
        .catch((error) => console.error('Erro ao adicionar produto:', error));
    }
  }

  deleteProduct(id: string) {
    this.products$.subscribe((products) => {
      const productToDelete = products.find((product) => product.id === id);
      if (productToDelete) {
        this.selectedProduct = productToDelete;
        this.isConfirmationModalOpen = true;
      }
    });
  }

  handleConfirmationAction(confirmed: boolean) {
    if (confirmed && this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id || '');
    }
    this.isConfirmationModalOpen = false;
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  saveChanges(updatedProduct: Product) {
    this.productService.updateProduct(updatedProduct).then(() => {
      this.closeModal();
    });
  }
}
