import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  num: number = 1;

  constructor() {
  }

  public pieChartColors: any[] = [{ backgroundColor: ["#f44336", "#3f51b5", "#ffeb3b", "#4caf50", "#2196f"] }];
  public pieOptions:any = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };
  public pieChartLabels:string[] = ['MS Word', 'Typing', 'Sage Pastel'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

}
