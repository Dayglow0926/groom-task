const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    active = false,
    rowName,
    columnName
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.active = active;
    this.rowName = rowName;
    this.columnName = columnName;
  }
}

function initSpreadsheet() {
  for (let i = 0; i < ROWS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = "";

      //모든 row 첫 번째 컬럼에 숫자 넣기
      if (i + j === 0) cellData = "";
      else if (j === 0) cellData = i;
      else if (i === 0) cellData = String.fromCharCode(j + 64);

      const isHeader = !Boolean(i * j);
      const cell = new Cell(
        isHeader,
        isHeader,
        cellData,
        i,
        j,
        isHeader,
        i,
        j === 0 ? "" : String.fromCharCode(j + 64)
      );
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
  console.log(spreadsheet);
}

function createCellElement(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = `cell_${cell.row}${cell.column}`;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) cellEl.classList.add("header");

  cellEl.onclick = () => handleCellClick(cell);
  cellEl.onchange = (e) => handleOnChange(e.target.value, cell);

  return cellEl;
}

function handleOnChange(data, cell) {
  cell.data = data;
}

function handleCellClick(cell) {
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeaderEl = getElFormRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFormRowCol(rowHeader.row, rowHeader.column);
  clearHeaderActiveStatus();
  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");
  document.querySelector(".cell-status").innerHTML =
    cell.columnName + "" + cell.rowName;
}

function getElFormRowCol(row, col) {
  return document.querySelector("#cell_" + row + col);
}

function clearHeaderActiveStatus() {
  const headers = document.querySelectorAll(".header");
  headers.forEach((header) => header.classList.remove("active"));
}

function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(createCellElement(cell));
    }

    spreadSheetContainer.append(rowContainerEl);
  }
}

initSpreadsheet();

// Excel 내보내기 불러오기 기능 추가
const exportBth = document.querySelector("#export-btn");

exportBth.onclick = function (e) {
  let csv = "";
  for (let i = 1; i < spreadsheet.length; i++) {
    csv +=
      spreadsheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\r\n";
  }

  const csvObj = new Blob([csv]);
  const csvUrl = URL.createObjectURL(csvObj);
  console.log("csv", csvUrl);

  const a = document.createElement("a");
  a.href = csvUrl;
  a.download = "Spreadsheet File Name.csv";
  a.click();
};
