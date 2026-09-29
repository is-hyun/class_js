// app.js

// 공통 요소 선택
const getTodoBtn = document.getElementById("getTodoBtn");
const postBtn = document.getElementById("postBtn");
const patchBtn = document.getElementById("patchBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");
const listBtn = document.getElementById("listBtn");
const resultDisplay = document.getElementById("resultDisplay");
const todoList = document.getElementById("todoList");

// API 기본 주소 - http://localhost:8080/api
const BASE_URL = "https://jsonplaceholder.typicode.com";

// 결과를 pre 태그에 보여주는 헬퍼 함수
function showResult(data) {
  resultDisplay.textContent = JSON.stringify(data, null, 2);
}

// =======================================
// 1. GET
// =======================================
async function fetchTodo() {
  resultDisplay.textContent = "Loading (GET) ······";

  try {
    // 1) 요청 전송 후 응답 도착까지 대기
    //    fetch 함수에서 기본값을 GET 요청 중
    const response = await fetch(`${BASE_URL}/todos/1`); // 반환 타입 : promise

    console.log(response.status);

    // 2) 응답 본문
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌리기
    showResult(data);
  } catch (error) {
    // 인터넷 접속 불량 등의 이유로 요청 실패 시
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}

// 1-1. GET 조회 - then 사용
function fetchTodo2() {
  resultDisplay.textContent = "Loading (GET) .....";

  // fetch는 Promise 반환
  // 메서드를 사용하지 않으면 기본 GET 요청
  fetch(`${BASE_URL}/todos/100`, { method: "GET" })
    .then((response) => {
      // 1) 응답 도착 시 실행
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      // 응답 본문 문자열을 js Object로 파싱해서 넘겨받는다
      console.log(data);
      showResult(data); // 내부에서 다시 객체를 문자열로 변경
    })
    .catch((error) => {
      resultDisplay.textContent = "요청 실패 : " + error.message;
    });
}

getTodoBtn.addEventListener("click", fetchTodo2);

// =======================================
// 2. POST
// =======================================

async function createTodo() {
  resultDisplay.textContent = "Loading (POST) .....";

  const newTodo = { title: "자바스크립트복습", completed: false, userId: 1 };

  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newTodo), // 객체를 문자열로 바꿔 보내야 함
    });
    console.log(response.status);
    const data = await response.json();
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}
postBtn.addEventListener("click", createTodo);

// =======================================
// 3. PATCH
// =======================================
async function patchTodo() {
  resultDisplay.textContent = "Loading (PATCH) .....";

  const patchTodo = { title: "PATCH 변경" };

  try {
    const response = await fetch(`${BASE_URL}/todos/100`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(patchTodo),
    });
    console.log(response.status);
    const data = await response.json();
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}
patchBtn.addEventListener("click", patchTodo);

// =======================================
// 4. PUT
// =======================================
async function putTodo() {
  resultDisplay.textContent = "Loading (PUT) .....";

  const putTodo = { title: "PUT 변경", userId: "111", completed: true };

  try {
    const response = await fetch(`${BASE_URL}/todos/100`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(putTodo),
    });
    console.log(response.status);
    const data = await response.json();
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}
putBtn.addEventListener("click", putTodo);

// =======================================
// 5. DELETE
// =======================================
async function deleteTodo() {
  resultDisplay.textContent = "Loading (DELETE) .....";

  try {
    const response = await fetch(`${BASE_URL}/todos/100`, {
      method: "DELETE",
    });
    console.log(response.status);
    const data = await response.json();
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}
deleteBtn.addEventListener("click", deleteTodo);

// =======================================
// 6. LISLT
// =======================================
function list() {
  resultDisplay.textContent = "Loading (LIST) .....";

  fetch(`${BASE_URL}/todos`)
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((dataList) => {
      todoList.innerHTML = "";
      dataList.forEach((todo) => {
        todoList.innerHTML += `<li>${todo.title}</li>`;
      });
      console.log(dataList);
      // showResult(dataList);
    })
    .catch((error) => {
      resultDisplay.textContent = "요청 실패 : " + error.message;
    });
}
listBtn.addEventListener("click", list);
