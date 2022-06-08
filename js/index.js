const balanceMoney = document.querySelector(".myMoneyNum");
const depositForm = document.querySelector(".depositForm");

//기능 function
const commaGenerator = (num) => {
  return num.toLocaleString("ko-KR");
};

const commaDelete = (string) => {
  return string.replace(/\,/g, "");
};

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
    balanceMoney.innerText = commaGenerator(depositMoney);
  } else {
    e.target[0].style.outline = "1px solid red";
  }
});

// 잔액 입금
const depositBtn = document.querySelector(".depositBtn");
depositBtn.addEventListener("click", () => {
  const depositInput = document.querySelector(".depositInput");
  const balanceMoneyLeft = document.querySelector(".balanceMoneyNum");
  const myMoney = +commaDelete(balanceMoney.innerText);
  const depositMoney = +depositInput.value;
  if (depositMoney > myMoney) {
    alert("소지금을 확인해보세요.");
  } else {
    balanceMoneyLeft.innerText = commaGenerator(depositMoney);
    balanceMoney.innerText = commaGenerator(myMoney - depositMoney);
    depositInput.value = "";
  }
});

// 거스름돈 반환
const changeBtn = document.querySelector(".changeBtn");

changeBtn.addEventListener("click", () => {
  const balanceMoneyNum = document.querySelector(".balanceMoneyNum");
  const balanceMoneyValue = +commaDelete(balanceMoneyNum.innerText);
  const myMoney = +commaDelete(balanceMoney.innerText);
  if (balanceMoneyValue == 0) {
    alert("거스름돈이 있는지 확인하세요.");
  } else {
    balanceMoney.innerText = commaGenerator(myMoney + balanceMoneyValue);
    balanceMoneyNum.innerText = "";
  }
});

// 음료 버튼 클릭
const purchaseBtn = document.querySelectorAll(".purchaseBtn");

let cartDrinkName = [];
// 왼쪽 아래 음료 리스트 생성 함수
const createDrink = (colaImg, colaName) => {
  const getDrinkListBox = document.querySelector(".getListBox");
  const drinkList = document.createElement("li");
  drinkList.classList.add("getList");
  drinkList.classList.add("getListLeft");
  const drinkImg = document.createElement("img");
  drinkImg.classList.add("cola");
  drinkImg.setAttribute("src", `${colaImg}`);
  const drinkName = document.createElement("strong");
  drinkName.innerText = colaName;
  const drinkCount = document.createElement("button");
  drinkCount.classList.add("getNum");
  drinkCount.setAttribute("type", "button");
  drinkCount.innerText = 1;
  drinkList.appendChild(drinkImg);
  drinkList.appendChild(drinkName);
  drinkList.appendChild(drinkCount);
  getDrinkListBox.appendChild(drinkList);
};

//중복 체크

purchaseBtn.forEach((purchaseBtn) => {
  purchaseBtn.addEventListener("click", (e) => {
    const balanceMoneyNum = document.querySelector(".balanceMoneyNum");
    let balanceMoneyValue = +commaDelete(balanceMoneyNum.innerText);
    const colaPrice = 1000;
    if (balanceMoneyValue >= 1000) {
      const list = e.target.parentNode;
      const img = list.childNodes[1].src;
      const colaName = list.childNodes[3].innerText;
      let checkFlag = false;
      cartDrinkName.forEach((drink) => {
        if (drink.colaName === colaName) {
          const drinkGetList = document.querySelectorAll(".getListLeft");
          drink.count += 1;
          checkFlag = true;
          drinkGetList.forEach((item) => {
            if (item.childNodes[1].innerText == drink.colaName) {
              item.childNodes[2].innerText = drink.count;
            }
          });
        }
      });
      if (checkFlag === false) {
        createDrink(img, colaName);
        cartDrinkName.push({ colaName, count: 1 });
      }
      // 문제
      balanceMoneyNum.innerText = `${(
        balanceMoneyValue - colaPrice
      ).toLocaleString("ko-KR")}`;
    } else {
      alert("잔액을 확인하세요.");
    }
  });
});
