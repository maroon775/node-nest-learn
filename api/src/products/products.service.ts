import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [];

  private _findIndexById(id) {
    return this.products.findIndex((product) => product.id == id);
  }
  findAll() {
    return this.products;
  }

  findByPrimaryKey(pk) {
    return this.products[this._findIndexById(pk)];
  }

  create(product) {
    this.products.push({
      id: this.products.length + 1,
      ...product,
    });
  }

  batchCreate(products) {
    this.products = this.products.concat(products);
  }

  remove(id) {
    this.products.splice(this._findIndexById(id), 1);
  }
}
