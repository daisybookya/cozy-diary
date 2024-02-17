import "../assets/css/mainPage.scss";
import PageDate from "../components/PageDate";
import Select from "../components/Select";
import DailyQuery from "../components/DailyQuery";
import ThanksQuery from "../components/ThanksQuery";
import { markDay } from "../utils/calendar";
import Modal from "../components/Modal";
import { dailyType } from "../utils/basic";
import { useState } from "react";
import { useSetting, useSettingDispatch } from "../reducer/settingContext";
import { store } from "../utils/localStore";
import { useNavigate } from "react-router-dom";
export default function AddPage() {
  const setting = useSetting();
  const dispatch = useSettingDispatch();
  const init = +dailyType[0]["id"];
  const [type, setType] = useState(init);
  const [showModal, setModal] = useState(false);
  const navigate = useNavigate();
  function handleSelect(e) {
    const selected = e.target.value;
    setType(selected);
  }
  function handleData(data) {
    const { wTime, wData, wType } = data;
    const records = {
      Date: setting.onDate,
      Content: wData,
      Time: wTime,
      Type: wType,
    };
    const sumData = {
      code: `${setting.onDate}`,
      record: [records],
    };
    saveData(sumData, wType);
    setModal(true);
  }
  function saveData(data) {
    let result = store.hasRecord(data.code);

    let totalData = setting.dataList;
    if (!result) {
      //沒有任何資料
      let newData = [data];
      dispatchData(newData);
      store.saveToLocal(newData);
    } else if (!result.length) {
      //[]
      totalData.push(data);
      dispatchData(totalData);
      store.saveToLocal(totalData);
    } else {
      //[{...}]
      const newRecord = result[0].record.concat(data.record);
      result[0].record = newRecord;
      let index = totalData.findIndex((item) => item.code == data.code);
      totalData[index] = result[0];
      dispatchData(totalData);
      store.saveToLocal(totalData);
    }
  }
  function dispatchData(data) {
    dispatch({
      type: "updated",
      dataList: data,
    });
  }
  function filterType(selected) {
    const typeObj = dailyType.filter((item) => `${item.id}` == selected)[0];
    switch (typeObj.id) {
      case 11:
        return (
          <DailyQuery
            onSubmit={handleData}
            onCancel={handleCancel}
          ></DailyQuery>
        );
      case 12:
        return (
          <ThanksQuery
            onSubmit={handleData}
            onCancel={handleCancel}
          ></ThanksQuery>
        );
    }
  }
  function handleModal() {
    markDay(setting.dataList, setting.month);
    navigate("/day");
    setModal(false);
  }
  function handleCancel() {
    navigate("/day");
  }
  return (
    <>
      <div className="page-nav">
        <PageDate></PageDate>
        <div className="nav">
          <div className="box-select">
            <Select onSelect={handleSelect} checked={type}></Select>
          </div>
        </div>
      </div>
      <div className="content">{filterType(type)}</div>
      <Modal open={showModal}>
        <p>發文紀錄成功！</p>
        <p>
          <button className="btn-sub" onClick={handleModal}>
            確定
          </button>
        </p>
      </Modal>
    </>
  );
}
