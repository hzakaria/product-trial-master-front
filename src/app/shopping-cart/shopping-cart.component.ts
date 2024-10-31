import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { CartService } from "app/shopping-cart/data-access/cart.service";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { Product } from "app/products/data-access/product.model";
import { InventoryStatusPipe } from "app/shared/pipes/inventory-status-pipe";
import { ProductsService } from "app/products/data-access/products.service";


@Component({
    standalone: true,
    imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, CheckboxModule, InventoryStatusPipe],
    selector: 'app-shopping-cart',
    templateUrl: 'shopping-cart.component.html'
})

export class ShoppingCart implements OnInit {
    @Output() close = new EventEmitter<void>();

    private readonly cartService = inject(CartService);
    private readonly productService = inject(ProductsService);

    public readonly products = this.cartService.cartItems;
    public selectedProducts: Product[] = [];
    public allSelected = false;
    
    ngOnInit() { 
        console.log("product:", this.cartService.cartItems);
    }

    getSeverity(status: string) {
        return this.productService.getSeverity(status);
    }

    onClose() {
        this.close.emit();
      }

    deleteSelectedProducts(): void {
        if (this.selectedProducts && this.selectedProducts.length > 0) {
            const productIds = this.selectedProducts.map(product => product.id);
            this.cartService.deleteFromCart(productIds);         
            this.selectedProducts = [];
            this.allSelected = false;
        }
    }
    toggleAllProducts(): void {
        if (this.allSelected) {
          this.selectedProducts = [...this.products()];
        } else {
          this.selectedProducts = [];
        }
    }


}