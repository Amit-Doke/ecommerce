
import { Product } from './../../Product';
import { OrderReview } from './OrderReview';
export class UserOrder 
{
    public review:OrderReview;
    public flag:boolean = false;
    constructor(
        public id: number,
        public product:Product,
        public price:number,
        public created:Date,
        public deliveryStatus:string,
        public quantity:number,
        public otp:number
    ){}
}
