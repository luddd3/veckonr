var gray = '#666'
moment.locale('sv');

chrome.browserAction.setBadgeBackgroundColor({
  color: gray
});

chrome.browserAction.setBadgeText({
	text: moment().format('w')
});
