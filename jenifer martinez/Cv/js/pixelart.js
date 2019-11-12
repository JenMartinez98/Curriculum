var myPixelDraw = {
  colorPicked: 0,
  cellColor: "#ecf0f1",
  defaultCells: 30,
  coloring: false,
  fns: {
    calcSize: function(cantLado) {
      if(cantLado === undefined) {
        cantLado = myPixelDraw.defaultCells;
      }

      var totalCuadrados= cantLado * cantLado;

      myPixelDraw.container.empty();

      for (var i = 0; i < totalCuadrados; i++) {
        var nuevaCelda = $("<div class='cell' draggable></div>");
        myPixelDraw.container.append(nuevaCelda);
      }

      var nuevaMedida = myPixelDraw.container.width() / cantLado;

      $('.cell').css({
        width: nuevaMedida,
        height: nuevaMedida,
        'background-color': myPixelDraw.cellColor
      });
      
    },
    reSize: function() {
      var self = this;

      $("#sizeit").click(function() {
       var newSize= $("#size-input").val();

       if (newSize > 0 && newSize <=50) {
         
         self.calcSize(newSize);

       }else{

          alert("Por favor ingrese un numero entre 1 y 50");
       }

       });
      
    },


    detectMouseUp: function() {
      
      $(document).mouseup(function(){
        
        myPixelDraw.coloring=false;
      });
    },


    colorPalette: function() {

      $("#color-picker > div").each(function(){

         var div= $(this);

         var color=div.attr("class");
          
          div.css({
            'background-color': color
          })

      })

      
    },
    pickColor: function() {
      
      $("#color-picker > div").click(function(){
        
        myPixelDraw.colorPicked= $(this).attr("class");

      })

    },


    colorIt: function() {

      myPixelDraw.container.on("mousedown", '.cell',function(e){
       e.preventDefault();
       myPixelDraw.coloring=true;

       if (e.button === 0) {
        var colorAUSar= myPixelDraw.colorPicked;
       }else{
        var colorAUSar=myPixelDraw.cellColor;
       }

       var div= $(this);
       myPixelDraw.dragColor=colorAUSar;

       div.css({
         
         'background-color': colorAUSar

       })

      });
    },
    colorOnDrag: function() {
      
      myPixelDraw.container.on("mouseenter",".cell",function(){
       if (myPixelDraw.coloring) {
         $(this).css({

            'background-color': myPixelDraw.dragColor
         })
       }

      });
    },
    reset: function() {

      $("#reset").click(function(){
        $(".cell").css({
          'background-color': myPixelDraw.cellColor
        })
      });
    },
    toggleBorders: function() {
      $("#toggle-borders").click(function(){
         $(".cell").toggleClass("no-border");
      })
    },
    disableRightClick: function() {
      myPixelDraw.container.contextmenu(function(){
        return false;
      })
    },
    grabImage: function() {
     $("#save").click(function(){
      html2canvas(document.getElementById('container'),{
       onrendered: function(canvas){
         document.getElementById('images').appendChild(canvas);
       }

      });

     });

    }

  },

  init: function(container) {
    this.container = container;
    var fns = this.fns;
    var keys = Object.keys(fns);

    for (var i = 0; i < keys.length; i++) {
      var functionName = keys[i];
      fns[functionName]();
    }
  }
}


$(document).ready(function() {
  var container = $("#container");
  myPixelDraw.init(container);
})