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

function appendImage(target, image)
{
     var html = "<img src ='" +
     image +
     "'/>";
     $(target).append(html);
}

function appendImageList(target, images)
{
     for(var i = 0; i < images.length; i++)
     {
          appendImage(target, images[i]);
     }
}

function appendYouTubeVideo(target, embedUrl)
{
     var html = "<iframe src='" +
     embedUrl +
     "' frameborder='0' allowfullscreen></iframe>";
     $(target).append(html);
}
