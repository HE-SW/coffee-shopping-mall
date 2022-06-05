import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';
import insertCategoryList from '../components/navCategoryList.js';
import { validateRegister } from '../utils/validateForm.js';
import alertModal from '/components/alertModal.js';
import successModal from '/components/successModal.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const checkbox = document.querySelector('#checkbox');
addAllElements();
addAllEvents();
insertCategoryList();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const isAdmin = checkbox.checked;

  // 잘 입력했는지 확인
  try {
    validateRegister({ fullName, email, password, passwordConfirm });
  } catch (err) {
    return alertModal.handleError(err);
  }

  // 회원가입 api 요청
  try {
    const data = { fullName, email, password };
    if (isAdmin) {
      await Api.post('/api/user/admin', data);
    } else {
      await Api.post('/api/user/register', data);
    }
    successModal.activate(`정상적으로 회원가입되었습니다.`, function () {
      window.location.href = '/login';
    });

    // 로그인 페이지 이동
  } catch (err) {
    console.error(err.stack);
    alertModal.handleError(`${err.message}`);
  }
}
