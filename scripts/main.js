/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initialize ()
{
    navBar(PAGE_LEVEL);
}

function navBar(pageLevel)
{
     var bar = new HTMLGroup
     (
        "LinkButton",
        ["Resume", "Projects", "Contact"],
        "Navbar"
    );
    bar.addInnerContentToAll
    (
        "h1",
        ["Resume", "Projects", "Contact"]
    );
    var links = ["resume", "projects", "contact"];
    var formatter = new LinkFormatter();
    links = formatter.setDirectoryLevel(
            pageLevel,
            links);
    bar.addLinkToAll(
        links
    );
    $('#navbar-wrapper').append(bar.getHTML());
}

function generateNavBar(pageLevel)
{
    var bar = new HTMLGroup(
        "LinkButton",
        ["Resume", "Projects", "Contact"],
        "Navbar"
    );

    bar.addInnerContentToAll (
        "h1",
        ["Resume", "", "All Projects", "Coursework"]
    );
    var links = ["resume", "social", "projects", "coursework"];
    var formatter = new LinkFormatter();
    links = formatter.setDirectoryLevel(
            pageLevel,
            links);
    bar.addLinkToAll(
        links
    );
    addSocialLinks(bar, pageLevel);
    $('body').append(bar.getHTML());
}

function addSocialLinks (navBar, pageLevel) {
    var socialImages = ["linkedin.png", "github.png", "twitter.png", "wordpress.png"];
    var links = [
        "https://www.linkedin.com/in/isaiahmann",
        "https://github.com/imann24/",
        "https://twitter.com/isaiah_the_mann",
        "http://isaiahmann.com/blog"
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

    images.addLinkToAll(links);
    navBar.addInnerContentToElement(1, images);

}

/** * Apply a class to each child * Required for IE8- */
$('.circle-container').children().each(function() {  $(this).addClass('item'+($(this).index() + 1));});
window.onload = initialize;
