/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const projectListingScrollTolerance = 50;

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
    addProjectDropdown(pageLevel, bar.getInnerElement(2));
    $('#navbar-wrapper').append(bar.getHTML());
}

function addProjectDropdown(pageLevel, projectButton)
{
     loadProjectsWithCallback(function()
     {
          var keys = projects.map(function(project) {return project.Key;});
          var titles = projects.map(function(project) {return project.Title;});
          var projectDropdown = new HTMLGroup(
               "project-listing", keys, "project-dropdown");
          projectDropdown.addInnerContentToAll("p", titles);
          var formatter = new LinkFormatter();
          var links = formatter.addDirectory("projects", keys);
          lins = formatter.setDirectoryLevel(pageLevel, links);
          projectDropdown.addLinkToAll(links);
          projectButton.addInnerElement(projectDropdown);
          $("#" + projectButton.getId()).append(projectDropdown.getHTML());
          if(!isMobile())
          {
               $("#Projects").hover(
                    function()
                    {
                         $(".project-dropdown").css("display", "block");
                         $("#projects-scroll-down-icon").css("display", "block");
                    },
                    function()
                    {
                         $(".project-dropdown").css("display", "none");
                         $("#projects-scroll-down-icon").css("display", "none");
                    }
               );
               $('#Projects').append('<div id="projects-scroll-down-icon"/>');
               $(".project-dropdown").scroll(
                    function()
                    {
                         let dropdown = $(".project-dropdown");
                         let trueDivHeight = dropdown.prop("scrollHeight");
                         let divHeight = dropdown.height();
                         let scrollLeft = trueDivHeight - divHeight;
                         let scrolled = dropdown.scrollTop();
                         let scrollDifference = Math.abs(scrollLeft - scrolled);
                         if (scrollDifference < projectListingScrollTolerance)
                         {
                              $("#projects-scroll-down-icon").css("display", "none");
                         }
                         else
                         {
                              $("#projects-scroll-down-icon").css("display", "block");
                         }
                    }
               );
          }
     });
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
