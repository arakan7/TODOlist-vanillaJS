const onClickAdd = () => {
    // テキストボックスの値を取得し、初期化する
    let inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";

    createIncompleteList(inputText);
}

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
}

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
    // liタグ生成
    const li = document.createElement("li");

    // classがlist-rowのdivタグ生成
    const div = document.createElement("div");
    div.className = "list-row";

    // pタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    // button（完了）生成
    const completeButton = document.createElement("button");
    completeButton.innerText = "完了";
    completeButton.addEventListener("click", () => {
        // 押された完了ボタンの親の親タグ(li)を未完了リストから削除
        deleteFromIncompleteList(completeButton.parentNode.parentNode);

        // 完了リストに追加する要素
        const addTarget = completeButton.parentNode.parentNode;

        // TODO内容テキストを取得
        const text = addTarget.firstElementChild.firstElementChild.innerText;

        // div以下を初期化
        addTarget.firstElementChild.textContent = null;

        // pタグに取得したものを代入
        p.innerText = text;

        // buttonタグ（戻す）生成
        const backButton = document.createElement("button");
        backButton.addEventListener("click", () => {
            // 押された戻すボタンの親の親タグ(li)を完了リストから削除
            const deleteTarget = backButton.parentNode.parentNode;
            document.getElementById("complete-list").removeChild(deleteTarget);

            // テキスト取得
            const text = backButton.parentNode.firstElementChild.innerText;
            createIncompleteList(text);
        })
        backButton.innerText = "戻す";

        // divタグにpタグ、buttonタグ（戻す）を追加
        div.appendChild(p);
        div.appendChild(backButton);

        document.getElementById("complete-list").appendChild(addTarget);
    })

    // button（削除）生成
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    deleteButton.addEventListener("click", () => {
        // 押された削除ボタンの親の親タグ(li)を未完了リストから削除
        deleteFromIncompleteList(deleteButton.parentNode.parentNode);
    })

    // divタグにp,button（完了）,button（削除）追加
    div.appendChild(p);
    div.appendChild(completeButton);
    div.appendChild(deleteButton);

    // liタグにdivタグ追加
    li.appendChild(div);

    // 未完了リストにli追加
    document.getElementById("incomplete-list").appendChild(li);
}

document.getElementById("add-button").addEventListener("click", () => onClickAdd());