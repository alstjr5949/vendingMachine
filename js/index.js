const balanceMoney = document.querySelector(".balanceMoney");
const depositForm = document.querySelector(".depositForm");

// 소지금 입금
depositForm.addEventListener("submit", (e) => {
  const dimBox = document.querySelector(".dim");
  const moneyModal = document.querySelector(".moneyModal");
  e.preventDefault();
  let depositMoney = +e.target[0].value;
  if (depositMoney === 0 || depositMoney < 1000) {
    e.target[0].style.outline = "1px solid red";
  } else if (depositMoney <= 1000000) {
    dimBox.classList.add("hide");
    moneyModal.classList.add("hide");
    balanceMoney.innerText = `${depositMoney.toLocaleString("ko-KR")} 원`;
  } else {
    e.target[0].style.outline = "1px solid red";
  }
});

// 잔액 입금
const depositBtn = document.querySelector(".depositBtn");

depositBtn.addEventListener("click", () => {
  const depositInput = document.querySelector(".depositInput");
  const balanceMoneyLeft = document.querySelector(".balanceMoneyLeft");
  const myMoney =
    balanceMoney.innerText.slice(0, 2) + balanceMoney.innerText.slice(3, 6);
  const depositMoney = +depositInput.value;
  if (depositMoney > myMoney) {
    alert("소지금을 확인해보세요.");
  } else {
    balanceMoneyLeft.innerText = `${depositMoney.toLocaleString("ko-KR")} 원`;
    balanceMoney.innerText = `${(myMoney - depositMoney).toLocaleString(
      "ko-KR"
    )} 원`;
    depositInput.value = "";
  }
});

// 거스름돈 반환
const changeBtn = document.querySelector(".changeBtn");

changeBtn.addEventListener("click", () => {
  const balanceMoneyLeft = document.querySelector(".balanceMoneyLeft");
  const balanceMoneyValue =
    balanceMoneyLeft.innerText.slice(0, 2) +
    balanceMoneyLeft.innerText.slice(3, 6);
  const myMoney =
    balanceMoney.innerText.slice(0, 2) + balanceMoney.innerText.slice(3, 6);
  if (balanceMoneyValue === "원") {
    alert("거스름돈이 있는지 확인하세요.");
  } else {
    balanceMoney.innerText = `${(+balanceMoneyValue + +myMoney).toLocaleString(
      "ko-KR"
    )} 원`;
    balanceMoneyLeft.innerText = " 원";
  }
});
