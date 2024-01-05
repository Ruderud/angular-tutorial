import { Component } from '@angular/core';
import { Product, products } from '../products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product?: Product;

  constructor(private route: ActivatedRoute) {}

  // render 시작시점에 실행되는 함수
  ngOnInit() {
    // First get the product id from the current route.
    console.log('on init fire');
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    this.product = products.find((product) => product.id === productIdFromRoute);
  }
}
