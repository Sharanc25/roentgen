(function($) {  //Self Initiating function

$("input[type=submit]#scherrer_modified_calculate").click(function(event){
	  event.preventDefault();
	  var crystallite_size = $.scherrer_modified();
	  $("div#scherrer-modified-result span.crystallite-size").text(crystallite_size + " nm");
});



$.scherrer_modified_table = function(){ 

var corrected_fwhm = [], 
    observed_theta = [],
	y_axis = [],
	x_axis = [];
	

$("table#modified-scherrer-table tr").each(function(index, element) {
	
		 corrected_fwhm = [
		                    ($.toRadians($(this).find("input.observed.fwhm").val())) - 
		   				    ($.toRadians($(this).find("input.base-metal.fwhm").val()))
						  ];
			 observed_theta = $.toRadians(($(this).find("input.observed.x-position").val())/2);
			 y_axis = [Math.log(corrected_fwhm)];
			 x_axis = [Math.log(1/Math.cos(observed_theta))];	
			 			 				
             $(this).find("td.corrected-fwhm").text(corrected_fwhm);   
             $(this).find("td.y-axis").text(y_axis);  
			 $(this).find("td.x-axis").text(x_axis);

});

}

$.scherrer_modified = function(){ 
   $.scherrer_modified_table();
    var length = 0, 
	    x_sum = 0,
	    x_mean = 0,
		x_square_sum = 0,
		xy_sum = 0,
		y_sum = 0,
		y_mean = 0,
		numerator = 0,
		denominator = 0,
		slope = 0,
	    intercept = 0,
		wavelength = 0.154,
		crystallite_size = 0,
		k = 0.9;

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
  
  crystallite_size = (k * wavelength)/Math.exp(intercept);
  
  return crystallite_size;
}





}(jQuery)); //Self Initiating function - END