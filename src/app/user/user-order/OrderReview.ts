export class OrderReview 
{
    constructor(
        public id: number,
        public star:number,
        public comment:string,
        public created:Date
    ){}
}
