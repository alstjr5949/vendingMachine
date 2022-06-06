const balanceMoney = document.querySelector(".balanceMoney");
const depositForm = document.querySelector(".depositForm");

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
