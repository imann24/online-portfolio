// Adapted from: https://mozilla.github.io/pdf.js/examples/

// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = "../assets/Mann_Resume.pdf";

// The workerSrc property shall be specified.
pdfjsLib.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
  // Fetch the first page
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function(page) {
    var scale = 5;
    var viewport = page.getViewport(scale);

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById("pdf-canvas");
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.then(function () {
         $(".loader").css("display", "none");
    });
  });
}, function (reason) {
  // PDF loading error
  console.error(reason);
});
