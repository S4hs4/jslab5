// =============================================================
// ЗАВДАННЯ 1: Конвертер температур (Фаренгейт <-> Цельсій)
// =============================================================
function initTemperatureConverter() {
  const inputF = document.getElementById("tempF");
  const inputC = document.getElementById("tempC");

  // Формула: C = 5/9 * (F - 32)
  inputF.addEventListener("input", () => {
    if (inputF.value === "") {
      inputC.value = "";
      return;
    }
    const f = parseFloat(inputF.value);
    const c = (5 / 9) * (f - 32);
    inputC.value = c.toFixed(2);
  });

  // Формула: F = (C * 9/5) + 32
  inputC.addEventListener("input", () => {
    if (inputC.value === "") {
      inputF.value = "";
      return;
    }
    const c = parseFloat(inputC.value);
    const f = (c * 9) / 5 + 32;
    inputF.value = f.toFixed(2);
  });
}

// =============================================================
// ЗАВДАННЯ 2: Перевірка таблиці множення (Введення відповіді)
// =============================================================
function initMultiplicationTest1() {
  let num1 = 0,
    num2 = 0,
    correctAns = 0;
  let totalTasks = 0,
    correctCount = 0;

  const scoreDiv = document.getElementById("multScore1");
  const taskSpan = document.getElementById("taskText1");
  const userAnsInput = document.getElementById("userAns1");
  const checkBtn = document.getElementById("btnCheck1");
  const nextBtn = document.getElementById("btnNext1");
  const resultMsg = document.getElementById("resultMsg1");

  function generateTask() {
    num1 = Math.floor(Math.random() * 9) + 2; // 2..10
    num2 = Math.floor(Math.random() * 9) + 2;
    correctAns = num1 * num2;

    taskSpan.textContent = `${num1} × ${num2} = `;
    userAnsInput.value = "";
    userAnsInput.disabled = false;
    checkBtn.disabled = false;
    resultMsg.textContent = "";
  }

  function updateScore() {
    const percent =
      totalTasks > 0 ? Math.round((correctCount / totalTasks) * 100) : 100;
    scoreDiv.textContent = `Загальний рахунок ${percent}% (${correctCount} правильних відповідей з ${totalTasks})`;
  }

  checkBtn.addEventListener("click", () => {
    const userVal = parseInt(userAnsInput.value, 10);
    if (isNaN(userVal)) return;

    totalTasks++;
    userAnsInput.disabled = true;
    checkBtn.disabled = true;

    if (userVal === correctAns) {
      correctCount++;
      resultMsg.className = "status-msg success-msg";
      resultMsg.textContent = "Правильно!";
    } else {
      resultMsg.className = "status-msg error-msg";
      resultMsg.textContent = `Помилка, правильна відповідь «${correctAns}»`;
    }
    updateScore();
  });

  nextBtn.addEventListener("click", generateTask);
  generateTask();
}

// =============================================================
// ЗАВДАННЯ 3: Перевірка таблиці множення (Радіокнопки)
// =============================================================
function initMultiplicationTest2() {
  let num1 = 0,
    num2 = 0,
    correctAns = 0;
  let totalTasks = 0,
    correctCount = 0;

  const scoreDiv = document.getElementById("multScore2");
  const taskSpan = document.getElementById("taskText2");
  const container = document.getElementById("radioOptionsContainer");
  const nextBtn = document.getElementById("btnNext2");
  const resultMsg = document.getElementById("resultMsg2");

  function generateTask() {
    num1 = Math.floor(Math.random() * 9) + 2;
    num2 = Math.floor(Math.random() * 9) + 2;
    correctAns = num1 * num2;

    taskSpan.textContent = `${num1} × ${num2} = `;
    container.innerHTML = "";
    resultMsg.textContent = "";

    // Генерація 4 варіантів відповідей
    let options = new Set([correctAns]);
    while (options.size < 4) {
      let wrong = correctAns + (Math.floor(Math.random() * 10) - 5);
      if (wrong > 0 && wrong !== correctAns) options.add(wrong);
    }

    let arrOptions = Array.from(options).sort(() => Math.random() - 0.5);

    arrOptions.forEach((opt) => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.cursor = "pointer";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "multRadio";
      radio.value = opt;

      radio.addEventListener("change", () => {
        // Блокуємо всі радіокнопки після першого вибору
        const allRadios = container.querySelectorAll('input[type="radio"]');
        allRadios.forEach((r) => (r.disabled = true));

        totalTasks++;
        if (opt === correctAns) {
          correctCount++;
          resultMsg.className = "status-msg success-msg";
          resultMsg.textContent = "Правильно!";
        } else {
          resultMsg.className = "status-msg error-msg";
          resultMsg.textContent = `Помилка, правильна відповідь «${correctAns}»`;
        }
        updateScore();
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(` ${opt}`));
      container.appendChild(label);
    });
  }

  function updateScore() {
    const percent =
      totalTasks > 0 ? Math.round((correctCount / totalTasks) * 100) : 100;
    scoreDiv.textContent = `Загальний рахунок ${percent}% (${correctCount} правильних відповідей з ${totalTasks})`;
  }

  nextBtn.addEventListener("click", generateTask);
  generateTask();
}

