(function($) {  //Self Initiating function

//Bulk Product Update	
$("button#bulk-product-update").click( function ( event )
{
	event.preventDefault();
 var textArea = $("textarea#bulk-product-entry").val().split(/\r\n|\r|\n/g),
	 $selector = $("table tbody"); //Selector to append generated content 
	 $selector.empty(); //Removes Previous Content, so that the content is always current
	 
 	 $.each(textArea, function(index){
     if(this.length != null){
       var serialNumber = index + 1,
	   queryText = $.trim(this),
	   db = $.database_fetch(queryText);
	   
   
	   if(db.product_weight){
	   $.generateHTML($selector, serialNumber, queryText, db.product_weight, db.case_config);
	   } else if(!db.product_weight &&  queryText){
	     alert ("Material '"+serialNumber+" - "+queryText+"' does not exist");  
	   }
	 }
    });
	
	 $(textArea).promise().done(function() {
	    $( "table" ).removeClass('hidden');
		$.randomize();
		$.calculate();
    });
	$(textArea).promise().fail(function() {
        alert('Fail');
    });

});


$.generateHTML = function ($selector, serialNumber, queryText, product_weight, case_config){
	
var textHTML = '<tr><td>'+serialNumber+'</td><td class="material-details"><span title="Material ID">'+queryText+'</span><span title="Weight" class="product-weight">'+product_weight+'</span><span class = "case-config" title="Case Config">'+case_config+'</span></td><td><input type="number" class="required-weight"></td><td class="quantity-for-specified-tonnes"></td><td class="number-of-products"></td><td class="total-weight"></td></tr>';

$selector.append(textHTML);
 
}

//Restrict only numbers in input boxes
$("input#total-weight, input.required-weight").keypress(function(event) {
  // Backspace, tab, enter, end, home, left, right, del
  var controlKeys = [8, 9, 13, 35, 36, 37, 39, 46],
     isControlKey = controlKeys.join(",").match(new RegExp(event.which));
  // Some browsers just don't raise events for control keys. Easy.
  // e.g. Safari backspace.
  if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
      (49 <= event.which && event.which <= 57) || // Always 1 through 9
      (48 == event.which &&  ($(this).val() > 0 )) || // No 0 first digit
      isControlKey) { // Opera assigns values for control keys.
    return;
  } else {
    event.preventDefault();
  }
});



//Calculator Function

$.randomBetween = function (minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

$.getRandomInt = function(maximum, count) {
  var randomNumbers = [];
  var currentValue = 0;
  for(i=0; i<count-1; i++) {
     randomNumbers[i] = $.randomBetween(1, maximum-(count-i-1)-currentValue);
     currentValue += randomNumbers[i];
  }
  randomNumbers[count-1] = maximum - currentValue;
    
  return {
    randomNumbers : randomNumbers
  };
  
}
//Randomize Values
$.randomize = function(){
	var maximum =  $("input#total-weight").val();
	    $selector   =  $("td input.required-weight"),
		count = $selector.length;

	var weight = $.getRandomInt(maximum,count);
	
		$.each($selector, function(index){
            $(this).val(weight.randomNumbers[index]);	
	});
}

//Randomize Button Click
$("button#randomize").click( function ( event )
{
    event.preventDefault();
    $.randomize();

});

$.calculate = function(){
	
  var $selectorNumberOfProducts = $("td.number-of-products"),
      $selectorSpecifiedWeight  = $("td input.required-weight"),
      $selectorDefaultWeight    = $("td span.product-weight"),
	  $selectorTotalWeight      = $("td.total-weight"),
	  $selectorCaseConfig       = $("td span.case-config"),
	  $selectorQuantity         = $("td.quantity-for-specified-tonnes"),
	  specifiedTonnes = [],
	  specifiedWeight = [],
	  totalProducts   = [],
	  finalWeight     = 0,
	  defaultWeight   = [],
	  caseConfig      = [];

    $.each($selectorSpecifiedWeight, function(index){
	    specifiedWeight[index] = ($(this).val())*1000000;
  });
  
    $.each($selectorDefaultWeight, function(index){
	    defaultWeight[index] = +($(this).text());
  });  
  
    $.each($selectorCaseConfig, function(index){
	    caseConfig[index] = +($(this).text());
  });
  
  
    $.each($selectorQuantity, function(index){
		var weight = Math.floor(specifiedWeight[index]/defaultWeight[index]);
	    $(this).text(weight);
		specifiedTonnes[index] = weight;
  });  
  
    $.each($selectorNumberOfProducts, function(index){
		var total = Math.floor(specifiedTonnes[index]/caseConfig[index]);
		total *= caseConfig[index];
	    $(this).text(total);
		totalProducts[index] = total;
		
  });  
  
   $.each($selectorTotalWeight, function(index){
		var totalWeight = defaultWeight[index]*totalProducts[index]/1000000;
	    $(this).text(totalWeight.toFixed(3));
		finalWeight += totalWeight; 
  }); 
  
   $selectorTotalWeight.promise().done(function() {
    $("table caption span#final-weight").text(finalWeight.toFixed(3));
  });
  
  
}

//Calculate Button Press
$("button#product-calculator").click( function ( event )
{
    event.preventDefault();
	$.calculate();
	
});

}(jQuery)); //Self Initiating function - END
