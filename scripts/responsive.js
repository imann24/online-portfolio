function isMobile()
{
     // Adapted from http://www.opentechguides.com/how-to/article/javascript/98/detect-mobile-device.html
     exp = new RegExp('Android|webOS|iPhone|iPad|' +
    		       'BlackBerry|Windows Phone|'  +
    		       'Opera Mini|IEMobile|Mobile' ,
    		      'i');
      if (exp.test(navigator.userAgent))
      {
           return true;
      }
     else
     {
          return false;
     }
}
