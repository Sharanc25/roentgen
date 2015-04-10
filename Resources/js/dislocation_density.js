(function($) {  //Self Initiating function

$("input[type=submit]#dislocation-density-calculate").click(function(event){
	  event.preventDefault();
	  var dislocation_density = $.dislocation_density();
	  $("div#dislocation-density-result span.dislocation-density").text(dislocation_density + "x 10<sup>14</sup>m<sup>-2</sup>");
});

$.dislocation_density = function(){ 
    var c_bar = 0, 
	    a_constant = $("form#dislocation-density-form input#a_constant").val(),
	    b_constant = $("form#dislocation-density-form input#b_constant").val(),
		c_constant = $("form#dislocation-density-form input#c_constant").val(),
		d_constant = $("form#dislocation-density-form input#d_constant").val(),
		c11 = $("form#dislocation-density-form input#c11").val(),
		c12 = $("form#dislocation-density-form input#c12").val(),
		c44 = $("form#dislocation-density-form input#c44").val(),
		A_i = 0,
		fwhm = $("form#dislocation-density-form input#fwhm").val(),
	    d_spacing = 0,
		crystallite_size = 0,
		lattice_parameter = $("form#dislocation-density-form input#lattice-parameter").val(),
		h = $("form#dislocation-density-form input#h").val(), 
		k = $("form#dislocation-density-form input#k").val(),
		l = $("form#dislocation-density-form input#l").val(),
		A = 3.3,
		burgers_vector = 0,
		dislocation_density = 0;

       A_i = (2*c44) / (c11-c12);
	   
	   c_bar = ( a_constant * (1 - Math.exp(-A_i/b_constant)) )+ 
	           ( c_constant * A_i ) + 
			    d_constant;
	   	   
	   burgers_vector = (lattice_parameter / 2 ) * ( Math.sqrt( (h*h)+(k*k)+(l*l) ) );
	   
	   alert(burgers_vector);
	   
	   dislocation_density = ( (2 * A * d_spacing * d_spacing * fwhm * fwhm * crystallite_size * crystallite_size) - (0.9 * 0.9 * 2 * A * d_spacing * d_spacing) ) / (Math.PI * burgers_vector * burgers_vector * c_bar * crystallite_size * crystallite_size)
	   
	  //alert(dislocation_density);
      return dislocation_density;
}





}(jQuery)); //Self Initiating function - END