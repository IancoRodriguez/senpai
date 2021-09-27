// Ianco Rodríguez
window.addEventListener("load",inicio)

let personas = new Sistema;

let donaciones = new Sistema;

function inicio(){
	document.getElementById("botonAgregarDonante").addEventListener("click", agregarPersona);
    document.getElementById("botonAgregarDonacion").addEventListener("click", registrarDonacion);
	document.getElementById("ordenDecreciente").addEventListener("click", ordenarTablaPorNumero);
	document.getElementById("Creciente").addEventListener("click", ordenarTablaPorNombre);
	document.getElementById("check").addEventListener("click", resaltarFilas);	
}

function agregarPersona(){

	if (document.getElementById("formAgregarPersonas").reportValidity()){

		let nombre = document.getElementById("regNombre").value;

		let direccion = document.getElementById("regDireccion").value;

		let telefono = document.getElementById("regTelefono").value;
		
		if (!personas.existePersona(nombre)) {

			let donante = new Donante(nombre,direccion,telefono);
			personas.agregarPersona(donante);

			document.getElementById("formAgregarPersonas").reset();

			cargarSelectDonantes();

		}
		else {

			alert("Ya existe un donante con ese nombre, ingrese otro. Gracias!");

			nombre = document.getElementById("nombre").focus();

		}
	}
}

function cargarSelectDonantes(){

	let selectDonantes = document.getElementById("SelectDonante");

	selectDonantes.innerHTML="";

	let datos = personas.devolverListaPersonas();

	for (dato of datos){

		let nodoOption = document.createElement("option");

		nodoOption.value = dato;

		let nodoTexto = document.createTextNode(dato.nombre);

		nodoOption.appendChild(nodoTexto);

		selectDonantes.appendChild(nodoOption);
	}
}

var arrayEfectivo = [];
var arrayTransferencia = [];
var arrayCanje = [];
var arrayMercaderia = [];
var arrayCheque=[];
var arrayOtros=[];


function registrarDonacion(){

	if (document.getElementById("formRegistroDonaciones").reportValidity()){

		let comentario = document.getElementById("regComentarios").value;

		let donante = document.getElementById("SelectDonante").value;

		let modo = document.getElementById("selectModo").value;

		let monto = document.getElementById("Monto").value;

		let donacion = new Donación(donante, modo, monto, comentario);
			
		donaciones.agregarDonacion(donacion);

		if (modo =="Efectivo"){

			arrayEfectivo.push(modo);
		}

		if (modo == "Transferencia"){

			arrayTransferencia.push(modo);
		}

		if (modo == "Canje"){

			arrayCanje.push(modo);
		}

		if (modo =="Mercadería"){

			arrayMercaderia.push(modo);
		}

		if (modo =="Cheque"){

			arrayCheque.push(modo);
		}

		if (modo=="Otros"){

			arrayOtros.push(modo);
		}

		escribirTabla();
		totalGeneral();
		cantidadDonaciones();
		promedioDonaciones();
		darMaximoDonantes();
		cargarCantidadGrafica();
		cargarModosGrafica();
		drawChart();

		document.getElementById("formRegistroDonaciones").reset();
		
	}
}

function escribirTabla(){


let tabla = document.getElementById("tablaDonaciones");
	tabla.innerHTML=""
	let tableHead = tabla.createTHead();
	let tableHeadRow = tableHead.insertRow();

let headCelda1 = document.createElement("th");
headCelda1.innerHTML = "Donante";
tableHeadRow.appendChild(headCelda1);
let headCelda2 = document.createElement("th");
headCelda2.innerHTML= "Modo";
tableHeadRow.appendChild(headCelda2);
let headCelda3 = document.createElement("th");
headCelda3.innerHTML= "Monto";
tableHeadRow.appendChild(headCelda3);
let headCelda4 = document.createElement("th");
headCelda4.innerHTML = "Comentario";
tableHeadRow.appendChild(headCelda4);

let valor = document.getElementById("deMonto").value;


let todasDonaciones = donaciones.devolverListaDonaciones();
	for (dato of todasDonaciones) {
		let fila = tabla.insertRow();
		for (key in dato) {

			if (key == "monto"){

				if (dato[key] === valor){

					fila.style.backgroundColor = "yellow"
				}
			}
		
			nodoTexto = document.createTextNode(dato[key]);
			
			let celda = fila.insertCell();

			celda.appendChild(nodoTexto);

			if(key == "donante"){

				toString();
		   }

			if (key == "monto"){

				if (dato[key] > 999){ 
							
					celda.style.color = "red";

				} else {celda.style.color = "green";}
			}		
	    }
    }

}

