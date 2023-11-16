/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const PROJECT_LISTING_SCROLL_TOLERANCE = 50;
const ANALYTICS_ENABLED = true;

async function startAnalytics()
{
    const analytics = document.createElement("script");
    analytics.src = "https://www.googletagmanager.com/gtag/js?id=G-VWLRJPSKE3"
    analytics.async = true
    return new Promise((resolve, reject) =>
    {
        analytics.onreadystatechange = function()
        {
            if(analytics.readyState === "loaded" || analytics.readyState === "complete")
            {
                analytics.onreadystatechange = null;
                resolve(true);
            }
        };
        document.getElementsByTagName("head")[0].appendChild(analytics);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VWLRJPSKE3');
    });
}

function navBar(pageLevel)
{
     var bar = new HTMLGroup
     (
        "LinkButton",
        ["Me", "Resume", "Projects", "Contact"],
        "site-navbar"
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
               "project-listing",
               keys,
               "project-dropdown"
          );
          projectDropdown.addInnerContentToAll("p", titles);
          var formatter = new LinkFormatter();
          var links = formatter.addDirectory("projects", keys);
          links = formatter.setDirectoryLevel(pageLevel, links);
          projectDropdown.addLinkToAll(links);
          projectButton.addInnerElement(projectDropdown);
          $("#" + projectButton.getId()).append(projectDropdown.getHTML());
          if(!isMobile())
          {
               $('#Projects').append('<div id="projects-scroll-down-icon"/>');
               $("#Projects").hover(
                    function()
                    {
                         // when Contact is below Projects, don't expand
                         if(window.innerWidth <= 600)
                         {
                              return
                         }
                         $(".project-dropdown").css("display", "block");
                         checkToShowProjectsScrollDown();
                    },
                    function()
                    {
                         $(".project-dropdown").css("display", "none");
                         $("#projects-scroll-down-icon").css("display", "none");
                    }
               );
               $(".project-dropdown").scroll(checkToShowProjectsScrollDown);
          }
     });
}

function checkToShowProjectsScrollDown()
{
     let dropdown = $(".project-dropdown");
     let trueDivHeight = dropdown.prop("scrollHeight");
     let divHeight = dropdown.height();
     let scrollLeft = trueDivHeight - divHeight;
     let scrolled = dropdown.scrollTop();
     let scrollDifference = Math.abs(scrollLeft - scrolled);
     if (scrollDifference < PROJECT_LISTING_SCROLL_TOLERANCE)
     {
          $("#projects-scroll-down-icon").css("display", "none");
     }
     else
     {
          $("#projects-scroll-down-icon").css("display", "block");
     }
}

function highlightActivePage(pageId)
{
     $("#" + pageId).addClass("ActivePage");
}

function addSocialLinks(pageLevel)
{
    let socialImages = ["linkedin.png",
                        "github.png",
                        "twitter.png",
                        "medium.png",
                        "linktree.png"];
    const links = [
        "https://www.linkedin.com/in/isaiahmann",
        "https://github.com/imann24/",
        "https://twitter.com/isaiah_the_mann",
        "https://medium.com/@isaiahmann",
        "https://linktr.ee/isaiahm"];
    const formatter = new LinkFormatter();
    socialImages = formatter.setDirectoryLevel(
            pageLevel,
            formatter.addDirectory(
                "images",
                formatter.addDirectory(
                    "social-icons",
                    socialImages)));
    const images = new ImageGroup(socialImages, "social-icon");
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
    if(ANALYTICS_ENABLED)
    {
        startAnalytics();
    }
}

$(document).ready(initialize);
