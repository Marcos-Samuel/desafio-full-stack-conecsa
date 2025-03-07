import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css'],
  imports: [CommonModule],
})
export class CardProductsComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<string>();

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(productId: string) {
    this.delete.emit(productId);
  }
}
