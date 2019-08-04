/**
 @author: Isaiah Mann
 @description: Loads projects from JavaScript
 @requires: jQuery
 */

var projects;
var projLoadCallbacks = [];
var projectLoadingInitialized = false;

function loadProjects()
{
     if(projectLoadingInitialized)
     {
          return;
     }
     projectLoadingInitialized = true;
     var subDirectory = new StringFormatter().repeat("../", PAGE_LEVEL);
     $.getJSON(subDirectory + "json/projects.json", function(json)
     {
          projects = json["Projects"];
          projects.sort((proj1, proj2) => (proj1["SortPriority"] - proj2["SortPriority"]));
          triggerCallbacks();
     });
}

function loadProjectsWithCallback(callback)
{
     addLoadCallback(callback);
     loadProjects();
}

function addLoadCallback(callback)
{
     projLoadCallbacks.push(callback);
}

function triggerCallbacks()
{
     for(var i = 0; i < projLoadCallbacks.length; i++)
     {
          projLoadCallbacks[i]();
     }
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
