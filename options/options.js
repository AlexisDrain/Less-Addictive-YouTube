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

/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {

  function getTypes() {
    let save = {
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

/*
On clicking the save button, save the currently selected settings.
*/
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", storeSettings);