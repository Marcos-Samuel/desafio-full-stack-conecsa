import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css',
  standalone: false,
})
export class EditProductModalComponent {
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<Product>();

  productCopy: Product = {
    id: this.product?.id || '',
    productName: this.product?.productName || '',
    productDescription: this.product?.productDescription || '',
    code: this.product?.code || '',
    qnt: this.product?.qnt || 0,
  };

  ngOnChanges() {
    if (this.product) {
      this.productCopy = { ...this.product };
    }
  }

  save() {
    this.saveProduct.emit(this.productCopy);
  }

  close() {
    this.closeModal.emit();
  }
}
