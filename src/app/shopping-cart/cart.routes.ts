import { Routes } from "@angular/router";
import { ShoppingCart } from "./shopping-cart.component";

export const CART_ROUTES: Routes = [
	{
		path: "cart",
		component: ShoppingCart,
	},
	{ path: "**", redirectTo: "list" },
];
