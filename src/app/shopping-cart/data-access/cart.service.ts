import { Injectable, signal } from "@angular/core";
import { Product } from "../../products/data-access/product.model";

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

    private readonly _cartItems = signal<CartItem[]>([]);

    public readonly cartItems = this._cartItems.asReadonly();

    public get(): CartItem[] {
        return this._cartItems();
    }

    public addToCart(product: Product): void {
        this._cartItems.update(cartItems => {
            const existingItem = cartItems.find(item => item.product.id === product.id);
            if (existingItem) {
                return cartItems.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [{ product, quantity: 1 }, ...cartItems];
            }
        });
    }

    public updateQuantity(productId: number, newQuantity: number): void {
        this._cartItems.update(cartItems =>
            cartItems.map(item =>
                item.product.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    }

    public deleteOneProductFromCart(productId: number): void {
        this._cartItems.update(cartItems =>
            cartItems
                .map(item =>
                    item.product.id === productId && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.product.id !== productId || item.quantity > 0)
        );
    }

    public deleteFromCart(productIds: number[]): void {
        this._cartItems.update(cartItems => cartItems.filter(item => !productIds.includes(item.product.id)));
    }
}
