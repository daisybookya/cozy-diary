import Container from "../components/Container";
import "../assets/css/setting.scss";
import ExcelJs from "exceljs";
import Modal from "../components/Modal";
import ButtonGroup from "../components/ButtonGroup";
import { theme, exportType } from "../utils/basic";
import { useSettingDispatch, useSetting } from "../reducer/settingContext";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../utils/localStore";
import { clearClickMark } from "../utils/calendar";
import { exportExcel } from "../utils/export";

export default function Setting() {
  const set = useSetting();
  const Ref = useRef(11);
  const [openModal, setOpen] = useState(false);
  const [type, setType] = useState(true);
  const [color, setTheme] = useState(set.theme);
  const dispatch = useSettingDispatch();
  const Nav = useNavigate();
  function changeTheme(result) {
    setTheme(result);
  }
  function handleModal(isSure) {
    setOpen(false);
    if (!isSure) return false;
    dispatch({
      type: "updated",
      dataList: null,
    });
    store.resetDiary();
    clearClickMark();
    Nav("/home");
  }
  function handleExport() {
    const id = Ref.current;
    const diary = store.getLocalData();
    if (!diary || !diary.length) {
      alert("日記是空的！");
      return false;
    }
    let selected = exportExcel.getRecord(diary, id);
    if (!selected.length) {
      alert("日記沒有資料！");
      return false;
    }
    selected.sort((a, b) => {
      const numA = new Date(a["Date"]).getTime();
      const numB = new Date(b["Date"]).getTime();
      return numA - numB;
    });
    const cols = exportExcel.getCols(id);
    const rows = exportExcel.getRow(selected);
    const sheetName = exportExcel.getDiaryName(id);
    const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
    const sheet = workbook.addWorksheet("diary"); //在檔案中新增工作表 參數放自訂名稱
    sheet.addTable({
      name: "diary",
      ref: "A1", // 從A1開始
      columns: cols,
      rows: rows,
    });
    workbook.xlsx.writeBuffer().then((content) => {
      const link = document.createElement("a");
      const blobData = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      link.download = `${sheetName}-diary.xlsx`;
      link.href = URL.createObjectURL(blobData);
      link.click();
    });
  }
  function handleTheme(change) {
    //確定改變主題
    setOpen(false);
    if (!change) {
      return false;
    }
    dispatch({
      type: "changed",
      theme: color,
    });
    store.saveTheme(color);
  }
  function handleSetting(isTheme) {
    //改變modal的內容
    setOpen(true);
    if (isTheme) {
      setType(true);
    } else {
      setType(false);
    }
  }
  function getModal(isTheme) {
    if (!isTheme) {
      return (
        <>
          <p>確定要重置日記嗎？日記內容將會全部清空</p>
          <p>
            <button className="btn-sub" onClick={() => handleModal(false)}>
              取消
            </button>
            <button className="btn-sub" onClick={() => handleModal(true)}>
              確定
            </button>
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>確定要更改日記主題配色嗎？</p>
          <p>
            <button className="btn-sub" onClick={() => handleTheme(false)}>
              取消
            </button>
            <button className="btn-sub" onClick={() => handleTheme(true)}>
              確定
            </button>
          </p>
        </>
      );
    }
  }
  return (
    <Container>
      <div className="sub-container setting">
        <h1>設定</h1>
        <section className="part">
          <p className="point">基本設定</p>
          <ul>
            <li>
              <span>主題配色：</span>
              {
                <ButtonGroup
                  obj={theme}
                  defaultValue={set.theme}
                  onSelect={changeTheme}
                ></ButtonGroup>
              }
              <button onClick={() => handleSetting(true)}>保存設定</button>
            </li>
            <li>- 請先選擇想要的主題配色，再點選按鈕-保存設定。</li>
            <li>
              <span>清空日記：</span>
              <button onClick={() => handleSetting(false)}>重置日記</button>
            </li>
          </ul>
        </section>
        <section className="part">
          <p className="point">關於本日記</p>
          <ul>
            <li>
              -
              本日記內容紀錄在瀏覽器裝置上，換裝置後無法從瀏覽器看到相同的日記內容，若要保存內容請按下方匯出日記。
            </li>
            <li>
              - 如果使用公共電腦裝置，請勿紀錄私密訊息，以免洩露重要資訊。
            </li>

            <li>
              <span>匯出日記：</span>
              {
                <ButtonGroup
                  obj={exportType}
                  defaultValue={exportType[0].value}
                  onSelect={(type) => {
                    Ref.current = type;
                  }}
                ></ButtonGroup>
              }
              <button onClick={handleExport}>下載日記Excel</button>
            </li>
            <li>
              - 請先選擇想要匯出的日記類型，再點選按鈕-下載日記excel檔案。
            </li>
          </ul>
        </section>
      </div>
      <Modal open={openModal}>{getModal(type)}</Modal>
    </Container>
  );
}
