import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-vendor-performance',
  templateUrl: './vendor-performance.component.html',
  styleUrls: ['./vendor-performance.component.css']
})
export class VendorPerformanceComponent implements OnInit {

  constructor() { }

  lineChartData: Chart.ChartDataset[] = [
    {
      label: 'My First dataset',
      fill: false,  
      tension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [100, 500, 300, 1000],
      
    },
  ];
  lineChartLabels: Array<any> = ['1/9', '1/16', '1/23', '1/30', '2/6', '2/13', '2/20', '2/27', '3/6'];
  lineChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        min: 100,
        suggestedMax: 1000,
        ticks: {
          stepSize: 100
        }
      },
    }

  };
  lineChartLegend = false;
  lineChartType:any = 'line';
  inlinePlugin: any;
  textPlugin: any;
  
  ngOnInit() {
    // inline plugin
    this.textPlugin = [{
      id: 'textPlugin',
      beforeDraw(chart: any): any {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        //const text = 'Text Plugin';
        //const textX = Math.round((width - ctx.measureText(text).width) / 2);
        //const textY = height / 2;
        //ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }];

    this.inlinePlugin = this.textPlugin;
  }

}
