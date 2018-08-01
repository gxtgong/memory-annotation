var videoNames = {};

var annotation = {};

var vidDOM = document.getElementById('vid');

var videosrc = null;

var intervals = [];

var tags = {};

var booPL = false;

var plStart = null;

var emotion = null;

var complete = false;

$.getJSON('video.json', function(data){

    console.log("video.json Read");
    videoNames = data;
    for (let vn of videoNames.nameArray) {
        $('#list-video').append('<a href="#" class="list-group-item list-group-item-action" id="'+vn+'" >'+vn+'</a>');
    }
    applyAnnotationOf("candice");
    annotation["annotator"] = "candice";
    // load video 
    $("a").click(function(){
        //save last info
        if (videosrc != null) {
            annotation[videosrc] = {};
            annotation[videosrc]["intervals"] = intervals;
            annotation[videosrc]["tags"] = tags;
            annotation[videosrc]["complete"] = complete;
            

        }

        //load video src
        videosrc = $(this).html();
        console.log(videosrc);
        $("video").attr('src', 'videodataset/'+videosrc);

        //after video is loaded, add eventlistener
        vidDOM.addEventListener('loadedmetadata', function(){
            //console duration
            console.log(vidDOM.duration);
            //retrieve previous annoatation
            if (videosrc in annotation) {
                intervals = annotation[videosrc]["intervals"];
                tags = annotation[videosrc]["tags"];
                emotion = annotation[videosrc]["emotion"];
            }else{
                console.log("new video");
                intervals = [[0,vidDOM.duration]];
                tags = {};
                emotion = [];
            }
            document.getElementById("test-pl").innerHTML = intervals.toString();
        });

        //turn off pl button
        booPL = false;
        document.getElementById("btn-pl").classList.remove("btn-warning");
        document.getElementById("btn-pl").classList.add("btn-success");
        document.getElementById("btn-pl").innerHTML = "Punchline Off";
        plStart = null;

        //apply changes to annotation interface
        applyTags();
        if (emotion == null || emotion[0] == null) {
            $("#test-emo").html("Emotion: ");
        }else{
            $("#test-emo").html("Emotion: ("+emotion[0]+" "+emotion[1]+")");
        }

        document.getElementById("div-vid-ano").classList.remove("d-none");
    });
});

function applyTags() {
    $(".list-group button").each(function(){
        tag = this.innerHTML;
        if (tags[tag]) {
            this.classList.add("active");
        }else{
            this.classList.remove("active");
        }
    })
}

function applyAnnotationOf(name) { // apply annotation to the list of names (not a particular video)
    $.getJSON(name+'.json', function(data){
        console.log(name+'.json Read');
        console.log(JSON.stringify(data));
        annotation = data;
        for (var vn in data) {
            if (vn !== "annotator") {
                if (data[vn]["complete"]) {
                    document.getElementById(vn).classList.add("list-group-item-success");
                } else {
                    document.getElementById(vn).classList.add("list-group-item-warning");
                }
            }
        }
    });
}


$(document).ready(function(){
    // append tag functions
    $(".list-group button").click(function(){
        var tag = this.innerHTML;
        if (tags[tag]) {
            tags[tag] = false;
        }else{
            tags[tag] = true;
        }
        applyTags();
    });

    // punchline button
    $("#btn-pl").click(function(){
        //get vid time
        var t = vidDOM.currentTime;
        //change button appearance
        var cl = this.classList;
        // turn on
        if (!booPL) {
            booPL = true;
            plStart = t;
            cl.remove("btn-success");
            cl.add("btn-warning");
            this.innerHTML = "Punchline On";
        }else{
            booPL = false;
            cl.remove("btn-warning");
            cl.add("btn-success");
            this.innerHTML = "Punchline Off";
            plStart = null;
        }
    });
    $("#btn-clear").click(function(){
        intervals = [[0,vidDOM.duration]];
        intervalsToBars();
    })

    // img for emo
    $("img").click(function(e){
        var xPos = e.pageX - $("img").offset().left;
        var yPos = e.pageY - $("img").offset().top;
        $("#test-emo").html("Emotion: ("+xPos+" "+yPos+")");
        emotion = [xPos, yPos];
        console.log("Emotion: ("+xPos+" "+yPos+")");
    });
    // playing
    $("video").on("timeupdate", function(event){
        //var wid = parseInt(this.currentTime/this.duration*100) + "\%";
        //document.getElementById("pbar-played").style.width = wid;
        //$("#test").html(this.currentTime+" width: "+wid);
        updateIntervals(plStart, this.currentTime);
        intervalsToBars();
        $("#test-pl").html(intervals.toString());
    });

    $("#file-save").click(function(e){
        $.post(annotation.annotator+'.json', JSON.stringify(annotation, null, 4), function(data, status){
            console.log("Data: "+ data + " Status: " + status);
        });
    })
});

var annoName = $('input[name="annotator"]:checked').val();
console.log("annotator"+annoName);

function updateIntervals(start, end){
    if (booPL) {
        var i = 0;
        var j = 0;
        var prev = 0;
        var aft = 0;
        while (i < intervals.length) {
            [a, b] = intervals[i];
            if ((start <= b && start >= a)||(start < a && start > prev)) {
                j = i;
                if (start >= a){
                    prev = a;
                }else{
                    aft = prev;
                    prev = null;
                }
                while (j < intervals.length) {
                    [c, d] = intervals[j];
                    if ((end <= d && end >= c)||(end < c && end > aft)) {
                        if (end >= c) {
                            aft = d;
                        }else{
                            aft = null;
                        }
                        break;
                    }else{
                        j ++;
                        aft = d;
                    }
                }
                break;
            }else{
                i ++;
                prev = b;
            }
        }
        if (prev==null){
            if (aft==null){
                intervals.splice(i, j-i);
            }else{
                intervals.splice(i, j-i+1, [end, aft]);
            }
        }else{
            if (aft==null){
                intervals.splice(i, j-i, [prev, start]);
            }else{
                intervals.splice(i, j-i+1, [prev, start], [end, aft]);
            }
        }
    }
}

function intervalsToBars(){
    var bars = [];
    var d = vidDOM.duration;
    var last;
    var result = "";
    for (var index in intervals) {
        [a,b] = [parseInt(intervals[index][0]/d*100), parseInt(intervals[index][1]/d*100)];
        bars[index] = [a,b]
        if (index > 0) {
            result += getBarHTML(a-last, "bg-warning")
        }
        result += getBarHTML(b-a, "bg-success");
        last = b;
    }
    $(".progress").html(result);
}

function getBarHTML(percent, barType){
    //bg-success for green/off
    //bg-warning for yellow/on
    return '<div class="progress-bar '+ barType +'" role="progressbar" style="width: '+percent+'%" id="pbar-played"></div>'
}
