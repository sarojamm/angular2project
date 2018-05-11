export class TaskModel {
  ldgPrdDescYrNo: number;
  tsdId: number;
  fltrId: number;
  fltrTypId: number;
  tsdNam: string;


  constructor(year : number, tsdid:number, fltrid:number,fltrtypid:number, nam: string ) {
    this.ldgPrdDescYrNo = year;
    this.tsdId = tsdid;
    this.fltrId= fltrid;
    this.tsdNam = nam;
    this.fltrTypId= fltrtypid;
  }
  // printObj(){
  //   console.log(" ldgPrdDescYrNo : " + this.ldgPrdDescYrNo +" tsdId : " + this.tsdId
  //   + " fltrId : " + this.fltrId + " fltrtypId : " + this.fltrTypId + " tsdName : " + this.tsdNam);
  // }

}
