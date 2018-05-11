export class CafeTsdUser {
  ldgPrdDescYrNo: number;
  tsdId: number;
  perIntrNo: number;
  oun: string;
  constructor(year : number, tsdid:number,perIntrNo : number, oun:string  ) {
    this.ldgPrdDescYrNo = year;
    this.tsdId = tsdid;
    this.perIntrNo = perIntrNo;
    this.oun = oun;
  }


}
