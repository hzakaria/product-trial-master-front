import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventoryStatus',
  standalone: true, 
  pure: true        
})
export class InventoryStatusPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'En Stock';
      case 'LOWSTOCK':
        return 'Stock Faible';
      case 'OUTOFSTOCK':
        return 'Rupture de Stock';
      default:
        return 'Indisponible';
    }
  }
}
