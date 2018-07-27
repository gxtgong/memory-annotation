# Video Annotation Interface

## Usage

The videos to be annotated are put in the subfolder `\videodataset`. Each of them is either `.mp4` or `.webm`.

`video.json` has all names of the video files including the subscripts in one array accessed by the key `nameArray`.

Annotations are saved in json files under the annotator's name. The keys are the video names. (to be implemented)

## Panels
The webpage is splited into three panels.
### Control Panel
List of videos and list of annotators are displayed. Change the current video and the current annotator here.
### Video Panel
The video is displayed with the progress bar showing which part of the video is marked.
### Annotation Panel
Various choices of annotation. Current choices are:
#### Emotion coordinate
#### Punchline marks
#### Tags
- Music
- Juxtaposition
- Pain (to be implemented)
- Laughter (to be implemented)
- Crying (to be implemented)
