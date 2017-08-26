/**
 * @requires json.js, jquery-util.js
 */

function getProjectFromURL()
{
     var segments = location.href.split("/");
     var finalSegment = segments[segments.length - 2];
     return getProject(finalSegment);
}

function displayProject()
{
     var project = getProjectFromURL();
     document.title = project.Title;
     $(".title").html(project.Title);
     $("#project-summary").append(project.Description);
     appendList("#project-contributions", project.Contributions);
     appendImageList("#project-pictures", project.Pictures);
     if(project.Video)
     {
          appendYouTubeVideo("#project-video", project.Video);
     }
}

function fetchProject()
{
     setLoadCallback(displayProject);
     loadProjects();
}

$(document).ready(fetchProject);
