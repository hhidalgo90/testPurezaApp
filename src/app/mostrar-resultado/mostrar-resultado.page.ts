import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //Router de angular para hacer navegacion.
import { Usuario } from '../clases/usuario';
import { Chart } from 'chart.js';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-resultado',
  templateUrl: './mostrar-resultado.page.html',
  styleUrls: ['./mostrar-resultado.page.scss'],
})
export class MostrarResultadoPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  public usuario = new Usuario;
  porcentajePureza = 0;
  nombreUsuario: String;
  descripcion: string;
  
  constructor(public router: Router, public route: ActivatedRoute,  public loadingCtrl: LoadingController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.usuario);
      }      
    });
   }


   ngOnInit() {
    this.mostrarLoading();
    this.analizarRespuestas();
    this.crearGrafico();
    
  }
  async mostrarLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 1000,
      message: "Obteniendo datos"
    });
    loading.dismiss();
    return await loading.present();
  }
  crearGrafico() {
    // this.barChart = new Chart(this.barCanvas.nativeElement, {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         borderColor: [
    //           "rgba(255,99,132,1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["% de maldá", "% de pureza"],
        datasets: [
          {
            label: "# of Votes",
            data: [100 - this.porcentajePureza, this.porcentajePureza],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      }
    });

    //this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    //   type: "line",
    //   data: {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //       {
    //         label: "My First dataset",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: "butt",
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: "miter",
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         spanGaps: false
    //       }
    //     ]
    //   }
    // });
    
  }
  analizarRespuestas() {
    this.porcentajePureza = 90;
    this.nombreUsuario = this.usuario.nombre;
    this.descripcion = "Eres un pervertido csm, hazte ver feo ql";
  }

}