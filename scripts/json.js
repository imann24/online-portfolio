/**
 @author: Isaiah Mann
 @description: Loads projects from JavaScript
 @requires: jQuery
 */

var projects;

function loadProjects()
{
     $.getJSON("../json/projects.json", function(json)
     {
          projects = json["projects"];
          console.log(projects[0]);
     });
}
