
// Default settings. If there is nothing in storage, use these values.

var defaultSettings = {
  storedBefore: true,
  comments: true,
  thumbnails: false,
  videoTime: true,
  videoWatched: true,
  sidebar: false,
  preview: false,
  nextvideos: false,
  endvideos: false,
  homepage: false,
  subs: true,
  shorts: false,
  explore: false,
  newnessDot: false,
};

var settings;

//const CSS_thumbnail = "#thumbnail .yt-img-shadow { display: none; }";
//const CSS_thumbnail_preview = ".ytd-moving-thumbnail-renderer { display: none; }";
//const CSS_sidebar = ".ytd-watch-next-secondary-results-renderer { display: none; }";
//const CSS_comments = ".ytd-comments { display: none; }";

//yt-img-shadow
const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

var customStyles;
function createStyle() {  // console.log("if style doesnt exist, create style");
  customStyles = document.createElement("style");
  customStyles.id = "LessAddictiveStyle";
  document.documentElement.appendChild (customStyles);
}

function makeSureStyleIsLast() {
  if(customStyles) {
      if(document.documentElement.lastElementChild.id != "LessAddictiveStyle") {
          console.log("LessAddictiveStyle was not last");
          document.documentElement.appendChild (customStyles);
      }
  }
}

/*
Main function
*/
function toggleCSS() {

  if(customStyles == undefined) {
    console.log("There's no Style. Abort");
    return;
  }
  customStyles.innerHTML = "";
  // channel image class:        ytCoreImageHost yt-spec-avatar-shape__image ytCoreImageFillParentHeight ytCoreImageFillParentWidth ytCoreImageContentModeScaleToFill ytCoreImageLoaded
  // channel banner image class: ytCoreImageHost ytCoreImageFillParentHeight ytCoreImageFillParentWidth ytCoreImageContentModeScaleAspectFill ytCoreImageLoaded
  // Thumbnail class:            ytCoreImageHost ytCoreImageFillParentHeight ytCoreImageFillParentWidth ytCoreImageContentModeScaleAspectFill ytCoreImageLoaded
  if (settings.thumbnails == undefined || settings.thumbnails == false) {
    customStyles.innerHTML += ".ytCoreImageHost.ytCoreImageContentModeScaleAspectFill:not(.yt-spec-avatar-shape__image):not(yt-image-banner-view-model .ytCoreImageHost) { display: none !important; }";
    customStyles.innerHTML += ".yt-core-image { display: none; }"; // deprecated
    customStyles.innerHTML +=
      ".thumbnail-container > yt-img-shadow { display: none !important; }";
  }
  if (settings.videoTime == undefined || settings.videoTime == false) {
    // total time of video. Example: 3:15
    customStyles.innerHTML += "yt-thumbnail-badge-view-model { display: none !important; }";
      customStyles.innerHTML += ".ytd-thumbnail-overlay-time-status-renderer { display: none; }"; // deprecated
  } else {
          customStyles.innerHTML +=
    "#overlays { display: block !important; }"; // due to bug, having thumbnails disabled could also disable total time + red bar below thumbnail
  }
  if(settings.videoWatched == undefined || settings.videoWatched == false) {
    // red bar below video thumbnail (how much you've watched)
    customStyles.innerHTML += ".ytThumbnailOverlayProgressBarHostWatchedProgressBar, .ytThumbnailOverlayProgressBarHostUseLegacyBar { display: none !important; }";
    customStyles.innerHTML += ".ytd-thumbnail-overlay-resume-playback-renderer { display: none; }"; // deprecated
  } else {
    customStyles.innerHTML +=
"#overlays { display: block !important; }"; // due to bug, having thumbnails disabled could also disable total time + red bar below thumbnail
  }

  if (settings.preview == undefined || settings.preview == false) {
    customStyles.innerHTML +=
      "#video-preview-container .ytd-video-preview { display: none; }";
      customStyles.innerHTML +=
        "#mouseover-overlay .ytd-thumbnail { display: none; }";
        customStyles.innerHTML +=
          "#hover-overlays .ytd-thumbnail { display: none; }";
  }
  if (settings.sidebar == undefined || settings.sidebar == false) {
    customStyles.innerHTML +=
      ".ytd-watch-next-secondary-results-renderer { display: none; }"; // original pre-2024 design
      
    customStyles.innerHTML +=
    "#bottom-grid .style-scope { display: none; }";  // preview future 2024 design
  }
  if (settings.comments == undefined || settings.comments == false) {
    customStyles.innerHTML += ".ytd-comments { display: none; }";
  }
  if (settings.nextvideos == undefined || settings.nextvideos == false) {
    customStyles.innerHTML +=
      ".ytp-ce-video { display: none; } .ytp-ce-channel { display: none; }";
  }
  if (settings.endvideos == undefined || settings.endvideos == false) {
    customStyles.innerHTML += ".ytp-endscreen-content { display: none; }";
  }

    // hide videos on home page
  if (settings.homepage == undefined || settings.homepage == false) {
    if(document.location.pathname == '/' ) { // subscription/channel pages uses the same tag and class as homepage. so make sure we're in the homepage
      customStyles.innerHTML += "#contents .ytd-rich-grid-renderer { display: none; }";
    }
  }
  // hide videos on subscription page
if (settings.subs == undefined || settings.subs == false) {
  if(document.location.pathname == '/feed/subscriptions' ) { // subscription/channel pages uses the same tag and class as homepage. so make sure we're in the subs page
    customStyles.innerHTML += "#contents .ytd-rich-grid-renderer { display: none; }";
  }
}
  
  if (settings.shorts == undefined || settings.shorts == false) {
    // hide Shorts section on the front page
    customStyles.innerHTML += ".ytd-rich-section-renderer { display: none; }";
    // hide Shorts on the sidebars
    customStyles.innerHTML += '[aria-label="Shorts"] { display: none; }';
    customStyles.innerHTML += '[title="Shorts"] { display: none !important; }';
    // hide Shorts on channel pages
    customStyles.innerHTML +=
      ":nth-child(3 of .tp-yt-paper-tabs > tp-yt-paper-tab) { display: none; }";
    customStyles.innerHTML += "ytd-reel-shelf-renderer { display: none; }";
  }
  if (settings.explore == undefined || settings.explore == false) {
    // hide Explore on the sidebars
    customStyles.innerHTML += '[aria-label="Explore"] { display: none; }';
    customStyles.innerHTML += '[title="Explore"] { display: none !important; }';
    // hide sidebar sections
    customStyles.innerHTML +=
      ".ytd-guide-renderer:nth-child(3) { display: none; }";
    customStyles.innerHTML +=
      ".ytd-guide-renderer:nth-child(4) { display: none; }";
    // hide filter -- these are the filters inside the channel pages (Latest, Popular, Oldest)
    //customStyles.innerHTML +=
    //  "ytd-feed-filter-chip-bar-renderer { display: none; }";
  }
  if (settings.newnessDot == undefined || settings.newnessDot == false) {
    // hide newness-dot on the sidebars
    customStyles.innerHTML += 'ytd-guide-entry-renderer[line-end-style=dot] #newness-dot.ytd-guide-entry-renderer {display: none !important;}';
  }
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
Argument url must be a valid URL string.
*/
function protocolIsApplicable(url) {
  const protocol = new URL(url).protocol;
  return APPLICABLE_PROTOCOLS.includes(protocol);
}

/*
Initialize the page action
*/
function initializePageAction() {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then((result) => {
    
    if (result.storedBefore === undefined) {
      settings = defaultSettings;
    } else {
      settings = result;
    }
    
    createStyle();
    toggleCSS();
  }, onError);
}

/*
On startup, check whether we have stored settings.
If we don't, then store the default settings.
*/
function checkStoredSettings(storedSettings) {
  if (storedSettings.storedBefore == false) {
    browser.storage.local.set(defaultSettings);
  }
}

/*
Generic error logger.
*/
function onError(e) {
  console.error(e);
}

// https://stackoverflow.com/questions/14765434/chrome-extension-options-js-notify-content-script-js-of-settings-change
// refresh page on option change

browser.storage.onChanged.addListener(function(changes, namespace) {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then((result) => {
    settings = result;
    toggleCSS();
  }, onError);
});

// needed to hide videos on home page
document.addEventListener('yt-navigate-finish', function() {
  if(customStyles == undefined) {
    return;
  }
  toggleCSS();
});

setInterval(makeSureStyleIsLast, 2000); // make sure that the main style element is the last on this page (Cascading style), otherwise the plugin may not work.

initializePageAction();
