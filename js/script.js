$(document).ready(function() {


   $('img').draggable({
    cursor: 'move',
		helper: "clone"
		
  });

  $("#forward_drop").droppable({
    drop: function(event, ui) {
			var itemid = $(event.originalEvent.toElement).attr("itemid");
			console.log(itemid);
	  if($("#forward_drop > img").length  < 2){
		  $('#forward_drag >img').each(function() {
				console.log(this);
				var name=$(this).attr("name");
				var source=$(this).attr("src");
			  
			if ($(this).attr("itemid") === itemid) {
				$(this).appendTo("#forward_drop");
			}
				$.ajax({
					url: "https://api.mlab.com/api/1/databases/kidsfantasyleague/collections/imagestoring?apiKey=09e4af24-ebdf-40b1-9a01-ff5b7e2f7179",
		  		data: JSON.stringify( { "image" :source} ),
		  		type: "POST",
					contentType: "application/json",
					success: function(data){
								window.location.href="../views/index.handlebars"
					},
					error: function(xhr,status,err){
								console.log(err);
					}
		 } );

			
		  });
	  }
    }
  });

 $("#rover_drop").droppable({
    drop: function(event, ui) {
      var itemid = $(event.originalEvent.toElement).attr("itemid");
	  if($("#rover_drop > img").length  < 1){
		  $('#rover_drag >img').each(function() {
				console.log(this);
				var name1 = $(this).attr("name");
				console.log(name1);
			if ($(this).attr("itemid") === itemid) {
			  $(this).appendTo("#rover_drop");
			}
		  });
	  }
    }
  });
   $("#backward_drop").droppable({
    drop: function(event, ui) {
      var itemid = $(event.originalEvent.toElement).attr("itemid");
	  if($("#backward_drop > img").length  < 2){
		  $('#backward_drag >img').each(function() {
				console.log(this);
				var name2 = $(this).attr("name");
				console.log(name);
			if ($(this).attr("itemid") === itemid) {
			  $(this).appendTo("#backward_drop");
			}
		  });
	  }
    }
  });
});


