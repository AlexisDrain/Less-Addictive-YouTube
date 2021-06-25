/*
Default settings. If there is nothing in storage, use these values.
*/
var defaultSettings = {
  storedBefore: false,
  comments: false,
  thumbnails: false,
  sidebar: false,
  preview: false
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
      preview: false,
      sidebar: false,
      comments: false
    };

    const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
    for (let item of checkboxes) {
      if(item.checked == true) {
        if (item.getAttribute("data-type") == "thumbnails") {
          save.thumbnails = true;
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
      }
      console.log(item)
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

  console.log(restoredSettings);
  const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
  for (let item of checkboxes) {
    
    if (item.getAttribute("data-type") == "thumbnails") {
      item.checked = restoredSettings.thumbnails;
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
document.getElementById("sidebar").addEventListener("click", storeSettings);
document.getElementById("preview").addEventListener("click", storeSettings)