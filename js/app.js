const bookmarkBtn = document.getElementById("bookmark-btn");
const cardContainer = document.getElementById("bookmark-container");

function makeBookmarkCard() {
  cardContainer.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("bookmarkItems")) || [];

  items.forEach((item, i) => {
    const { name, url } = item;
    const div = document.createElement("div");
    div.innerHTML = `
         <a href="${url}" target="_blank" rel="noopener noreferrer"
            class="text-green-500 font-semibold text-base hover:underline capitalize"
            >${name}</a>
  `;

    div.className =
      "flex justify-between items-center bg-slate-200 py-2 px-5 rounded-md";
    const removeBtn = document.createElement("button");
    removeBtn.className =
      "btn font-medium text-base rounded-lg border-none bg-transparent p-1.5";
    removeBtn.innerHTML = "❌";
    div.append(removeBtn);
    removeBtn.addEventListener("click", () => {
      items.splice(i, 1);
      localStorage.setItem("bookmarkItems", JSON.stringify(items));
      makeBookmarkCard();
    });

    cardContainer.append(div);
  });
}

function addBookmark(e) {
  e.preventDefault();
  const nameEl = document.getElementById("bookmark-name");
  const urlEl = document.getElementById("bookmark-url");
  const name = nameEl.value.trim();
  const url = urlEl.value.trim();

  if (!name || !url) {
    alert("Please fill up bookmark first!");
    return;
  }

  const storedItems = JSON.parse(localStorage.getItem("bookmarkItems")) || [];
  storedItems.push({ name, url });
  localStorage.setItem("bookmarkItems", JSON.stringify(storedItems));

  makeBookmarkCard();
  nameEl.value = "";
  urlEl.value = "";
}
window.onload = makeBookmarkCard;
// const items = JSON.parse(localStorage.getItem("bookmarkItems")) || [];
// console.log(items);

bookmarkBtn.addEventListener("click", addBookmark);
