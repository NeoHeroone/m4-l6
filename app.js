const todoWrapperUL = document.querySelector(".todo-wrapper");
const completedWrapperUL = document.querySelector(".completed-wrapper");

const form = document.querySelector("form");
const count = document.querySelector(".count");
const countCompleted = document.querySelector(".count-completed");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const render = () => {
  completedWrapperUL.textContent = "";
  todoWrapperUL.textContent = "";
  count.textContent = todos.filter((e) => e.status === "todo").length;
  countCompleted.textContent = todos.filter(
    (e) => e.status === "completed"
  ).length;
  localStorage.setItem("todos", JSON.stringify(todos));
  todos.forEach((e) => {
    if (e.status === "completed") {
      const li = document.createElement("li");
      li.classList.add("todo-completed");
      const p = document.createElement("p");
      p.textContent = e.title;
      li.append(p);
      completedWrapperUL.prepend(li);
      li.addEventListener("click", () => {
        e.status = "todo";
        render();
      });
    } else {
      todoWrapperUL.innerHTML += `<li class="todo">
              <p>${e.title}</p>
              <div class="none-btns">
                <button onclick="confirmFn(${e.id})" class="bg-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 448 512"><path fill="#63E6BE" d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                </button>
                <button onclick="deleteFn(${e.id})" class="bg-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 448 512"><path fill="#63E6BE" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </button>
              </div>
            </li>`;
    }
  });
};
render();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = e.target[0].value;
  todos.unshift({
    title: value,
    status: "todo",
    id: new Date().getTime(),
  });
  e.target.reset();
  render();
});

const confirmFn = (id) => {
  const todoOne = todos.filter((e) => {
    return e.id === id;
  });
  todoOne[0].status = "completed";
  render();
};

const deleteFn = (id) => {
  const todoOne = todos.filter((e) => {
    return e.id !== id;
  });
  todos = todoOne;
  render();
};