let montos = [];

function agregar(valor){
	montos.push(valor);
}

function totalGeneral(){

	let monto = parseInt(document.getElementById ("Monto").value);

	agregar(monto);

	document.getElementById("resultado").innerHTML ="Total General" + " $" + sumar();

	document.getElementById("resultado2").innerHTML ="Monto Donación Mayor" + " $" + maximo();
}

function maximo(){
	let max = montos[0];
	for (let i = 1; i < montos.length; i++){
		if (montos[i]>max){
			max = montos[i];
		}
	}
	return max;
}

function sumar(){
	let suma = 0;
	for (let i =0; i < montos.length;i++){
		suma+= montos[i];
	}
	return suma;
}

function cantidadDonaciones(){

	let cantidad = montos.length;

	document.getElementById("CantidadDonaciones").innerHTML = "Cantidad total de donaciones: " + cantidad;

}

function promedioDonaciones(){

	let suma = sumar(montos);

	let cantidad = montos.length;

	let promedio = suma / cantidad;

	let promedioSinDecimal = Math.trunc(promedio);

	document.getElementById("promedioDonacion").innerHTML = "Promedio por donación: " + promedioSinDecimal;

}

function darMaximoDonantes(){

	let max=Number.MIN_SAFE_INTEGER;
	let todasDonaciones = donaciones.devolverListaDonaciones();
	let donantes = personas.devolverListaPersonas();

	var maximosDonantes=[];

	for (donante of donantes){

	veces=0;		

		for (donacion of todasDonaciones){

			if (donante == donacion.donante){

				veces ++
				donante.cantidadDonaciones = veces;
		}

	}
		if (veces > max){

            max = veces;       
       }
	
 }
 
 	for (donante of personas.devolverListaPersonas()){

		if (donante.cantidadDonaciones == max){

			maximosDonantes.push(donante.nombre)

		}
	 } 

	 if (maximosDonantes.length > 1){

		let listaDonanteMasVeces=document.getElementById("listaDonanteMasVeces");
		listaDonanteMasVeces.hidden = false;

		let donanteMasVeces=document.getElementById("DonanteMasVeces");
		donanteMasVeces.hidden = true;

		let listaDonanteMasVeces2=document.getElementById("listaDonanteMasVeces2");
		listaDonanteMasVeces2.hidden = false;
		document.getElementById("listaDonanteMasVeces2").innerHTML="Los donantes que más veces donaron son: ";
	

		let lista = document.getElementById("listaDonanteMasVeces");
		lista.innerHTML="";
		let datos = maximosDonantes;
		for (dato of datos){
			let nodoLi = document.createElement("li");
			let nodoTexto = document.createTextNode(dato);
			nodoLi.appendChild(nodoTexto);
			lista.appendChild(nodoLi);
		}
	 } else {

		let donanteMasVeces=document.getElementById("DonanteMasVeces");
		donanteMasVeces.hidden = false;

		let listaDonanteMasVeces=document.getElementById("listaDonanteMasVeces");
		listaDonanteMasVeces.hidden = true;

		let listaDonanteMasVeces2=document.getElementById("listaDonanteMasVeces2");
		listaDonanteMasVeces2.hidden = true;

		document.getElementById("DonanteMasVeces").innerHTML = "El donante que más veces donó fue: " + maximosDonantes[0];
		
	 }	
	
}

function ordenarTablaPorNumero(){
	donaciones.ordenarPorNumero();
	escribirTabla();
}

function ordenarTablaPorNombre(){
	donaciones.orderarPorNombre();
	escribirTabla();
}

function resaltarFilas(){

	escribirTabla();

}

var modos = [""];

function cargarModosGrafica(){

	let modo = document.getElementById ("selectModo").value;

	if (!modos.includes(modo)){

		modos.push(modo);
	}

	return (modos)
}

var cantidades = [""];

function cargarCantidadGrafica(){

	if (arrayEfectivo.length>0){

		cantidades =[];
		cantidades.push(arrayEfectivo.length);
	}

	if (arrayTransferencia.length>0){

		cantidades =[];
		cantidades.push(arrayTransferencia.length);
	}

	if (arrayCanje.length>0){

		cantidades =[];
		cantidades.push(arrayCanje.length);
	}

	if (arrayMercaderia.length>0){

		cantidades =[];
		cantidades.push(arrayMercaderia.length);
	}

	if (arrayCheque.length>0){

		cantidades =[];
		cantidades.push(arrayCheque.length);
	}

	if (arrayOtros.length>0){

		cantidades =[];
		cantidades.push(arrayOtros.length);
	}
	
	return (cantidades);
}	