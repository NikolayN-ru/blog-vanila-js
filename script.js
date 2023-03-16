const commentsList = document.querySelector(".comments-list");
const commentForm = document.querySelector("#comment-form");
const nameInput = commentForm.querySelector('[name="name"]');
const textArea = commentForm.querySelector('[name="text"]');
const dateInput = commentForm.querySelector('[name="date"]');

function createComment(name, text, date) {
  const elem = document.createElement("div");
  elem.classList.add("comment");
  const nameElem = document.createElement("h3");
  nameElem.textContent = name;
  elem.append(nameElem);
  const textElem = document.createElement("p");
  textElem.textContent = text;
  elem.append(textElem);

  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  const dateFormat =
    diff < 1
      ? "сегодня"
      : diff < 2
      ? "вчера"
      : `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

  const dateElem = document.createElement("span");
  dateElem.classList.add("comment-date");
  dateElem.textContent = `${dateFormat}, ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  elem.append(dateElem);

  const likeElem = document.createElement("button");
  likeElem.classList.add("comment-like");
  likeElem.innerHTML = "&hearts;";
  likeElem.addEventListener("click", () => {
    elem.classList.toggle("liked");
  });
  elem.append(likeElem);

  const deleteElem = document.createElement("button");
  deleteElem.classList.add("comment-delete");
  deleteElem.innerHTML = "&#128465;";
  deleteElem.addEventListener("click", () => {
    elem.remove();
  });
  elem.append(deleteElem);
  return elem;
}

function clearForm() {
  nameInput.value = "";
  textArea.value = "";
  dateInput.value = "";
}

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = true;
  if (!nameInput.value.trim()) {
    valid = false;
    nameInput.classList.add("invalid");
    commentForm.querySelector('[data-error="name"]').textContent =
      "Введите имя";
  }
  if (!textArea.value.trim()) {
    valid = false;
    textArea.classList.add("invalid");
    commentForm.querySelector('[data-error="text"]').textContent =
      "Введите текст";
  }
  if (!valid) {
    return;
  }
  const name = nameInput.value;
  const text = textArea.value;
  const date = dateInput.value ? new Date(dateInput.value) : new Date();
  const commentElem = createComment(name, text, date);
  commentsList.prepend(commentElem);
  clearForm();
});

[nameInput, textArea].forEach((input) =>
  input.addEventListener("input", () => {
    input.classList.remove("invalid");
    commentForm.querySelector(`[data-error="${input.name}"]`).textContent = "";
  })
);
