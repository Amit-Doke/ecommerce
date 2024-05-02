export class AdminDashInfo 
{
    constructor(
        public profit:number,
        public loss:number,
        public todayProfit:number,
        public todayLoss:number,
        public totalProduct:number,
        public pendingOrder:number,
        public outStockProduct:number,
        public status:number
    ){}
}
