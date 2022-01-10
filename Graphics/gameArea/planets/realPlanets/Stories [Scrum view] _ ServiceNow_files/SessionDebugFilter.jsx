/*! RESOURCE: /scripts/filter/SessionDebugFilter.js */
var SessionDebugFilter = (function getSessionDebugFilterAPI(typeToApps) {
function toggleGroup(box) {
if (!box)
return;
var boxID = $(box).readAttribute("id");
var dataGroup = $(box).readAttribute("data-group");
var checked = box.checked;
var logList = $$("div." + boxID);
logList.each(function showOrHide(logItem) {
var relatedCheckedClasses = getRelatedCheckedClasses(boxID, dataGroup, checked);
if (checked && containsAtLeastOneClassName(logItem, relatedCheckedClasses, dataGroup, boxID))
$(logItem).show();
else if (!checked && doesNotContainAnyClassNames(logItem, relatedCheckedClasses))
$(logItem).hide();
});
if (dataGroup == 'type' && typeToApps[boxID])
disableUnusedAppBoxes();
opaqueACLTerms(boxID, checked);
}
function getRelatedCheckedClasses(boxID, dataGroup, checked) {
if (dataGroup == 'type')
return checked && typeToApps[boxID] ? getBoxIDsByDataGroup('app', true) : [];
return checked ? getBoxIDsByDataGroup('type', true) : getBoxIDsByDataGroup('app', true);
}
function getBoxIDsByDataGroup(dataGroup, checked) {
var ids = [];
var boxes = getBoxesByDataGroup(dataGroup);
boxes.each(function get(box) {
if (box.checked == checked)
ids.push($(box).readAttribute("id"));
});
return ids;
}
function getBoxesByDataGroup(dataGroup) {
var boxes = $$('div#debug_filter_group input[data-group=' + dataGroup + ']');
return boxes;
}
function getRelatedBoxes(boxID, dataGroup) {
if (dataGroup == 'type')
return typeToApps[boxID] ? getBoxesByDataGroup('app') : [];
return [];
}
function containsAtLeastOneClassName(logItem, classes, dataGroup, boxID) {
if (dataGroup == 'type') {
var appsForType = typeToApps[boxID];
if (appsForType) {
var numAppsForType = appsForType.length;
var appLogItemHasNoApp = true;
for (var i = 0; i < numAppsForType; i++) {
if ($(logItem).hasClassName(appsForType[i])) {
appLogItemHasNoApp = false;
break;
}
}
if (appLogItemHasNoApp)
return true;
if (classes.length == 0)
return false;
}
}
if (classes.length == 0)
return true;
return getCheckedClassNames(logItem, classes, true);
}
function doesNotContainAnyClassNames(logItem, classes) {
if (classes.length == 0)
return true;
return getCheckedClassNames(logItem, classes, false);
}
function getCheckedClassNames(logItem, classes, foundOneClassReturnBoolean) {
var numClasses = classes.length;
for (var i = 0; i < numClasses; i++) {
if ($(logItem).hasClassName(classes[i]))
return foundOneClassReturnBoolean;
}
return !foundOneClassReturnBoolean;
}
function disableUnusedAppBoxes() {
var apps = {};
appendAppUsage(apps, getBoxIDsByDataGroup('type', false), false);
appendAppUsage(apps, getBoxIDsByDataGroup('type', true), true);
for ( var appID in apps) {
var box = $$('input#' + appID)[0];
if (!apps[appID]) {
$(box).disable();
Element.up(box, 'label').setOpacity(0.5);
} else {
$(box).enable();
Element.up(box, 'label').setOpacity(1.0);
}
}
}
function appendAppUsage(apps, types, bool) {
var numTypes = types.length;
for (var i = 0; i < numTypes; i++) {
var typeApps = typeToApps[types[i]];
if (typeApps) {
var typeAppsLength = typeApps.length;
for (var j = 0; j < typeAppsLength; j++)
apps[typeApps[j]] = bool;
}
}
}
function opaqueACLTerms(boxID, checked) {
if (!typeToApps['debug_sec'])
return;
if (boxID == 'debug_sec' && checked == true) {
var relatedAppBoxes = getRelatedBoxes(boxID, 'type');
relatedAppBoxes.each(function toggleOpacity(appBox) {
var appBoxID = $(appBox).readAttribute("id");
if (appBox.checked == true)
opaqueTerm(appBoxID, true);
else
opaqueTerm(appBoxID, false);
});
}
var secBoxes = $$('div#debug_filter_group input[id=debug_sec]');
if (!secBoxes[0] || (secBoxes[0] && secBoxes[0].checked == false))
return;
opaqueTerm(boxID, checked);
}
function opaqueTerm(boxID, checked) {
var term = $$('div.debug_sec.' + boxID + ' tr.debug_acl_term.' + boxID);
term.each(function(tel) {
if (checked == true)
$(tel).setOpacity(1.0);
else
$(tel).setOpacity(0.5);
});
}
return {
toggleGroup : toggleGroup
};
});
;
