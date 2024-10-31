import { Injectable, signal } from "@angular/core";
import { Product } from "../../products/data-access/product.model";

@Injectable({providedIn: 'root'})
export class CartService {
    
    private readonly _cartItems = signal<Product[]>([]);

    public readonly cartItems = this._cartItems.asReadonly();

    public get(): Product[] {
        return this._cartItems();
    }

    public addToCart(product: Product): void {
        return this._cartItems.update(cartItems => [product, ...cartItems]);
    }

    public deleteOneProductFromCart(productId: number): void {
        return this._cartItems.update(cartItems => cartItems.filter(product => product.id !== productId));
    }

    public deleteFromCart(productIds: number[]): void {
        return this._cartItems.update(cartItems => cartItems.filter(product => !productIds.includes(product.id)));
    }
}