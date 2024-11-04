document.addEventListener("DOMContentLoaded", () => {
  const transactionList = document.getElementById("transaction-list");

  const expenses = getExpenses();
  const incomes = getIncomes();

  const transactions = expenses.concat(incomes);

  transactions.forEach((item, index) => {
    // Main item container
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("w-100", "container", "bg-light", "d-flex", "justify-content-center", "align-items-center", "py-3", "mb-3", "rounded");

    // #region Number
    const itemNumber = document.createElement("div");
    itemNumber.classList.add("number-column", "fw-normal", "h6", "mt-2", "p-2");
    itemNumber.textContent = index + 1;
    // #endregion

    // #region transaction type
    const itemTransactionTypeContainer = document.createElement("div");
    itemTransactionTypeContainer.classList.add("transaction-column", "mt-2", "p-2", "d-flex", "align-items-center");

    // Icon
    const transactionColor = iconColor(item.transaction_type); // Get class for color icon
    const transactionIconClass = iconClass(item.transaction_type);

    const transactionIconContainer = document.createElement("div");
    transactionIconContainer.classList.add(transactionColor, "p-3", "icon", "d-flex", "me-2", "justify-content-center", "align-items-center", "rounded-circle");

    const transactionIcon = document.createElement("span");
    transactionIcon.classList.add("mdi", transactionIconClass, "h4", "mb-0");

    const transactionLabel = document.createElement("span");
    transactionLabel.classList.add("fw-bold");
    transactionLabel.textContent = item.transaction_type;

    // Insert child
    transactionIconContainer.appendChild(transactionIcon);

    itemTransactionTypeContainer.appendChild(transactionIconContainer);
    itemTransactionTypeContainer.appendChild(transactionLabel);
    // #endregion

    // #region amount
    const amountContainer = document.createElement("div");
    amountContainer.classList.add("amount-column", "fw-normal", "mt-2", "p-2", "d-flex", "flex-column");

    const currencySymbol = document.createElement("span");
    currencySymbol.classList.add("h6");
    currencySymbol.textContent = "USD";

    const amountLabel = document.createElement("span");
    amountLabel.classList.add("fw-bolder", "h6");
    amountLabel.textContent = "$125.00";

    // Insert child
    amountContainer.appendChild(currencySymbol);
    amountContainer.appendChild(amountLabel);
    // #endregion

    // #region category
    const categoryIconClass = iconClass(item.category);
    const categoryColor = iconColor(item.category);

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-column", "fw-normal", "h6", "mt-2", "p-2", "d-flex", "align-items-center");

    const categoryIconContainer = document.createElement("div");
    categoryIconContainer.classList.add("p-3", categoryColor, "icon", "d-flex", "me-2", "justify-content-center", "align-items-center", "rounded-circle");

    const categoryIcon = document.createElement("span");
    categoryIcon.classList.add("mdi", categoryIconClass, "h4", "mb-0");

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("fw-bold");
    categoryLabel.textContent = item.category;

    categoryIconContainer.appendChild(categoryIcon);
    categoryContainer.appendChild(categoryIconContainer);
    categoryContainer.appendChild(categoryLabel);
    // #endregion

    // #region datetime
    const datetimeContainer = document.createElement("div");
    datetimeContainer.classList.add("date-column", "fw-normal", "h6", "mt-2", "p-2");
    datetimeContainer.textContent = item?.date;
    // #endregion

    // #region Build item
    itemContainer.appendChild(itemNumber);
    itemContainer.appendChild(itemTransactionTypeContainer);
    itemContainer.appendChild(amountContainer);
    itemContainer.appendChild(categoryContainer);
    itemContainer.appendChild(datetimeContainer);
    // #endregion

    // Insert completed item in list
    transactionList.appendChild(itemContainer);
  });
});


const colors = {
  "sueldo": "salary-icon",
  "transferencia bancaria": "bank-transfer-icon",
  "ahorros": "savings-icon",
  "otros": "other-icon",
  "supermercado": "groceries-icon",
  "educación": "education-icon",
  "entretenimiento": "entertainment-icon",
  "salud": "health-icon",
  "servicios públicos": "utilities-icon"
};


const icons = {
  "sueldo": "mdi-cash-multiple",
  "transferencia bancaria": "mdi-bank-transfer",
  "ahorros": "mdi-piggy-bank",
  "otros": "mdi-dots-horizontal",
  "supermercado": "mdi-cart",
  "educación": "mdi-school",
  "entretenimiento": "mdi-movie",
  "salud": "mdi-hospital",
  "servicios públicos": "mdi-face-agent"
};

const iconColor = (value) => {
  const tag = value.toLowerCase();
  const color = colors[tag];
  console.log(tag)
  if (!color) {
    return "unknow-icon";
  }
  return color;
}

const iconClass = (value) => {
  const tag = value.toLowerCase();
  const icon = icons[tag];
  if (!icon) {
    return "mdi-help-circle-outline"
  }
  return icon;
}

