const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const weeks = ['Sun', 'Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat'];
const theme = [
  {
    name: '質感簡約',
    value: 'simple',
  },
  {
    name: '暖系拿鐵',
    value: 'nude',
  },
];
const exportType = [
  {
    name: '日常記事',
    value: 11,
  },
  {
    name: '感恩日記',
    value: 12,
  },
];
const dailyType = [
  {
    id: 11,
    name: '日常記事',
    className: 'diary',
    icon: '●',
  },
  {
    id: 12,
    name: '感恩日記',
    className: 'thks',
    icon: '●',
  },
];
const questItems = [
  {text: '今天想感謝的人', key: 'people'},
  {text: '今天想感謝的事', key: 'thing'},
  {text: '今天想感謝的物', key: 'item'},
];
function getRecord (data, type) {
  const recordData = data.reduce (
    (acc, current) => acc.concat (current.record),
    []
  );
  return recordData.filter (item => item['Type'] == type);
}

function filterType (data, type) {
  const dataList = data.filter (item => {
    return item['Type'] == type;
  });
  if (dataList.length) {
    return dataList;
  }
  return [];
}
function getTimeStr (type) {
  const now = new Date ();
  const year = now.getFullYear ();
  const month = now.getMonth ();
  const day = now.getDate ();
  const week = now.getDay ();
  const hours = now.getHours ();
  const minutes = now.getMinutes ();

  function timeForm (num) {
    if (num < 10) return `0${num}`;
    return `${num}`;
  }
  switch (type) {
    case 'year':
      return `${year}`;
    case 'month':
      return `${month + 1}`;
    case 'monthEn':
      return `${months[month]}`;
    case 'day':
      return `${day}`;
    case 'week':
      return `${week}`;
    case 'date':
      return `${year}-${month + 1}-${day}`;
    case 'time':
      return `${timeForm (hours)}:${timeForm (minutes)}`;
    default:
      return `${year}-${timeForm (month + 1)}-${timeForm (day)}-${timeForm (hours)}:${timeForm (minutes)}`;
  }
}
export {
  filterType,
  getRecord,
  questItems,
  months,
  weeks,
  dailyType,
  exportType,
  getTimeStr,
  theme,
};
