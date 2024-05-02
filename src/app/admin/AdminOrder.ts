export class AdminOrder 
{
    flag:boolean = false;
    deliveryStatues:string[] = [];
    constructor(
        public id:number,
        public created:Date,
        public productName:string,
        public price:number,
        public quantity:number,
        public userName:string,
        public userEmail:string,
        public phoneNumber:string,
        public address:string,
        public status:string,
        public otp:number
    ){}
}
