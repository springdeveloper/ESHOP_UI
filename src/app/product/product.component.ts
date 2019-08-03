import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormControl, ReactiveFormsModule,FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];  

  constructor(private pservice:ProductService,
    private formBuilder: FormBuilder) { }
    productForm: FormGroup;
    productName = '';
    product:any;
    price: number = null;
    isLoadingResults = false;
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'productName' : [null, Validators.required],
      'price' : [null, Validators.required],
       "id":[null]
    });

   this.gtProductList();
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.pservice.addProduct(this.productForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
        this.gtProductList();

  }

  gtProductList(){
    this.pservice.getProducts().subscribe((data:Product[])=>{
     this.products=data;
    });
  }

  deleteProduct(id){
    console.log("delete"+id);
    this.pservice.deleteProductByID(id).subscribe(data=>{
        console.log("hi"+data.toString());
      this.gtProductList();
    });

  //  this.gtProductList();
  }
  prod=new Product();
  editProduct(id){
    console.log("Edit"+id);
    this.pservice.getProductByID(id).subscribe(data=>{
      this.prod=data;
   this.productForm.setValue({
     productName:this.prod.productName,
     price:this.prod.price,
     id:this.prod.id

   })
    });

  //  this.gtProductList();
  }
}
