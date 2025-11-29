# Less Addictive YouTube  

Remove some elements from YouTube to make it less addictive. Mix and match between the following options:  

- Hide or show thumbnails and video preview  
- Hide or show recommended videos sidebar  
- Hide or show comments  
- Hide or show recommended videos end screen (when autoplay is off)  

## Download  

[Chrome Web Store](https://chrome.google.com/webstore/detail/less-addictive-youtube/olhmbgdbpfpkpejldoihajphhilpdnle)  

[Firefox Add-On](https://addons.mozilla.org/en-US/firefox/addon/less-addictive-youtube/)  

## Screenshots  

![Remove comments and sidebar](https://github.com/AlexisDrain/Less-Addictive-YouTube/blob/main/screenshots/removecommentsandsidebar1280x800.png)  
![Remove thumbnails](https://github.com/AlexisDrain/Less-Addictive-YouTube/blob/main/screenshots/GetRidOfThumbnails-1280x800.png)  

## Thanks  

Some recent features were developed by https://github.com/pfandzelter  
List of his changes: https://github.com/AlexisDrain/Less-Addictive-YouTube/pull/5  

## Changelog  

(11-29-2025) v1.49:  

- Fixed broken features for a new YouTube update (November 2025), such as thumbnail video preview.
- Removed the option "Show recommended channel & 2 videos end screen" because it is now a native YouTube feature (see "show" button on top-right of video when prompted by end screen).
- Added option to hide the suggested videos when the user presses "V" on the keyboard during fullscreen in a video. ❌Known issue: pressing "V" also adds a gradient and removes the progress bar. It would be too invasive to YouTube's code to fix this issue, sorry. Just press "V" again to hide the gradient.

(8-19-2025) v1.48: 

- Fixed thumbnails breaking with new YouTube update.  
- Fixed issue where disabling thumbnails also disable channel avatar and banner.  

(4-22-2025) v1.47: 

- New feature: Added option to show/hide the blue newness dot. Thanks AIPAL18!  

(6-8-2024) v1.46: 

- New feature: Added option to show/hide videos on the subscription page.  
- Extension now works for the possible future YouTube design.

(1-10-2024) v1.45: 

- New feature: Added option to show/hide videos on the front page.  

(12-18-2023) v1.44: 

- Changed logo due to copyright strike. 

(12-17-2023) v1.43: 

- Fixed bug where extension doesn't work after opening a new YouTube tab.  

(12-07-2023) v1.42:  

New Features:  
- Extension now displays your changes immediately. No need to F5/Refresh to see your new settings.  
- Extension now works before any of the DOM objects are rendered. No more tiny flash of hidden content being shown when you reload the page.  
- Slightly cleaner options menu with labels above each category (Thumbnails, In video, Misc).  
- Option: make video length visible even with no thumbnail.  
- Option: show how much you've watched from the video (the red bar below the thumbnails)  

Bug fixes: 
- Bug fix: "Show Explore content" is now separate from Shorts.  
- Bug fix: unchecking "Show Explore content" used to remove the "Latest, Popular, Oldest" sorting on channel pages.  
