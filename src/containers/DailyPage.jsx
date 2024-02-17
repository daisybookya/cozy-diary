import "../assets/css/mainPage.scss";
import PageDate from "../components/PageDate";
import DailyList from "../components/DailyList";
import ThanksThing from "../components/ThanksThing";
import { dailyType, filterType } from "../utils/basic";
import { useNavigate } from "react-router-dom";
import { store } from "../utils/localStore";
import { markDay } from "../utils/calendar";
import { useSetting, useSettingDispatch } from "../reducer/settingContext";
import { useState } from "react";
export default function DailyPage() {
  const setting = useSetting();
  const dispatch = useSettingDispatch();
  const navigate = useNavigate();
  const allData = setting.dataList;
  const [open, setOpen] = useState(false);
  function addDiary() {
    navigate("/add");
  }
  function drawElems(data, type) {
    const dayList = data.filter((item) => item.code == setting.onDate);
    let typeList = [];
    let typeElems = null;
    let typeName = dailyType.find((item) => item.id == type);
    typeName = typeName.name;
    switch (type) {
      case 11:
        typeList = filterType(dayList[0].record, type);
        typeElems = typeList.map((item, index) => (
          <DailyList
            open={open}
            onClose={handleDel}
            key={index}
            list={item}
          ></DailyList>
        ));
        break;
      case 12:
        typeList = filterType(dayList[0].record, 12);
        typeElems = typeList.map((item, index) => (
          <ThanksThing
            open={open}
            key={index}
            items={item}
            onClose={handleDel}
          ></ThanksThing>
        ));
        break;
    }
    if (!typeList.length) return false;
    return (
      <div className="all-list">
        <p className="type-title">-{typeName}</p>
        <div className="list">{typeElems}</div>
      </div>
    );
  }
  function checkData(data) {
    if (data) {
      let hasMark = data.filter((item) => item.code === setting.onDate);
      if (hasMark.length) return true;
    }
    return false;
  }
  function handleDel(time) {
    const copyData = setting.dataList;
    const outIndex = copyData.findIndex((item) => item.code == setting.onDate);
    if (outIndex !== -1) {
      const dataIndex = copyData[outIndex].record.findIndex(
        (item) => item["Time"] == time
      );
      copyData[outIndex].record.splice(dataIndex, 1);
      if (!copyData[outIndex].record.length) {
        copyData.splice(outIndex, 1);
        openMange();
      }
      store.saveToLocal(copyData);
      dispatch({
        type: "updated",
        dataList: copyData,
      });
      markDay(copyData, setting.month);
    }
  }
  function openMange() {
    setOpen(!open);
  }
  return (
    <>
      <div className="page-nav">
        <PageDate></PageDate>
        <div className="daily-nav">
          <button className="btn-pri" onClick={addDiary}>
            新增記事
          </button>
          <button className={`btn-sub ${open ? "on" : ""}`} onClick={openMange}>
            管理日記
          </button>
        </div>
      </div>
      {checkData(allData) ? (
        dailyType.map((type, index) => (
          <div key={index}>{drawElems(allData, type.id)}</div>
        ))
      ) : (
        <div>本日沒有日記，歡迎新增記事</div>
      )}
    </>
  );
}
