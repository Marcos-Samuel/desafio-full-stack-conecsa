import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditProductModalComponent implements OnChanges {
  @Input() product: Product | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<Product>();

  private productSubject = new BehaviorSubject<Product | null>(null);
  product$: Observable<Product | null> = this.productSubject.asObservable();

  formGroup = new FormGroup({
    productName: new FormControl<string>('', Validators.required),
    productDescription: new FormControl<string>('', Validators.required),
    code: new FormControl<string>('', Validators.required),
    qnt: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.productSubject.next(this.product);
      this.formGroup.patchValue(this.product);
    }
  }

  save() {
    if (this.formGroup.valid) {
      const updatedProduct: Product = {
        id: this.productSubject.getValue()?.id || '',
        productName: this.formGroup.value.productName ?? '',
        productDescription: this.formGroup.value.productDescription ?? '',
        code: this.formGroup.value.code ?? '',
        qnt: this.formGroup.value.qnt ?? 0,
      };
      this.saveProduct.emit(updatedProduct);
      this.closeModal.emit();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
