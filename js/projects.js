const PROJECTS_HOVER_PROMPT_ID = "projects-hover-prompt";
const PROJECTS_HOVER_INFO_ID = "projects-hover-info";
const PROJECTS_HOVER_TITLE_ID = "project-hover-title";
const PROJECTS_HOVER_ICON_ID = "project-hover-icon";
const PROJECTS_HOVER_DESC_ID = "project-hover-desc";
const PROJECT_WRAPPER_CLASS = "proj-wrapper";
const PROJECT_CELL_CLASS = "proj-cell";
const PROJECT_INDEX_ATTR = "project_index";
const HOVER_PROMPT = "Hover For More";
const HOVER_EXTRA_PROMPT = "Hover Over a Project";
const HOVER_CLICK_PROMPT = "Click To View";
const MAX_DESC_LENGTH = 75;

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
          var html = "<div class = 'row-sm-2'>";
          html += getCell(projs[i], i);
          if(i + 1 < projs.length)
          {
               html += getCell(projs[i + 1], i + 1);
          }
          html += "</div>"
          $("#proj-table").append(html);
     }
     $("#projects").css("display", "block");
     $(".loader").css("display", "none");
}

function getCell(project, index)
{
     return `<div class='${PROJECT_WRAPPER_CLASS}'>
                <a href='${project["Key"]}'>
                    <img class='${PROJECT_CELL_CLASS}'
                         src='${project["Key"]}/icon.png'
                         ${PROJECT_INDEX_ATTR}='${index}'/>
                </a>
            </div>`;
}

function initProjectBrowser()
{
    $(`#${PROJECTS_HOVER_PROMPT_ID}`).css("display", "block")
                                    .html(HOVER_PROMPT)
                                    .hover((e) => {
                                        $(e.target).html(HOVER_EXTRA_PROMPT)
                                    }, (e) => {
                                        $(e.target).html(HOVER_PROMPT)
                                    });
    $(`.${PROJECT_CELL_CLASS}`).hover((e) => {
        $(`#${PROJECTS_HOVER_PROMPT_ID}`).html(HOVER_CLICK_PROMPT);
        $(`#${PROJECTS_HOVER_INFO_ID}`).css("left", "0vw");
        const projectIndex = e.target.getAttribute(`${PROJECT_INDEX_ATTR}`);
        const project = allProjects()[projectIndex];
        $(`#${PROJECTS_HOVER_ICON_ID}`).html(`<img src='${project.Key}/icon.png'/>`);
        $(`#${PROJECTS_HOVER_TITLE_ID}`).html(`<b>Project:<br> </b>${project.Title}`);
        let truncatedDesc = project.Description;
        if(truncatedDesc.length > MAX_DESC_LENGTH)
        {
            const trimmed = truncatedDesc.substring(0, MAX_DESC_LENGTH - 3);
            // Break cleanly on a word:
            truncatedDesc = `${trimmed.substring(0, trimmed.lastIndexOf(" "))}...`;
        }
        $(`#${PROJECTS_HOVER_DESC_ID}`).html(`<b>Info:<br> </b>${truncatedDesc}`);
    }, (e)=> {
        $(`#${PROJECTS_HOVER_PROMPT_ID}`).html(HOVER_PROMPT);
        $(`#${PROJECTS_HOVER_INFO_ID}`).css("left", "-20vw");
    });
}

addLoadCallback(function()
{
     var columnCount = isMobile() ? 4 : 6;
     createProjects(columnCount);
     if(!isMobile())
     {
         // Relies on hovering over project, so not usable on mobile
         initProjectBrowser();
     }
});
