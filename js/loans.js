const loanSummary = document.getElementById("loanSummary");
const loanTable = document.getElementById("loanTable");
const calcForm = document.getElementById("calcForm");
const borrowDate = document.getElementById("borrowDate");
const userGroup = document.getElementById("userGroup");
const calcResult = document.getElementById("calcResult");
const finePerDay = 500;

function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toDateString(date);
}

function addDays(dateString, days) {
  const parts = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().split("T")[0];
}

function daysBetween(startDate, endDate) {
  const start = Date.UTC(...startDate.split("-").map(Number));
  const end = Date.UTC(...endDate.split("-").map(Number));
  return Math.round((end - start) / 86400000);
}

function displayDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString();
}

function addCell(row, value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  row.appendChild(cell);
}

function renderLoans() {
  const sampleLoans = [
    { resourceId: 3, borrowedDate: daysAgo(18), loanDays: 14 },
    { resourceId: 6, borrowedDate: daysAgo(4), loanDays: 21 }
  ];
  const today = toDateString(new Date());
  let overdueCount = 0;
  let totalFine = 0;

  loanTable.innerHTML = "";

  sampleLoans.forEach(function (loan) {
    const resource = resources.find(function (item) {
      return item.id === loan.resourceId;
    });
    const dueDate = addDays(loan.borrowedDate, loan.loanDays);
    const daysOverdue = Math.max(0, daysBetween(dueDate, today));
    const fine = daysOverdue * finePerDay;
    const row = document.createElement("tr");

    if (daysOverdue > 0) {
      row.className = "row-overdue";
      overdueCount += 1;
    }
    totalFine += fine;

    addCell(row, resource.title);
    addCell(row, displayDate(loan.borrowedDate));
    addCell(row, displayDate(dueDate));
    addCell(row, daysOverdue > 0 ? daysOverdue + " day(s) overdue" : "On time");
    addCell(row, String(fine));
    loanTable.appendChild(row);
  });

  loanSummary.textContent =
    sampleLoans.length + " sample loan(s); " +
    overdueCount + " overdue; total estimated fines: " + totalFine + ".";
}

calcForm.addEventListener("submit", function (event) {
  event.preventDefault();
  calcResult.hidden = false;

  if (!borrowDate.value) {
    calcResult.className = "message message-error";
    calcResult.textContent = "Choose a borrow date.";
    return;
  }

  const today = toDateString(new Date());
  if (borrowDate.value > today) {
    calcResult.className = "message message-error";
    calcResult.textContent = "The borrow date cannot be in the future.";
    return;
  }

  const dueDate = addDays(borrowDate.value, Number(userGroup.value));
  calcResult.className = "message message-success";
  calcResult.textContent = "Expected return date: " + displayDate(dueDate) + ".";
});

borrowDate.max = toDateString(new Date());
renderLoans();
