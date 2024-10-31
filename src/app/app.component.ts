import {
  Component,
  computed,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { DialogModule } from "primeng/dialog";
import { ShoppingCart } from "./shopping-cart/shopping-cart.component";
import { BadgeModule } from 'primeng/badge';
import { CartService } from "./shopping-cart/data-access/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, DialogModule, ShoppingCart, BadgeModule],
})
export class AppComponent {
  title = "ALTEN SHOP";
  private readonly cartService = inject(CartService);
  public readonly countProduct = computed(() => (this.cartService.cartItems().length));

  public isDialogVisible = false;

  openCartDialog(): void {
    this.isDialogVisible = true; 
  }

  closeCartDialog(): void {
    this.isDialogVisible = false;
  }
}
