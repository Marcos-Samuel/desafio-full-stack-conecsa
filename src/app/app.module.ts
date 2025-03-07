import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/products.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, ProductsComponent],
})
export class AppModule {}
