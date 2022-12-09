import { DecimalPipe } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DecimalPipe],
})
export class AppComponent {
  chartColors = [
    {
      backgroundColor: [
        '#DF5413',
        'orange',
        '#73DF13',
        '#73DF13',
        '#73DF13',
        '#73DF13',
        '#73DF13',
        '#73DF13',
        '#73DF13',
        '#73DF13',
      ],
    },
    {
      backgroundColor: 'grey',
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
    },
    scales: {
      xAxes: [
        {
          display: true,
          ticks: {
            // Include a dollar sign in the ticks
            callback: (value, index, ticks) => {
              return '$' + this.decimalPipe.transform(value);
            },
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10,
        },
        formatter: (value, ctx) => {
          return '$' + this.decimalPipe.transform(value);
        },
      },
    },
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    {
      label: 'Actual Cost',
      data: [
        40000000, 3462876.01, 1100000, 1000000, 600000, 0, 0, 0, 191990.65,
        600000,
      ],
      stack: 'a',
    },
    {
      label: 'Approved Cost',
      data: [
        30030000, 40097384.52, 13440000, 9120001.2, 7081102.8, 7014000, 6816000,
        5647241.6400000015, 5143398.600000001, 4811760,
      ],
      stack: 'b',
    },
  ];

  public barChartLabels: string[] = [
    'FMApprove0.1_Var Pro',
    'EAGLE TEXAS SS2 DD - JAN 2022',
    'MD Project',
    'CompNov2022_Pro',
    'LNGC SERI ANGKASA SS3 DD - OCT 2022',
    'IntDemo Project',
    'Demo Project',
    'Smk Project',
    'Train Project',
    'CEO_CumP',
  ];

  decimalPipe: DecimalPipe;

  constructor(private injector: Injector) {
    this.decimalPipe = injector.get<DecimalPipe>(DecimalPipe);
  }
}
