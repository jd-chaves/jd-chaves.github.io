
"use strict";


function main(){
//variable para el scroll
var scrolled=0;
//el id de la galeria
var slideShowId = null;
//el id del div que contiene la galeria
var divId = "slideShowImages";
//tiempo entre cambio de imagenes
var tiempo = 3000;
//fade para la transicion de la galeria
var fade = 40;
//para la transiciond de la galeria
var fadeActiveSlidesID = null;
//el elemento que tiene la galeria
var divObj = (document.getElementById(divId) ? document.getElementById(divId) : null);
//arreglo de imagenes de la galeria
var imgs = (divObj.querySelectorAll('img') ? divObj.querySelectorAll('img') : []);
//valor del ancho de la imagen mas ancha
var _anchoMax=anchoMax();
//valor del alto de la imagen mas alta
var _altoMax=altoMax();
//indice de las imagenes
var index = 0;

//Cosas de estilo del div
//posicion relativa al contenedor
 divObj.style.position = "relative";
//si el contenido excede el tamanho del contenedor se esconde
 divObj.style.overflow = "hidden"; 
 //establece el ancho del contenedor de la galeria
 divObj.style.width = _anchoMax + "px";
 //establece el alto del contenedor de la galeria
 divObj.style.height = _altoMax + "px";

 //Cosas de estilo de las imagenes
  var tam = imgs.length;

    for (var i = 0; i < tam; i++) { 
      //esconde la imagen y permite que se superpongan las imagenes
      imgs[i].style.opacity = 0;
      imgs[i].style.position = "absolute";

      //Para que se ubique en el centro
      imgs[i].style.top = (_altoMax - imgs[i].getBoundingClientRect().height) / 2 + "px";  
      imgs[i].style.left = (_anchoMax - imgs[i].getBoundingClientRect().width) / 2 + "px"; 

      }

 //Poner primera imagen visible
 imgs[0].style.opacity = 1;
 //empieza la galeria
 startSlideShow();

//-----------------------------------------------------------------------

//funcion que inicia la galeria
function startSlideShow() {
    slideShowId = setInterval(transition, tiempo);                
  }

//funcion que detiene la galeria
function haltSlideShow() {
  clearInterval(slideShowId);   
}

//funcion de transicion para las imagenes de la galeria
function transition(){
	//ubica la actual y la siguiente imagen
  var currentSlide = imgs[index];

  ++(index);
  if (index >= imgs.length) {
  index = 0;
  }

 var nextSlide = imgs[index];

//variables que deciden como se hace la transicion
  var currentSlideOpacity = 1;
  var nextSlideOpacity = 0;
  var opacityLevelIncrement = 1 / fade;
  //aca se hace la trnasicion, en cada llamado se cambia la opacidad
  var fadeActiveSlidesID = setInterval(fadeActiveSlides, fade);
    

    //funcion usada en la transicion
    function fadeActiveSlides() {
    //disminuye la opacidad de la actual y aumenta la de la siguiente	
      currentSlideOpacity -= opacityLevelIncrement;
      nextSlideOpacity += opacityLevelIncrement;
      
      
      if (currentSlideOpacity >= 0 && nextSlideOpacity <= 1) {
        currentSlide.style.opacity = currentSlideOpacity;
        nextSlide.style.opacity = nextSlideOpacity; 
      }
      //este else detiene los llamados cuando ya termina la transicion
      else {
        currentSlide.style.opacity = 0;
        nextSlide.style.opacity = 1; 
        clearInterval(fadeActiveSlidesID);
      }        
    } 
}

//funcion que determina el ancho de la imagen mas ancha
function anchoMax(){
  var max = 0;
  var maxPos = 0;
  for (var i = 0; i < imgs.length; i++) 
  {
    if (imgs[i].width > max) 
    {
      max = imgs[i].width;
      maxPos = i;
    }
    console.log(imgs[i].width);
  }
  //el getBoundinClientRect() incluye todo el contenedor
  return imgs[maxPos].getBoundingClientRect().width;
}

//funcion usada para determinar el alto de la imagen mas alta
function altoMax(){
  var max = 0;
  var maxPos = 0;
  
  for (var i = 0; i < imgs.length; i++) {
    if (imgs[i].height > max) {
      max = imgs[i].height;
      maxPos = i;
    }
  }
  return imgs[maxPos].getBoundingClientRect().height;
}


	//esconde todas las descripciones
	$(".descripcion").hide();
	//funcion que hace el scroll al elemento con el id que se pasa por parametro
	 function goToByScroll(id){	
	 	//se encuentra el id del elemento
    id = id.replace("link", "");
    //el scroll, se resta 60 para que el menu no aparezca sobre el titulo
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top-60},
        'slow');
}

//cuando se da click se llama al scroll
$(".options > a").click(function(e) { 
    e.preventDefault(); 
    goToByScroll(this.id);           
});
//funcion que cambia el elemento activo del menu principal.
$("li > a").click(function(e) { 
    e.preventDefault(); 
    $(".active").removeClass("active");
    $(this).parent().addClass("active");
    goToByScroll(this.id);           
});
//muestra y esconde la descripcion de los proyectos
$('.btn-info').on('click', function() {
    $(this).next().slideToggle(400);
    $(this).toggleClass('active');
    $(this).text("Visto");
      
  });
//colapsa el menu cuando se da click en uno de sus botones
$('.navbar-nav>li>a').on('click', function() {
	$('.navbar-collapse').collapse('hide');
});
}
$(document).ready(main);

