import {exportType} from './basic';
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
const exportExcel = {
  getDiaryName: id => {
    const obj = exportType.find (item => item.value == id);
    return obj.name;
  },
  getRecord: (data, type) => {
    const recordData = data.reduce (
      (acc, current) => acc.concat (current.record),
      []
    );
    let filtered = recordData.filter (item => item['Type'] == type);
    return filtered;
  },
  getCols: type => {
    let names = [];
    switch (+type) {
      case 11: {
        names = ['日期', '標題', '備註', '填寫時間'];
        break;
      }
      case 12: {
        names = ['日期', '感恩的人', '感恩的事', '感恩的物品', '填寫時間'];
        break;
      }
    }
    return names.map (value => Object.assign ({}, {name: value}));
  },
  getRow: data => {
    const flatData = data.reduce ((acc, item) => {
      let content = [];
      if (item['Type'] == 12) {
        content = item['Content'].map (value => value.content);
      } else {
        content = Object.values (item['Content']);
      }
      const all = [item['Date']].concat (content);
      all.push (item['Time']);
      return [...acc, all];
    }, []);
    return flatData;
  },
};
export {exportExcel};
