import {theme} from './basic';
/*
const totalData = {
  diary:[...{data}]
}
const dataSample = {
    code:'20242',
    record:{
        11:[{date:2024-2-1,data:{},wTime:'2024-02-03-15:00'}],
        12:[...same]
    }
}
*/
const store = {
  initData: JSON.parse (localStorage.getItem ('diary')),
  getLocalData: () => {
    const dataObj = localStorage.getItem ('diary');
    return JSON.parse (dataObj);
  },
  hasTheme: function () {
    const _theme = localStorage.getItem ('diary-theme');
    if (theme.find (item => item.value == _theme)) return _theme;
    return 'simple';
  },
  hasDiary: function () {
    if (this.initData) return true;
    return false;
  },
  saveTheme: type => {
    localStorage.setItem ('diary-theme', type);
  },
  saveToLocal: function (data) {
    this.updateData (data);
    const strData = JSON.stringify (data);
    localStorage.setItem ('diary', strData);
  },
  updateData: function (data) {
    this.initData = data;
  },
  hasRecord: function (code) {
    if (!this.hasDiary ()) return null;
    const initData = this.initData;
    return initData.filter (item => item.code === code);
  },
  resetDiary: function () {
    localStorage.removeItem ('diary');
    this.updateData (null);
  },
};

export {store};
