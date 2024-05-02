import { Product } from "src/app/Product";

export class CartProduct 
{
    constructor(
        public product:Product,
        public price:number,
        public quantity:number
    ){}
}
