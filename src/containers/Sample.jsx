import Container from "../components/Container";
import "../assets/css/setting.scss";

export default function Sample() {
  return (
    <Container>
      <div className="sub-container sample">
        <h1>使用範本</h1>
        <section className="part">
          <p className="point">日記適合給什麼人使用？</p>
          <ul>
            <li>
              平常做事三分鐘熱度，常常半途而廢。本日記內容格式極簡，每天輕鬆練習紀錄內容，無形中培養紀錄習慣。
            </li>
            <li>
              粗心大意，常常忘東忘西。日記用途多廣，可以當作某些特定事項的日記，例如植物澆水紀錄．運動紀錄．繳費記錄等等。
            </li>
            <li>
              心志堅定．有上進心，希望利用日記達到目標。可以將日記當作未來日記使用，例如簡約的讀書計畫．目標導向存錢紀錄。
            </li>
            <li>
              希望人生充滿好運。透過書寫感恩日記，感恩的能量回流，將會為人生帶來好運！
            </li>
          </ul>
        </section>
        <section className="part">
          <p className="point">日記的使用方法</p>
          <ul>
            <li>
              紀錄特定事項，例如：澆水日記．運動日記．閱讀日記。
              <div className="sample-box">
                <figure>
                  <figcaption>花園A區澆水完成</figcaption>
                  多肉還不需要澆水，等到生根再澆水
                </figure>
                <figure>
                  <figcaption>初學者瑜伽30分鐘</figcaption>
                </figure>
                <figure>
                  <figcaption>財經投資閱讀兩本</figcaption>
                  ETF投資．股市基金
                </figure>
              </div>
            </li>
            <li>
              感恩日記，從人事物著手，根據《幸福優勢》的作者 Shawn Achor
              的說法，連續 21
              天寫下三件你感恩的新事物，可以幫助你重新配置你的大腦，讓你的思維積極且成功。
              <div className="sample-box">
                <figure>
                  <figcaption>
                    謝謝便當店的阿姨，今天多夾了一些菜給我。
                  </figcaption>
                </figure>
                <figure>
                  <figcaption>
                    謝謝今天是晴天好天氣，可以開心欣賞街景。
                  </figcaption>
                </figure>
                <figure>
                  <figcaption>謝謝我的摩托車，刮風下雨都陪著我。</figcaption>
                </figure>
              </div>
            </li>
            <li>
              三分鐘日記，紀錄今天最有印象的事情，至少連續２１天紀錄，漸進式培養寫日記的習慣。
              <div className="sample-box">
                <figure>
                  <figcaption>幼稚園老師提醒讓孩子少看電視與平板</figcaption>
                  盡量帶孩子去公園，或者多閱讀培養專注力
                </figure>
                <figure>
                  <figcaption>
                    下午茶的泡芙很好吃，下次可以再買那家店
                  </figcaption>
                  泡芙店：CV dessert
                </figure>
                <figure>
                  <figcaption>晚上感冒症狀出現，去耳鼻喉科看診</figcaption>
                  掛號費變200，看診醫師是黃醫師
                </figure>
              </div>
            </li>
            <li>
              未來日記，以目標導向做精簡計畫，例如：學習語言日記，每天立簡單目標，追求持久學習。
              <div className="sample-box">
                <figure>
                  <figcaption>日常單字一天２０個</figcaption>
                  每天複習前一天的單字
                </figure>
                <figure>
                  <figcaption>文法課本第五課</figcaption>
                </figure>
                <figure>
                  <figcaption>youtube日文聽力口說練習</figcaption>
                  每週看兩篇
                </figure>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
