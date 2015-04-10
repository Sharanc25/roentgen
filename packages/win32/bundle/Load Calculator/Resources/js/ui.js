(function($) {  //Self Initiating function


var rowCount = 1;
function addMoreRows(frm) {
rowCount ++;
var recRow = '<p id="rowCount'+rowCount+'"><tr><td><input name="" type="text" size="17%"  maxlength="120" /></td><td><input name="" type="text"  maxlength="120" style="margin: 4px 5px 0 5px;"/></td><td><input name="" type="text" maxlength="120" style="margin: 4px 10px 0 0px;"/></td></tr> <a href="javascript:void(0);" onclick="removeRow('+rowCount+');">Delete</a></p>';
$('#addedRows').append(recRow);
}
 
function removeRow(removeNum) {
$('#rowCount'+removeNum).remove();
}






//     * WINDOW HIDE
//     
    $("#windowMinimize").click(function()
    {
        event.preventDefault();
        // From http://developer.appcelerator.com/question/131596/minimize-unminimize-under-windows-7
        // One user found if we follow this magical sequence (max-unmax-min), the
        // window will be responsive after restore. Confirmed on my Win 7
        Ti.UI.getMainWindow().maximize();
        Ti.UI.getMainWindow().unmaximize();
        Ti.UI.getMainWindow().minimize();
    });

    
//    * WINDOW CLOSE
//    


    $("#windowClose").click(function()
    {
        event.preventDefault();
        Ti.UI.getMainWindow().close();
        //system.window.target.hide();
        Ti.App.exit();
    });


    
//     * WINDOW Click And Drag - Refer at the bottom page for cleaner code

 $("#windowTitleBar").mousedown ( function ( event )
    {
     				var target = $( event.target );

		event.preventDefault();
		
        if(!Ti.UI.getMainWindow().isMaximized() && !target.is( "main" ) )
        {
            var diffX = event.pageX;
            var diffY = event.pageY;

            $(document).mousemove ( function ( event )
            {
                event.preventDefault();

                if (event.screenY - diffY < screen.height-100)
                Ti.UI.getMainWindow().moveTo(event.screenX - diffX, event.screenY - diffY);
            });
        }
    });

    $(document).mouseup ( function ( event )
    {
        event.preventDefault();
        $(document).unbind('mousemove');
    });
	


}(jQuery)); //Self Initiating function - END
