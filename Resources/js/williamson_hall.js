(function($) {  //Self Initiating function

$("input[type=submit]#williamson-hall-calculate").click(function(event){
	  event.preventDefault();
	  var result = $.williamson_hall();
	  $("div#williamson-hall-result span.lattice-strain").text(result['lattice_strain'].toFixed(5) + " nm");
	  $("div#williamson-hall-result span.crystallite-size").text(result['crystallite_size'].toFixed(5) + " nm");
});


$.williamson_hall_table = function(){ 

var corrected_fwhm = [], 
    observed_theta = [],
	y_axis = [],
	x_axis = [];
	

$("table#williamson-hall-table tr").each(function(index, element) {
	
		 corrected_fwhm = [
		                    ($.toRadians($(this).find("input.observed.fwhm").val())) - 
		   				    ($.toRadians($(this).find("input.base-metal.fwhm").val()))
						  ];
			 observed_theta = $.toRadians(($(this).find("input.observed.x-position").val())/2);
			 y_axis = [corrected_fwhm * Math.cos(observed_theta)];
			 x_axis = [4 * Math.sin(observed_theta)];	
			 			 				
             $(this).find("td.corrected-fwhm").text(corrected_fwhm);   
             $(this).find("td.y-axis").text(y_axis);  
			 $(this).find("td.x-axis").text(x_axis);

});

}

$.williamson_hall = function(){ 
   $.williamson_hall_table();
    var length = 0 
	    x_sum = 0,
	    x_mean = 0,
		x_square_sum = 0,
		xy_sum = 0,
		y_sum = 0,
		y_mean = 0,
		numerator = 0,
		denominator = 0,
		slope = 0
		intercept = 0,
		lattice_strain = 0,
		crystallite_size = 0;

   $("td.x-axis").each(function(index, element) {
		  length = index + 1;
	      x_sum += +($(this).text());
		  x = +($(this).text());
		  y = +($(this).parent("tr").find("td.y-axis").text());	
		  x_square_sum += x*x; 
		  xy_sum += x*y;  
	});
	
    $("tr td.y-axis").each(function(index, element) {
	      y_sum += +($(this).text());
	});
	
    
    x_mean = x_sum / length;
	y_mean = y_sum / length;
	
	numerator = (length * xy_sum) - (x_sum * y_sum);
	denominator = (length * x_square_sum)-(x_sum * x_sum);
	
  slope =  numerator / denominator;	

  intercept = y_mean - (slope * x_mean);
   
   var result = {lattice_strain: slope, 
                 crystallite_size: intercept 
				};
   
  return(result); 
}





}(jQuery)); //Self Initiating function - END