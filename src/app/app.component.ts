import { DecimalPipe } from '@angular/common';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DecimalPipe],
})
export class AppComponent {
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

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
  getLegendCallback = (function (self) {
    function handle(chart) {
      return chart.legend.legendItems;
    }

    return function (chart) {
      return handle(chart);
    };
  })(this);

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      legendCallback: this.getLegendCallback,
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
      hidden: false,
    },
    {
      label: 'Approved Cost',
      data: [
        30030000, 40097384.52, 13440000, 9120001.2, 7081102.8, 7014000, 6816000,
        5647241.6400000015, 5143398.600000001, 4811760,
      ],
      stack: 'b',
      hidden: false,
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

  onSelect(indexItem): void {
    const ci = this.baseChart;
    if (this.barChartData[indexItem].hidden === false) {
      this.barChartData[indexItem].hidden = true;
    } else {
      this.barChartData[indexItem].hidden = false;
    }
    ci.update();

    /** If every dataset's `hidden` key is `true`, re-assign all `hidden` keys with value of `false` */
    if (this.barChartData.every((dataset) => dataset.hidden === true)) {
      this.barChartData.map((eachDataset) =>
        Object.assign(eachDataset, { hidden: false })
      );
      ci.update();
    }
  }
}
