google.charts.load('current', {'packages':['corechart']});
   
   function drawChart() {

    let arrayFinal = [["Modo","Cantidad"]];
      
    for (let i = 0; i < modos.length;i++){

        if (modos [i]=="Efectivo"){

            arrayFinal.push(["Efectivo", arrayEfectivo.length]);
        }

        if (modos [i]=="Transferencia"){

            arrayFinal.push(["Transferencia", arrayTransferencia.length]);
        }

        if (modos [i]=="Canje"){

            arrayFinal.push(["Canje", arrayCanje.length]);
        }

        if (modos [i]=="Mercadería"){

            arrayFinal.push(["Mercadería", arrayMercaderia.length]);
        }

        if (modos [i]=="Cheque"){

            arrayFinal.push(["Cheque", arrayCheque.length]);
        }

        if (modos [i]=="Otros"){

            arrayFinal.push(["Otros", arrayOtros.length]);
        }
    }

    let grafica = document.getElementById("chart_div");

    var data = google.visualization.arrayToDataTable(
        arrayFinal
    );
    
    var options = {'title':'Donaciones por modo',
                    'width':600,
                    'height':400};
                   
    
    var chart = new google.visualization.PieChart(grafica);
    chart.draw(data, options);
 }
