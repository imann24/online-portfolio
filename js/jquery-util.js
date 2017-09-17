/**
 * @requires jQuery, constants.js
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

function appendListInline(target, list, label)
{
     if(list == null)
     {
          return;
     }
     if(list.length > 1)
     {
          label += "s";
     }
     var content = new StringFormatter().formatList(list);
     appendInline(target, content, label);
}

function appendInline(target, content, label)
{
     if(content == null || content == NOT_APPLICABLE)
     {
          return;
     }
     var html = "<p><b>" +
     label +
     "</b>: " +
     content +
     "</p>";
     $(target).append(html);
}

function appendImage(target, imageSource, blockingCallback)
{
     var id = imageSource.split(".")[0];
     var image = new Image();
     image.src = imageSource;
     blockingCallback.addFlag(imageSource);
     var html = "<img id ='" + id + "'/>";
     $(target).append(html);
     image.onload = function()
     {
          blockingCallback.removeFlag(imageSource);
          $("#" + id).attr("src", imageSource);
     };
}

function appendImageList(target, images, blockingCallback)
{
     for(var i = 0; i < images.length; i++)
     {
          appendImage(target, images[i], blockingCallback);
     }
}

function appendYouTubeVideo(target, embedUrl)
{
     var html = "<iframe src='" +
     embedUrl +
     "' frameborder='0' allowfullscreen></iframe>";
     $(target).append(html);
}

function appendSociaLink(target, image, url)
{
     if(url == null || url == "")
     {
          return;
     }
     image = new StringFormatter().repeat("../", PAGE_LEVEL) +
     "images/social-icons/" +
     image;
     var html = "<a target='blank' href='" +
     url +
     "'><img src='" +
     image +
     "' /></a>";
     $(target).append(html);
}
