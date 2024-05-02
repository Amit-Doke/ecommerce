export class AdminProduct {
	nameFlag:boolean=false;
	quantityFlag:boolean=false;
	priceFlag:boolean=false;
	discountFlag:boolean=false;
	descriptionFlag:boolean=false;
	urlFlag:boolean=false;
	categoryFlag:boolean=false;
	brandFlag:boolean=false;
	sizeNameFlag:boolean=false;
	colorFlag:boolean=false;
	costPriceFlag:boolean=false;

	constructor(
	public id: number,
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
	){}
    
}
