// Ianco Rodríguez 

class Donante {
	constructor(nombre, direccion, telefono){
		this.nombre=nombre;
		this.direccion=direccion;
		this.telefono=telefono;
		this.cantidadDonaciones=0;
	}

	toString(){
		return this.nombre + " (" + this.direccion + ", " + this.telefono + ")"
	}

};

class Donación {
	constructor(donante, modo, monto, comentario){
		this.donante=donante;
		this.modo=modo;
		this.monto=monto;
		this.comentario=comentario;
	}

}


class Sistema {
	constructor(){
		this.listaDonantes=[];
		this.listaPersonas=[];
	}

	agregarPersona(item){
		this.listaPersonas.push(item);
	}

	agregarDonacion(item){
		this.listaDonantes.push(item);
	}

	devolverListaPersonas(){
		return this.listaPersonas;
	}

	devolverListaDonaciones(){
		return this.listaDonantes;
	}

	existePersona(nombre){
		let existe = false;
		for (const elemento of this.devolverListaPersonas()) {
			if (elemento.nombre == nombre) {
				existe=true;
			}			
		}
		return existe;
	}

	orderarPorNombre(){
		this.listaDonantes.sort(function (a,b) {return a.donante.localeCompare(b.donante);})
	}

	ordenarPorNumero(){
		this.listaDonantes.sort(function (a,b) {return (b.monto)-(a.monto);})
	}
}





function inicio(){
	document.getElementById("idConsulta").addEventListener("click", consulta);
	}
	
	
