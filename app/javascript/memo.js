const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form); //index.htmlのid(form)=>form_withの内容全てを新しい箱に入れて、formDataとする
    const XHR = new XMLHttpRequest();//コントローラーにリクエストを非同期通信で送るロボットの生成
    XHR.open("POST", "/posts", true);//createアクションのパス(/posts)で、保存をする（POST）という内容を指定
    XHR.responseType = "json";//レスポンスはjson形式で
    XHR.send(formData);//変数formDataを送る
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));//上記のHTMLをここで使う
      formText.value = "";//投稿フォームを空にする
    };
  });
};

window.addEventListener('turbo:load', post);