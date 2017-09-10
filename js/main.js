/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function navBar(pageLevel)
{
     var bar = new HTMLGroup
     (
        "LinkButton",
        ["Me", "Resume", "Projects", "Contact"],
        "navbar"
    );
    bar.addInnerContentToAll
    (
        "h1",
        ["Me", "Resume", "Projects", "Contact"]
    );
    var links = ["", "resume", "projects", "contact"];
    var formatter = new LinkFormatter();
    links = formatter.setDirectoryLevel(
            pageLevel,
            links);
    bar.addLinkToAll(
        links
    );
    $('#navbar-wrapper').append(bar.getHTML());
}

function highlightActivePage(pageId)
{
     $("#" + pageId).addClass("ActivePage");
}

function addSocialLinks(pageLevel)
{
    var socialImages = ["linkedin.png", "github.png", "twitter.png"];
    var links = [
        "https://www.linkedin.com/in/isaiahmann",
        "https://github.com/imann24/",
        "https://twitter.com/isaiah_the_mann",
    ];
    var formatter = new LinkFormatter();
    socialImages = formatter.setDirectoryLevel(
            pageLevel,
            formatter.addDirectory(
                "images",
                formatter.addDirectory(
                    "social-icons",
                    socialImages)));
    var images = new ImageGroup(
        socialImages,
        "social-icon"
    );
    images.addAttribute(new Attribute("id", "social-icons"));
    images.addLinkToAll(links);
    $("body").prepend(images.getHTML());
}

function initialize ()
{
    navBar(PAGE_LEVEL);
    if(typeof(PAGE_ID) != "undefined")
    {
         highlightActivePage(PAGE_ID);
    }
    addSocialLinks(PAGE_LEVEL);
}

$(document).ready(initialize);
