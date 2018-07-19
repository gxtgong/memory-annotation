var fs = require('fs');

var video = {};
/* Split version
fs.readdir("./videodataset/mp4", function(err, files){
    if (err) throw err;
    console.log("MP4 Files Read")
    video.mp4 = files;
    fs.writeFile('video.json', JSON.stringify(video), function(err){
        if (err) throw err;
        console.log("MP4 Files Written");
    });
});

fs.readdir("./videodataset/webm", function(err, files){
    if (err) throw err;
    console.log("Webm Files Read")
    video.webm = files;
    fs.writeFile('video.json', JSON.stringify(video), function(err){
        if (err) throw err;
        console.log("Webm Files Written");
    });
});

console.log("Reading Files...")
*/

fs.readdir("./videodataset", function(err, files){
    if (err) throw err;
    console.log("Files Read")
    video.nameArray = files;
    fs.writeFile('video.json', JSON.stringify(video), function(err){
        if (err) throw err;
        console.log("Files Written");
    });
});
