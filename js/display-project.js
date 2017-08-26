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
     $("#project-summary").html(project.Description);
     appendList("#project-contributions", project.Contributions);
}

function fetchProject()
{
     setLoadCallback(displayProject);
     loadProjects();
}

$(document).ready(fetchProject);
