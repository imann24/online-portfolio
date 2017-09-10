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
          var html = "<div class = 'col-sm-2'>";
          html += getCell(projs[i]);
          if(i + 1 < projs.length)
          {
               html += getCell(projs[i + 1]);
          }
          html += "</div>"
          $("#proj-table").append(html);
     }
     $("#projects").css("display", "block");
     $(".loader").css("display", "none");
}

function getCell(project)
{
     return "<div><a href = '" +
     project["Key"] +
     "'><img class = 'proj-cell' src ='" +
     project["Key"] +
     "/icon.png' ></a></div>"
}

setLoadCallback(function()
{
     var columnCount = isMobile() ? 4 : 6;
     createProjects(columnCount);
});
loadProjects();
