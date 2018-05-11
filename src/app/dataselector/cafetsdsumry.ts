export class CafeTsdSumry {
  ldgPrdDescYrNo: number;
  tsdId: number;
  fltrTypId: number;
  fltrId: number;
  tsdNam: string;
  constructor(year : number, tsdid:number,fltrTypId : number, fltrId:number  ) {
    this.ldgPrdDescYrNo = year;
    this.tsdId = tsdid;
    this.fltrTypId = fltrTypId;
    this.fltrId = fltrId;
  }

}
