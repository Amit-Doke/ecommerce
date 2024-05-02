export class Review {
    public stars:number[] = [];
    constructor(
        public star: number,
        public comment: string,
        public created:Date,
        public name:string
    ) {}

}
