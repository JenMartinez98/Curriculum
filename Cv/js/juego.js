var juego = {
   filas: [[],[],[]],
   espacioVacio:{
   	fila: 2,
   	columna: 2
   },

   filasOriginales : [[],[],[]],


   crearPieza: function(numeroPieza,fila,columna) {
		var nuevaPieza=$('<div>');
		nuevaPieza.addClass('pieza');

		nuevaPieza.css({
		   backgroundImage: 'url(img/' + numeroPieza + '.jpg)',
		   top: fila*200,
		   left: columna* 200
		});
			
	  this.tablero.append(nuevaPieza);
	  this.filas[fila][columna]=nuevaPieza;
    this.filasOriginales[fila][columna]=nuevaPieza;
	},

	agregarTodasLasPiezas: function() {
		var counter=1;

		for (var fila = 0; fila< 3; fila++) {
			for (var columna = 0; columna< 3; columna ++) {
				if (this.espacioVacio.fila === fila && this.espacioVacio.columna === columna) {
					this.filas[fila][columna] = null;
          this.filasOriginales[fila][columna] = null;
				} else {
					var pieza = this.crearPieza(counter,fila,columna);
					counter++;
				}
			}
		}
	},

	escucharTeclado: function() {
		// 37 => izq
		// 38 => arr
		// 39 => der
		// 40 => aba
		var that = this;
    $(document).keydown(function(evento){
      switch(evento.keyCode){
        case 37:
        that.moverHaciaLaIzquierda();
        break;
        case 38:
        that.moverHaciaArriba();
        break;
        case 39:
        that.moverHaciaLaDerecha();
        break;
        case 40:
        that.moverHaciaAbajo();
        break;
      }
      console.log("hola");
      if(that.jugadorGano()) {
        setTimeout(function() {
          alert("Ganaste");
        }, 150);
      }
      });
	},


	intercambiarPosicionConEspacioVacio: function(fila,columna){
         var esValida = fila < 3 && fila >= 0 && columna < 3 && columna >= 0;
         if (esValida) {
            var ficha= this.filas[fila][columna];
            this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
            this.guardarEspacioVacio(fila,columna);
         }
    },
	 moverFichaFilaColumna: function(ficha,fila,columna){
    	this.filas[fila][columna]=ficha;
    	ficha.css({
           top : fila*200,
           left : columna*200
    	});
    },

    guardarEspacioVacio: function(fila,columna){
    	this.espacioVacio.fila= fila;
    	this.espacioVacio.columna= columna;
    	this.filas[fila][columna]=null;
    },

	moverHaciaLaIzquierda: function() { 
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna+1;
		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
	},

	moverHaciaLaDerecha:function(){
        var filaOrigen=this.espacioVacio.fila;
        var columnaOrigen=this.espacioVacio.columna-1;
        this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
     },
    
     moverHaciaAbajo:function(){
       var filaOrigen=this.espacioVacio.fila-1;
       var columnaOrigen=this.espacioVacio.columna;
       this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
     },
  
     moverHaciaArriba:function(){
       var filaOrigen=this.espacioVacio.fila+1;
       var columnaOrigen=this.espacioVacio.columna;
       this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
},

mezclar: function(cantidadDeMovimientos){
  for (var i = 0; i < cantidadDeMovimientos ; i++) {
    var direccion= Math.floor(Math.random()*4); // 0,1,2,3
    if (direccion===0) {
      this.moverHaciaArriba();
    }
    if (direccion===1) {
      this.moverHaciaAbajo();
    }
    if (direccion===2) {
      this.moverHaciaLaIzquierda();
    }
    if (direccion===3) {
      this.moverHaciaLaDerecha();
    }
  }
    
},

jugadorGano: function(){
  for (var filaActual = 0; filaActual < 3; filaActual ++) {
    for (var columnaActual = 0; columnaActual < 3 ; columnaActual ++) {
          if ( this.filas[filaActual][columnaActual]!== this.filasOriginales[filaActual][columnaActual] ) {
            return false;
          }
       }

   }
   return true;
},

  iniciar:function(tablero){
  	this.tablero = tablero;
  	this.agregarTodasLasPiezas();
  	this.escucharTeclado();
    var self = this;
    setTimeout(function() {
      self.mezclar(1000);
    }, 100)
  }
};

$(document).ready(function (){
	var tablero = $('#juego');
	juego.iniciar(tablero);
});



