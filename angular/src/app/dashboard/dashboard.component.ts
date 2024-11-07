import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirstServiceService } from '../service/first-service.service';
import {
  ApexResponsive,
  ApexFill,
  ApexLegend,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexStroke,
  ApexXAxis,
  ApexTooltip,


} from 'ng-apexcharts';
import { Dayjs } from 'dayjs';

export type barChart = {
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
maxDate: any;
selected!: {startDate: Dayjs, endDate: Dayjs};setStartDate() {
throw new Error('Method not implemented.');
}
  dashboard: any = {
    value: {
      most_active_user: { client_names: '' },
      avg_days_to_settle_claim_of_all_products: 0,
      claims_inspections_initiated: 0,
      claims_inspections_completed: 0,
      claims_inspections_in_progress: 0,
      total_users: 0
    }
  }
  donut: any = {};
  barChart: any = {};
  columnChart: any = {};
  basicBarChart: any = {};
  topUsers: any = {};
  mixChart: any = {};
  selectedDateRange:any;

  @ViewChild("chart") chart: DashboardComponent | undefined;
data: any;
minDate: any;


  ngOnInit(): void {
    this.userDetail.getTaskDistribution().subscribe((response: any) => {
      console.log(response.value);
      this.donut.series = response.value.series;
      this.donut.labels = response.value.labels;
      this.donut.colors = response.value.colors;
      this.donut.total_tasks = response.value.total_tasks;
    });

    this.userDetail.getComposition().subscribe((response: any) => {
      console.log(response.value);
      let data = response.value.map((product: any) => ({
        x: product.product_name,
        y: product.total_initiated,
        z:product.percentage
      
      }));
        this.barChart.colors = response.value[0].color

      this.barChart.series = [  
        {
          name: "Product",
          data: data,

        }
      ];
      // Column Chart
      this.userDetail.getColumnChart().subscribe((response: any) => {
        this.columnChart.series = response.value.series;
        this.columnChart.xaxis.categories = response.value.categories;
        // this.columnChart.xaxis?.categories.map(response.value.categories)
      });


      // Basic Bar Chart
      this.userDetail.getSettledClaim().subscribe((response: any) => {
        if (response) {
          for (let i = 0; i <response.value.length; i++) {
            this.basicBarChart.xaxis?.categories.push(response.value[i].product_name);
            this.basicBarChart.series[0].data.push(response.value[i].data[0]);
          }
          this.basicBarChart.xaxis.categories=response.value.categories
        }
      });

      // Top  Users
      this.userDetail.getTopUserByActivity().subscribe((res: any) => {
        if (res) {
          for (let i = 0; i < res.value.length; i++) {
            this.topUsers.series[0].data = res.value[0].data
            this.topUsers.xaxis.categories = res.value[i].user_name
          }
        }
      })

      // Monthly Revenue
      this.userDetail.getMonthlyRevenue().subscribe((response: any) => {
        console.log(response);
        if (response) {
          this.mixChart.yaxis.title.text = response.value.name
          this.mixChart.series.data = response.value.months


        }
      })
    });
  }

  // Constructor with Dashboard Data Initialization
  constructor(private route: Router, private userDetail: FirstServiceService) {
    this.userDetail.setDashboardData(this.dashboard).subscribe((response: any) => {
      this.dashboard = response;
    });

    // Initialize donut Chart
    this.donut = {
      series: [45, 55, 78, 45],
      chart: {
        width: 450,
        type: "donut",
        show: true,
        total: {
          showAlways: true,
          show: true
        }
      },
      plotOptions:{
        pie:{
          donut:{
            labels:{
              show:true,
              total_tasks:{
                show:true,
                showAlways:true
              }
            }
        }
        }

      },
      dataLabels: {
        enabled: true
      },
      labels: {
        enabled:true

      },
      fill: {
        type: "solid gradient"
      },
      colors:[],
      
      responsive: [
        {
          // breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    // Initialize Bar Chart
    this.barChart = {
      series: [
        {
          data: [],
          percentage:[ ]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          labels:{
            show:true,
            showAlways:true
          }
        }
      },
      labels: {
        enabled:true,
        position:top

      },
      colors: [],

      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: []
      }
    };

    // Initialize Column Chart
    this.columnChart = {
      series: [
        {
          name: "Net Profit",
          data: []
        },
        {
          name: "Revenue",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          // columnWidth: "55%",
          endingShape: "rounded",
          dataLabels: {
            enabled: true,
            position:"top"
          },
        }
      },
      
      xaxis: {
        categories:[]
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "bottom",
        enabled: true
      }
    };

    // Initialize Basic Bar Chart
    this.basicBarChart = {
      series: [
        {
          data: [],
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: [],
      dataLabels: {
        enabled: true,
        position: "end"
      },
      xaxis: {
        categories: []
      },
      legend: {
        enabled: false
      }
    };

    // Initialize Top Users Chart
    this.topUsers = {
      series: [
        {
          data: [],
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        position: "end"
      },
      xaxis: {
        categories: []
      },
      legend: {
        enabled: false
      }
    };

    // Initialize Mixed Chart
    this.mixChart = {
      chart: {
        type: 'bar',
        height: 350
      },
      series: [
        {
          data: [0, 0, 0, 0, 0, 0, 0, 2, 34, 0, 0, 0]
        },
      ],
      stroke: {
        width: [0, 4]
      },
      title: {
        text: 'Monthly Overview'
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"

        ]
      },
      yaxis:
      {
        title: {
          text: ''
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          dataLabels: {
            enabled: true,
            position:"top"
          },
        }
      },
      
      tooltip: {
        shared: true,
        intersect: false
      },
      markers: {
        size: [0, 6]
      }
    };
  }




  onDateRangeChange(range: { startDate: any, endDate: any }) {
    this.selectedDateRange = range;
    console.log('Selected Date Range:', this.selectedDateRange);
    // Logic to update chart data based on selected date range
  }


  // Update Chart Data Method
  updateChartData() {
    if (this.dashboard && this.dashboard.chartData) {
      this.donut.series = this.dashboard.chartData; // Assuming dashboard has chartData property
      this.donut.labels = this.dashboard.labels; // Assuming dashboard has labels property
    }
  }

  onRegister() { }

}
