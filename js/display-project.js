/**
 * @requires json.js, jquery-util.js, constants.js, date.js
 */

var links = [
     "Website",
     "Facebook",
     "Twitter",
     "GitHub",
     "AppStore",
     "GooglePlay",
     "itch.io",
     "PlayOnline"
];

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
     appendImage("#project-icon", "icon.png")
     appendListInline("#project-role", project.Roles, "Role");
     appendInline("#project-org", project.Organization, "Organization");
     appendInline("#project-team-size", project.TeamSize, "Team Size");
     appendInline("#project-timeline", getTimeline(project), "Timeline");
     appendListInline("#project-plat", project.Platforms, "Platform");
     appendListInline("#project-lang", project.Languages, "Language");
     $("#project-description").append(project.Description);
     appendList("#project-contributions", project.Contributions);
     for(var i = 0; i < links.length; i++)
     {
          var image = links[i].toLowerCase().replace(".", "")
          + ".png";
          appendSociaLink("#project-links", image, project[links[i]]);
     }
     appendImageList("#project-pictures", project.Pictures);
     if(project.Video)
     {
          appendYouTubeVideo("#project-video", project.Video);
     }
     $("#project-display").css("display", "block");
     $(".loader").css("display", "none");
}

function fetchProject()
{
     setLoadCallback(displayProject);
     loadProjects();
}

$(document).ready(fetchProject);
