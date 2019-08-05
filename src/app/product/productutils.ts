import { Product } from './product';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductUtils{
    public static   convertProduct(product:Product,image:File){
        const formData = new FormData();
        formData.append("file", image);
        formData.append('product', new Blob([JSON.stringify(product)], {
          type: "application/json"
        }));
        return formData;
    }

    public static createProductUrl="/add";

}