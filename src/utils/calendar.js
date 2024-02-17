import {dailyType} from './basic';

function markDay (propData, month) {
  if (!propData) return null;
  const data = propData.filter (item => {
    const _month = item.code.split ('-')[1];
    return _month === month;
  });
  clearLabels ();
  if (!data || !data.length) return false;
  for (let i = 0, len = data.length; i < len; i++) {
    const theDay = data[i].code.split ('-')[2];
    dailyType.forEach (type => {
      const strData = JSON.stringify (data[i].record);
      const elemDiary = document.querySelector (
        `[data-day="${theDay}"] .${type.className}`
      );
      strData.includes (`"Type":${type.id}`)
        ? elemDiary.classList.add ('show')
        : '';
    });
  }
}
function clearLabels () {
  const elem = document.querySelectorAll ('.mark-list span');
  if (elem.length) elem.forEach (item => item.classList.remove ('show'));
}
function clearClickMark () {
  document
    .querySelectorAll ('.cframe')
    .forEach (item => item.classList.remove ('click'));
}
function markClicked (year, month, date) {
  let strDate = date.split ('-').join ('');
  if (strDate.includes (`${year}${month}`)) {
    const clickedDate = date.split ('-');
    const _day = clickedDate[2];
    document.querySelector (`[data-day="${_day}"]`).classList.add ('click');
  }
}
export {markDay, clearClickMark, markClicked};
