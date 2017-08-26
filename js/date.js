var months = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December"
];

function getDate(dateString)
{
     var date = new Date(dateString);
     var month = date.getMonth();
     var year = date.getFullYear();
     return months[month] + " " + year;
}

function getTimeline(project)
{
     var start = getDate(project.StartDate);
     var end;
     if(project.IsOngoing)
     {
          end = "Present";
     }
     else
     {
          end = getDate(project.EndDate);
     }
     if(start == end)
     {
          return start;
     }
     else
     {
          return start + " - " + end;     
     }
}
