/*
Default settings. If there is nothing in storage, use these values.
*/

var defaultSettings = {
  storedBefore: false,
  comments: true,
  thumbnails: false,
  videoTime: true,
  videoWatched: true,
  sidebar: false,
  preview: false,
  nextvideos: false,
  endvideos: false,
  homepage: false,
  shorts: false,
  explore: false,
};
var settings = defaultSettings;

/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {
  console.log("change settings");
  function getTypes() {
    let save = {
      storedBefore: true,
      thumbnails: false,
      videoTime: false,
      videoWatched: false,
      preview: false,
      sidebar: false,
      comments: false,
      nextvideos: false,
      endvideos: false,
      homepage: false,
      shorts: false,
      explore: false,
    };

    const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
    for (let item of checkboxes) {
      if (item.checked == true) {
        if (item.getAttribute("data-type") == "thumbnails") {
          save.thumbnails = true;
        }
        if (item.getAttribute("data-type") == "videoTime") {
          save.videoTime = true;
        }
        if (item.getAttribute("data-type") == "videoWatched") {
          save.videoWatched = true;
        }
        if (item.getAttribute("data-type") == "preview") {
          save.preview = true;
        }
        if (item.getAttribute("data-type") == "sidebar") {
          save.sidebar = true;
        }
        if (item.getAttribute("data-type") == "comments") {
          save.comments = true;
        }
        if (item.getAttribute("data-type") == "nextvideos") {
          save.nextvideos = true;
        }
        if (item.getAttribute("data-type") == "endvideos") {
          save.endvideos = true;
        }
        if (item.getAttribute("data-type") == "homepage") {
          save.homepage = true;
        }
        if (item.getAttribute("data-type") == "shorts") {
          save.shorts = true;
        }
        if (item.getAttribute("data-type") == "explore") {
          save.explore = true;
        }
      }
      console.log(item);
    }
    return save;
  }

  const dataTypes = getTypes();
  browser.storage.local.set(dataTypes);
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  
  if(restoredSettings.storedBefore === undefined) {
    restoredSettings = defaultSettings;
  }

  const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
  for (let item of checkboxes) {
    if (item.getAttribute("data-type") == "thumbnails") {
      item.checked = restoredSettings.thumbnails;
    }
    if (item.getAttribute("data-type") == "videoTime") {
      item.checked = restoredSettings.videoTime;
    }
    if (item.getAttribute("data-type") == "videoWatched") {
      item.checked = restoredSettings.videoWatched;
    }
    if (item.getAttribute("data-type") == "preview") {
      item.checked = restoredSettings.preview;
    }
    if (item.getAttribute("data-type") == "sidebar") {
      item.checked = restoredSettings.sidebar;
    }
    if (item.getAttribute("data-type") == "comments") {
      item.checked = restoredSettings.comments;
    }
    if (item.getAttribute("data-type") == "nextvideos") {
      item.checked = restoredSettings.nextvideos;
    }
    if (item.getAttribute("data-type") == "endvideos") {
      item.checked = restoredSettings.endvideos;
    }
    if (item.getAttribute("data-type") == "homepage") {
      item.checked = restoredSettings.homepage;
    }
    if (item.getAttribute("data-type") == "shorts") {
      item.checked = restoredSettings.shorts;
    }
    if (item.getAttribute("data-type") == "explore") {
      item.checked = restoredSettings.explore;
    }
  }
}

function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

document.getElementById("comments").addEventListener("click", storeSettings);
document.getElementById("thumbnails").addEventListener("click", storeSettings);
document.getElementById("videoTime").addEventListener("click", storeSettings);
document.getElementById("videoWatched").addEventListener("click", storeSettings);
document.getElementById("sidebar").addEventListener("click", storeSettings);
document.getElementById("preview").addEventListener("click", storeSettings);
document.getElementById("nextvideos").addEventListener("click", storeSettings);
document.getElementById("endvideos").addEventListener("click", storeSettings);
document.getElementById("homepage").addEventListener("click", storeSettings);
document.getElementById("shorts").addEventListener("click", storeSettings);
document.getElementById("explore").addEventListener("click", storeSettings);