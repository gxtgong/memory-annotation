var videoNames = {};

var annotation = {};

var vidDOM = document.getElementById('vid');

var videosrc;



$.getJSON('video.json', function(data){
	console.log("video.json Read");
	videoNames = data;
	for (let vn of videoNames.nameArray) {
		//console.log(vn);
		if (vn in annotation) {
			if (annotation.vn.complete) {
				$('#list-video').append('<a href="#" class="list-group-item list-group-item-action list-group-item-success">'+vn+'</a>');
			}else{
				$('#list-video').append('<a href="#" class="list-group-item list-group-item-action list-group-item-warning">'+vn+'</a>');
			}
		}else{
			$('#list-video').append('<a href="#" class="list-group-item list-group-item-action">'+vn+'</a>');
		}
	}
	$("a").click(function(){
		videosrc = $(this).html();
		console.log(videosrc);
		$("video").attr('src', 'videodataset/'+videosrc);
		vid.addEventListener('loadedmetadata', function(){
			console.log(vid.duration);
		})
	});
});

$(document).ready(function(){
	$(".list-group button").click(function(){
		var cl = this.classList;
		if (cl.contains("active")) {
			cl.remove("active");
		}else{
			cl.add("active");
		}
	});
	$("img").click(function(e){
        var xPos = e.pageX - $("img").offset().left;
        var yPos = e.pageY - $("img").offset().top;
        $("#test-emo").html("Emotion: ("+xPos+" "+yPos+")");
        console.log("Emotion: ("+xPos+" "+yPos+")");
    });
	$("video").on("timeupdate", function(event){
		var wid = parseInt(this.currentTime/this.duration*100) + "\%";
		document.getElementById("pbar-played").style.width = wid;
		$("#test").html(this.currentTime+" width: "+wid);
	});
});


var annoName = $('input[name="annotator"]:checked').val();
console.log("annotator"+annoName);




/*$.ajax({
    method : "POST",
    url : "save_to_json.php",
    data : {
        json : JSON.stringify(annotation)
    }
});*/

//$.post('save_to_json.php', {json: JSON.stringify(annotation)});
