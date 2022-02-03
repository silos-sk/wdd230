const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");

button.addEventListener("click", function () {
  if (input.value !== "") {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");

    li.textContent = input.value;
    delBtn.textContent = "\u0058";
    delBtn.setAttribute("aria-label", `Delete ${input.value}`);

    li.appendChild(delBtn);
    list.appendChild(li);

    delBtn.addEventListener("click", function () {
      list.removeChild(li);
    });

    input.focus();
    input.value = "";
  }
});
