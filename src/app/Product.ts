export class Product {
    public discountPrice: number = 0;
    public productFlag:boolean = false;
    public AvgStar:number[] = [];
    public star:number = 0;
    constructor(
        public id:number, 
        public name:string, 
        public quantity:number, 
        public price:number, 
        public discount:number, 
        public description:string, 
        public url:string, 
        public category:string, 
        public popularity:number, 
        public brand:string, 
        public sizeName:string, 
        public color:string,
        public costPrice:number
        )
    {
    }
}
