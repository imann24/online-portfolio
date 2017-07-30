/**
 @author: Isaiah Mann
 @description: Loads projects from JavaScript
 @requires: jQuery
 */

function loadProjects()
{
     var jsonProjects = $.getJSON("../json/projects.json", function(json)
     {
               console.log(jsonProjects);
     });
}
