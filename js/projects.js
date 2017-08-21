function listProjects()
{
     var projs = allProjects();
     for(var i = 0; i < projs.length; i++)
     {
          $("#projects").append("<div id = 'proj" + i + "'></div>");
          $("#proj" + i).append("<p>" + projs[i]["Title"] + "</p>");
          $("#proj" + i).append("<img src = '" + projs[i]["Key"] + "/icon.png' >");
     }
}

function createProjects(columnCount)
{
     $("#projects").append("<center><div id = 'proj-table'></div></center>");
     var projs = allProjects();
     for(var i = 0; i < projs.length > 0; i += 2)
     {
          // $("#project-table-row" + rowIndex).append("<div class = 'col-sm-2'><img class = 'proj-cell' src ='" +
          // projs[projIndex]["Key"] +
          // "/icon.png' ></div>");
          var html = "<div class = 'col-sm-2'>";
          html += getCell(projs[i]);
          if(i + 1 < projs.length)
          {
               html += getCell(projs[i + 1]);
          }
          html += "</div>"
          $("#proj-table").append(html);
     }
}

function getCell(project)
{
     return "<div><img class = 'proj-cell' src ='" +
     project["Key"] +
     "/icon.png' ></div>"
}

setLoadCallback(function()
{
     var columnCount = isMobile() ? 4 : 6;
     createProjects(columnCount);
});
loadProjects();
