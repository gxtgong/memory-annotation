# Video Annotation Interface

## Usage

This interface is built using node.js. To run the interface, run `server.js` using the following command-line argument:
```
$ node server.js
```
The interface will be served at `localhost:3000`.

The videos to be annotated are put in the subfolder `\videodataset`. Each of them is either `.mp4` or `.webm`.

Annotations are saved in json files under the annotator's name. The keys are the video names.

## Panels
The webpage is splited into three panels.
### Control Panel
List of videos and list of annotators are displayed. Change the current video and the current annotator here.
Manually save and load the annotation here. The default annotation loaded is `candice.json`.
### Video Panel
The video is displayed with the progress bar showing which part of the video is marked.
### Annotation Panel
Various choices of annotation. Current choices are:
#### Emotion coordinate
#### Punchline marks
#### Tags
- Music
- Juxtaposition
- Pain
- Laughter
- Crying
