var scrolled=0;
function main(){
var divId = "slideShowImages";
var tiempo = 3000;
var fade = 40;
var slideShowId = null;
var fadeActiveSlidesID = null;
var divObj = (document.getElementById(divId) ? document.getElementById(divId) : null);
//verificar que no sea null
var imgs = (divObj.querySelectorAll('img') ? divObj.querySelectorAll('img') : []);

var _anchoMax=anchoMax();
var _altoMax=altoMax();
var index = 0;
console.log("altoMax: "+_altoMax+"; anchoMax"+_anchoMax);

//Cosas de estilo del div
 divObj.style.position = "relative";
 divObj.style.overflow = "hidden"; // This is just a safety thing.
 divObj.style.width = _anchoMax + "px";
 divObj.style.height = _altoMax + "px";

 //Cosas de estilo de las imagenes
  var tam = imgs.length;

    for (var i = 0; i < tam; i++) { 
      imgs[i].style.opacity = 0;
      imgs[i].style.position = "absolute";
      //Para que este en el centro
      imgs[i].style.top = (_altoMax - imgs[i].getBoundingClientRect().height) / 2 + "px";  
      imgs[i].style.left = (_anchoMax - imgs[i].getBoundingClientRect().width) / 2 + "px"; 

      }

 //Poner primera imagen visible
 imgs[0].style.opacity = 1;
  startSlideShow();







//-----------------------------------------------------------------------


function startSlideShow() {
    slideShowID = setInterval(transition, tiempo);                
  }

function haltSlideShow() {
  clearInterval(slideShowID);   
}

function transition(){
  var currentSlide = imgs[index];

  ++(index);
  if (index >= imgs.length) {
  index = 0;
  }

 var nextSlide = imgs[index];

  var currentSlideOpacity = 1;
  var nextSlideOpacity = 0;
  var opacityLevelIncrement = 1 / fade;
  var fadeActiveSlidesID = setInterval(fadeActiveSlides, fade);
    
    function fadeActiveSlides() {
      currentSlideOpacity -= opacityLevelIncrement;
      nextSlideOpacity += opacityLevelIncrement;
      
      
      if (currentSlideOpacity >= 0 && nextSlideOpacity <= 1) {
        currentSlide.style.opacity = currentSlideOpacity;
        nextSlide.style.opacity = nextSlideOpacity; 
      }
      else {
        currentSlide.style.opacity = 0;
        nextSlide.style.opacity = 1; 
        clearInterval(fadeActiveSlidesID);
      }        
    } 
}

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
  return imgs[maxPos].getBoundingClientRect().width;
}

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



	$(".descripcion").hide();
	 function goToByScroll(id){
    id = id.replace("link", "");
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top-60},
        'slow');
}

$(".options > a").click(function(e) { 
    e.preventDefault(); 
    goToByScroll(this.id);           
});
$("li > a").click(function(e) { 
    e.preventDefault(); 
    goToByScroll(this.id);           
});
$('.btn-info').on('click', function() {
    $(this).next().slideToggle(400);
    $(this).toggleClass('active');
    $(this).text("Visto");
      
  });
$('.navbar-nav>li>a').on('click', function() {
	'use strict';
	$('.navbar-collapse').collapse('hide');
});
}
$(document).ready(main);

