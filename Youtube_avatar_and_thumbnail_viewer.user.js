// ==UserScript==
// @name     Youtube Avatar Viewer
// @version  1
// @grant    none
// @include  https://www.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant		 GM_openInTab
// ==/UserScript==
var body = document.body;
body.addEventListener("contextmenu", initMenu, false);
var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="avatar-expand" type="context">\
									<menuitem label="View Avatar">\
									</menuitem>\
									</menu>';
document.querySelector("#avatar-expand menuitem")
        .addEventListener("click", openImage, false);
function initMenu(aEvent) {
  // Executed when user right click on web page body
  // aEvent.target is the element you right click on
  var node = aEvent.target;
  var item = document.querySelector("#avatar-expand menuitem");
  item.setAttribute("imageURL", node.src);
  item.setAttribute("thumbURL", node.parentElement.parentElement.parentElement.getElementsByTagName("yt-img-shadow")[0].getElementsByTagName("img")[0].src);
}
function imgPlace() {
  var img = document.getElementsByTagName("img");
  for (i=0; i<img.length; i++) {
    var cMenu = document.createAttribute("contextmenu");
    cMenu.value = "avatar-expand";
    img[i].setAttributeNode(cMenu);
  }
};
function openImage(aEvent) {
  var imageURL = aEvent.target.getAttribute("imageurl");
  var thumbURL = aEvent.target.getAttribute("thumbURL");
  var replacer = /([\/\=])(s)\d{2,}/;
  var coverReplacer = /(=)(w\d\d-h\d\d\d)/
  var slicer = /\?sqp=/;
  var slicer2 = /an_webp\/([^\/]*)\//;
  var maxres = /hqdefault/;
  if (replacer.exec(imageURL) != null) {
    var bigURL = imageURL.replace(replacer, replacer.exec(imageURL)[1] + 'w500');
  }
  if (coverReplacer.exec(imageURL) != null) {
    var bigURL = imageURL.replace(coverReplacer, coverReplacer.exec(imageURL)[1] + 'w500-h500-');
  }
  if (slicer.exec(imageURL) != null) {
    var bigURL = imageURL.split(slicer)[0];
  }
	else if (slicer.exec(thumbURL) != null) {
    var bigURL = thumbURL.split(slicer)[0];
  }
  window.open(bigURL);
}
waitForKeyElements ('img', imgPlace);
