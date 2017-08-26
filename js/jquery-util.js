/**
 * @requires jQuery
 */

function appendList(target, list)
{
     var html = "<ul>";
     for(var i = 0; i < list.length; i++)
     {
          html += "<li>" +
          list[i] +
          "</li>";
     }
     html += "</ul>";
     $(target).append(html);
}
