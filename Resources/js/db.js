(function($) {  //Self Initiating function
	
var db = Ti.Database.openFile(Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDirectory( ),'Resources/database/database.db'));	

//Database function to get product weight and case config for give material id
$.database_fetch = function (material_id){	

var product = db.execute("SELECT WEIGHT, CASE_CONFIG FROM PRODUCTS WHERE MATERIAL='"+material_id+"'"); //Executing sql query



if (product.isValidRow( ))
   {
	   return {
	product_weight : product.fieldByName('WEIGHT').toFixed(3), //Right : Local Variable Name 
 	case_config : product.fieldByName('CASE_CONFIG')        //Left : Global Variable Name to be used in other functions
       };
    } else {
	   return {
    product_weight : null
       };
	}
}
	
}(jQuery)); //Self Initiating function - END