export class TaskSetModel {
  ldgPrdDescYrNo: number;
  oun: string;
  tsdNam: string;


  constructor(year : number,   nam: string, oun: string ) {
    this.ldgPrdDescYrNo = year;
    this.tsdNam = nam;
    this.oun = oun;
  }
  // printObj(){
  //   console.log(" ldgPrdDescYrNo : " + this.ldgPrdDescYrNo +" tsdId : " + this.tsdId
  //   + " fltrId : " + this.fltrId + " fltrtypId : " + this.fltrTypId + " tsdName : " + this.tsdNam);
  // }

}
