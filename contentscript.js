/*
Default settings. If there is nothing in storage, use these values.
*/
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
  shorts: false,
};
var settings = defaultSettings;

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
/*
Main function
*/
function toggleCSS() {

  if(customStyles == undefined) {
    console.log("There's no Style. Abort");
    return;
  }
  customStyles.innerHTML = "";

  if (settings.thumbnails == undefined || settings.thumbnails == false) {
    customStyles.innerHTML += ".yt-core-image { display: none; }";
    customStyles.innerHTML +=
      ".thumbnail-container > yt-img-shadow { display: none !important; }";
  }
  if (settings.videoTime == undefined || settings.videoTime == false) {
      customStyles.innerHTML +=
        ".ytd-thumbnail-overlay-time-status-renderer { display: none; }"; // total time of video. Example: 3:15
  } else {
          customStyles.innerHTML +=
    "#overlays { display: block !important; }"; // due to bug, having thumbnails disabled could also disable total time + red bar below thumbnail
  }
  if(settings.videoWatched == undefined || settings.videoWatched == false) {
    customStyles.innerHTML +=
      ".ytd-thumbnail-overlay-resume-playback-renderer { display: none; }"; // red bar below video thumbnail (how much you've watched)
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
      ".ytd-watch-next-secondary-results-renderer { display: none; }";
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
    settings = result;
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

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

initializePageAction();

// https://stackoverflow.com/questions/14765434/chrome-extension-options-js-notify-content-script-js-of-settings-change
// refresh page on option change

browser.storage.onChanged.addListener(function(changes, namespace) {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then((result) => {
    settings = result;
    toggleCSS();
  }, onError);
});