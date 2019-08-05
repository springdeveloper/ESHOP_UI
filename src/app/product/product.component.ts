import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormControl, ReactiveFormsModule, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from './product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];

  constructor(private pservice: ProductService,
    private formBuilder: FormBuilder, private http: HttpClient) { }
  productForm: FormGroup;
  productName = '';
  product: any;
  price: number = null;
  isLoadingResults = false;
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'productName': [null, Validators.required],
      'price': [null, Validators.required],
      "id": [null]    });

    this.gtProductList();
  }
  selectedFiles: FileList;
  currentFileUpload: File = null;
  selectFile(event) {
    this.currentFileUpload = <File>event.target.files[0];   
   console.log("hi " + this.currentFileUpload.toString());
  }

  onFormSubmit() {

    this.isLoadingResults = true;
    this.pservice.addProduct(this.productForm.value,this.currentFileUpload)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.gtProductList();
    this.productForm.reset();
    this.currentFileUpload.slice;
  }

  gtProductList() {
    this.pservice.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  deleteProduct(id) {
    console.log("delete" + id);
    this.pservice.deleteProductByID(id).subscribe(data => {
      console.log("hi" + data.toString());
      this.gtProductList();
    });

    //  this.gtProductList();
  }
  prod = new Product();
  editProduct(id) {
    console.log("Edit" + id);
    this.pservice.getProductByID(id).subscribe(data => {
      this.prod = data;
      this.productForm.setValue({
        productName: this.prod.productName,
        price: this.prod.price,
        id: this.prod.id

      })
    });

    //  this.gtProductList();
  }
}
