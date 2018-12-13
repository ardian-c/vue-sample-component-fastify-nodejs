/* eslint-disable */
export function mergeClasses(...classes) {
  return classes
    .map(c => Array.isArray(c) ? c : [c])
    .reduce((classes, c) => classes.concat(c), []);
}

export const settings = {
  tableClass: '',
  theadClass: '',
  tbodyClass: '',
  headerClass: '',
  cellClass: '',
  filterInputClass: '',
  filterPlaceholder: 'Filter table…',
  filterNoResults: 'There are no matching rows',
};

export function mergeSettings(newSettings) {
  for (const setting in settings) {
    settings[setting] = newSettings[setting];
  }
}

export function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}