/*
Default settings. If there is nothing in storage, use these values.
*/
var defaultSettings = {
  comments: false,
  thumbnails: false,
  sidebar: false,
  preview: false
};
var settings = defaultSettings;

const CSS_thumbnail = "#thumbnail .yt-img-shadow { display: none; }";
const CSS_thumbnail_preview = "#play.ytd-moving-thumbnail-renderer { display: none; }";
const CSS_sidebar = ".ytd-watch-next-secondary-results-renderer { display: none; }";
const CSS_comments = ".ytd-comments { display: none; }";

//yt-img-shadow
const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

toggleCSS();

/*
Main function
*/
function toggleCSS() {
  console.log(settings.thumbnails);

  
  var customStyles = document.createElement('style');
  document.body.insertBefore(customStyles, document.body.firstChild);

  if(settings.thumbnails == false) {
    customStyles.innerHTML += CSS_thumbnail;
  } else {
    console.log("don't add stuff")
    //browser.tabs.removeCSS({code: CSS_thumbnail});
  }
  if(settings.preview == false) {
    customStyles.innerHTML += CSS_thumbnail_preview;
  } else {
    console.log("don't add stuff2")
    //browser.tabs.removeCSS({code: CSS_thumbnail_preview});
  }
  if(settings.sidebar == false) {
    customStyles.innerHTML += CSS_sidebar;
  } else {
    console.log("don't add stuff3")
    //browser.tabs.removeCSS({code: CSS_sidepanel});
  }
  if(settings.comments == false) {
    customStyles.innerHTML += CSS_comments;
  } else {
    console.log("don't add stuff4")
    //browser.tabs.removeCSS({code: CSS_comments});
  }

}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
Argument url must be a valid URL string.
*/
function protocolIsApplicable(url) {
  const protocol = (new URL(url)).protocol;
  return APPLICABLE_PROTOCOLS.includes(protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
    browser.pageAction.show(tab.id);
  }
  
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then((result) => {settings = result}, onError);
}


/*
On startup, check whether we have stored settings.
If we don't, then store the default settings.
*/
function checkStoredSettings(storedSettings) {
  if (!storedSettings.since || !storedSettings.dataTypes) {
    browser.storage.local.set(defaultSettings);
  }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
  toggleCSS();
  console.log("update tab");
});


/*
Generic error logger.
*/
function onError(e) {
  console.error(e);
}

browser.browserAction.onClicked.addListener(toggleCSS);
