import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from 'src/app/types/product';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) filterForm: NgForm;
  @Input() products: Product[];
  @Input() category: string;
  @Output() formFilterCange = new EventEmitter<{}>()
  // @Output() brandFilterChange = new EventEmitter<string>();
  // @Output() priceFilterChange = new EventEmitter<string>();

  private subscription: Subscription | undefined;

  uniqueBrands: string[] = ["remove filter"];
  priceRanges: string[] = ["0-49", "50-99", "100-149", "150-199", "more than 199", "remove filter"]
  // filterByPrice: string;
  // filterByBrand: string;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.apiService.getUniqueBrandsByCategory(this.category).subscribe(brands => {
      this.uniqueBrands = [...brands,...this.uniqueBrands];
    });
  }

  onSubmit() {
    console.log(this.filterForm.value, 'sidebar');
    this.formFilterCange.emit(this.filterForm)

  }

  // onBrandFilterChange() {
  //   this.brandFilterChange.emit(this.filterByBrand);
  // }

  // onPriceFilterChange() {
  //   console.log(this.filterByPrice);

  //   this.priceFilterChange.emit(this.filterByPrice);
  // }
  // onPriceFilterChange() {
  //   console.log(this.filterByPrice);

  //   if (this.filterByPrice === 'remove') {
  //     this.filterByPrice = 'choose'; // Reset to default value when removing filter
  //   }
  //   this.priceFilterChange.emit(this.filterByPrice);
  // }
  // onPriceFilterChange() {
  //   this.priceFilterChange.emit(this.filterByPrice);
  // }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
