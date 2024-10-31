import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { CartService } from "app/shopping-cart/data-access/cart.service";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { Product } from "app/products/data-access/product.model";
import { CartItem } from "app/shopping-cart/data-access/cart.service"; 
import { InventoryStatusPipe } from "app/shared/pipes/inventory-status-pipe";
import { ProductsService } from "app/products/data-access/products.service";


@Component({
    standalone: true,
    imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, CheckboxModule, InventoryStatusPipe],
    selector: 'app-shopping-cart',
    templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
    @Output() close = new EventEmitter<void>();

    private readonly cartService = inject(CartService);
    private readonly productService = inject(ProductsService);

    public readonly cartItems = this.cartService.cartItems;
    public selectedProducts: CartItem[] = []; 
    public allSelected = false;

    ngOnInit() { 
    }

    getSeverity(status: string) {
        return this.productService.getSeverity(status);
    }

    onClose() {
        this.close.emit();
    }

    deleteSelectedProducts(): void {
        if (this.selectedProducts && this.selectedProducts.length > 0) {
            const productIds = this.selectedProducts.map(item => item.product.id);
            this.cartService.deleteFromCart(productIds);
            this.selectedProducts = [];
            this.allSelected = false;
        }
    }

    toggleAllProducts(): void {
        if (this.allSelected) {
            this.selectedProducts = [...this.cartItems()];
        } else {
            this.selectedProducts = [];
        }
    }

    products(): Product[] {
        return this.cartItems().map(cartItem => cartItem.product);
    }

    increaseQuantity(item: CartItem): void {
        this.cartService.updateQuantity(item.product.id, item.quantity + 1);
      }
    
      decreaseQuantity(item: CartItem): void {
        if (item.quantity > 1) {
          this.cartService.updateQuantity(item.product.id, item.quantity - 1);
        } else {
          this.cartService.deleteOneProductFromCart(item.product.id);
        }
      }
}
