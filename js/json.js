/**
 @author: Isaiah Mann
 @description: Loads projects from JavaScript
 @requires: jQuery
 */

var projects;
var projLoadCallback;

function loadProjects()
{
     $.getJSON("../json/projects.json", function(json)
     {
          projects = json["Projects"];
          if(projLoadCallback != null)
          {
               projLoadCallback();
          }
     });
}

function setLoadCallback(callback)
{
     projLoadCallback = callback;
}

function allProjects()
{
     return projects;
}

function getProject(projectName)
{
     return findProjects("Key", projectName, false);
}

function findProjects(key, value, findMultiple)
{
     matches = [];
     for(var i = 0; i < projects.length; i++)
     {
          if(projects[i][key] == value)
          {
               if(findMultiple)
               {
                    matches.push(projects[i]);
               }
               else
               {
                    return projects[i];
               }
          }
     }
     return matches;
}