// =============================================================
// ЗАВДАННЯ 4: Ротатор фотографій (Тематика: Собаки)
// =============================================================
function initPhotoRotator(containerId, imagesArray) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  let currentIndex = 0;

  // Створення елементів через document.createElement (без innerHTML для структури)
  const headerText = document.createElement("div");
  headerText.style.fontWeight = "bold";
  headerText.style.marginBottom = "8px";

  const mainArea = document.createElement("div");
  mainArea.className = "rotator-container";

  const btnPrev = document.createElement("span");
  btnPrev.className = "rotator-nav";
  btnPrev.textContent = "Назад";

  const imgEl = document.createElement("img");
  imgEl.className = "rotator-img";

  const btnNext = document.createElement("span");
  btnNext.className = "rotator-nav";
  btnNext.textContent = "Вперед";

  const footerTitle = document.createElement("div");
  footerTitle.style.fontWeight = "bold";
  footerTitle.style.marginTop = "8px";

  const footerDesc = document.createElement("div");
  footerDesc.style.color = "#555";

  // Збірка DOM структури
  mainArea.appendChild(btnPrev);
  mainArea.appendChild(imgEl);
  mainArea.appendChild(btnNext);

  container.appendChild(headerText);
  container.appendChild(mainArea);
  container.appendChild(footerTitle);
  container.appendChild(footerDesc);

  function updateRotator() {
    const currentImg = imagesArray[currentIndex];

    headerText.textContent = `Фотографія ${currentIndex + 1} з ${imagesArray.length}`;
    imgEl.src = currentImg.path;
    imgEl.alt = currentImg.title;
    footerTitle.textContent = currentImg.title;
    footerDesc.textContent = currentImg.description;

    // Ховати "Назад" на першому фото, "Вперед" на останньому
    if (currentIndex === 0) {
      btnPrev.classList.add("hidden");
    } else {
      btnPrev.classList.remove("hidden");
    }

    if (currentIndex === imagesArray.length - 1) {
      btnNext.classList.add("hidden");
    } else {
      btnNext.classList.remove("hidden");
    }
  }

  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateRotator();
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < imagesArray.length - 1) {
      currentIndex++;
      updateRotator();
    }
  });

  updateRotator();
}

// =============================================================
// ЗАВДАННЯ 5: Генератор Captcha
// =============================================================
function initCaptcha(digitsCount = 4) {
  let generatedCaptcha = "";

  const displayBox = document.getElementById("captchaDisplay");
  const inputEl = document.getElementById("captchaInput");
  const checkBtn = document.getElementById("btnCheckCaptcha");
  const reloadBtn = document.getElementById("btnReloadCaptcha");
  const resultMsg = document.getElementById("captchaResult");

  function generateCaptcha() {
    generatedCaptcha = "";
    displayBox.innerHTML = "";
    resultMsg.textContent = "";
    inputEl.value = "";

    for (let i = 0; i < digitsCount; i++) {
      const digit = Math.floor(Math.random() * 10);
      generatedCaptcha += digit;

      // Відображення числа у вигляді span-блоків
      const span = document.createElement("span");
      span.className = "captcha-pixel";
      span.textContent = digit;
      displayBox.appendChild(span);
    }
  }

  checkBtn.addEventListener("click", () => {
    const userVal = inputEl.value.trim();
    if (userVal === generatedCaptcha) {
      resultMsg.className = "status-msg success-msg";
      resultMsg.textContent = "Успішно! Капчу введено правильно.";
    } else {
      resultMsg.className = "status-msg error-msg";
      resultMsg.textContent = "Помилка! Введено неправильне число.";
    }
  });

  reloadBtn.addEventListener("click", generateCaptcha);
  generateCaptcha();
}

// =============================================================
// ЗАПУСК УСІХ ФУНКЦІЙ ПІСЛЯ ЗАВАНТАЖЕННЯ DOM
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Конвертер
  initTemperatureConverter();

  // 2. Таблиця множення (Input)
  initMultiplicationTest1();

  // 3. Таблиця множення (Radio)
  initMultiplicationTest2();

  // 4. Масив собак для галереї (Варіант №3)
  const dogsImages = [
    {
      path: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80",
      title: "Золотистий ретривер",
      description: "Дружелюбний та активний домашній улюбленець.",
    },
    {
      path: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80",
      title: "Французький бульдог",
      description: "Компактний собака з грайливим характером.",
    },
    {
      path: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
      title: "Німецька вівчарка",
      description: "Розумний та відданий службовий собака.",
    },
  ];
  initPhotoRotator("rotator", dogsImages);

  // 5. Капча (4 цифри)
  initCaptcha(4);
});
