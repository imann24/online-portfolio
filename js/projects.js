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
     var remainingCellCount = projs.length;
     var projIndex = 0;
     var rowIndex = 0;
     while(remainingCellCount > 0)
     {
          // $("#proj-table").append("<div class = 'row'" +
          // "id ='project-table-row" + rowIndex + "'></div>");
          for(var i = 0; i < columnCount && remainingCellCount > 0; i++)
          {
               // $("#project-table-row" + rowIndex).append("<div class = 'col-sm-2'><img class = 'proj-cell' src ='" +
               // projs[projIndex]["Key"] +
               // "/icon.png' ></div>");
               $("#proj-table").append("<div class = 'col-sm-2'><img class = 'proj-cell' src ='" +
               projs[projIndex]["Key"] +
               "/icon.png' ></div>");
               remainingCellCount--;
               projIndex++;
          }
          rowIndex++;
     }
}

setLoadCallback(function()
{
     var columnCount = isMobile() ? 4 : 6;
     createProjects(columnCount);
});
loadProjects();
