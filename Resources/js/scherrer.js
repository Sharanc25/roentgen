(function($) {  //Self Initiating function

$("input[type=submit]#scherrer-calculate").click(function(event){
	  event.preventDefault();
	  var crystallite_size = $.scherrer_calculate();
	  $("div#scherrer-result span").text(crystallite_size.toFixed(5) + " nm");
});

$.scherrer_calculate = function(){ 

  var shape_factor = $("input#shape-factor").val(),
      peak_width = $.toRadians($("input#peak-width").val()),
	  peak_position = $("input#peak-position").val(),
      wavelength = $("#wavelength").val();
	  
      peak_position = Math.cos($.toRadians(peak_position)/2);
	  
     var crystallite_size = (shape_factor * wavelength) / (peak_width * peak_position) ;

     return  crystallite_size;
}

$.toRadians = function (degrees) {
  return degrees * (Math.PI/180) ;
}


}(jQuery)); //Self Initiating function - END