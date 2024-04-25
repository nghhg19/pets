'use strict';

const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');
const submitBtn = document.getElementById('submit-btn');
const table = document.getElementById('tbody');

let petArr = JSON.parse(getFromStorage('arr')) ?? [];
let breedArr = JSON.parse(localStorage.getItem('breedarr')) ?? [];

console.log(breedArr);

// Hàm khởi tạo table breed
if (breedArr.length > 0) {
  for (let i = 0; i < breedArr.length; i++) {
    let row = table.insertRow(-1);
    for (let j = 0; j < breedArr[i].length; j++) {
      row.insertCell();
      row.cells[0].innerHTML = row.rowIndex;
      row.insertCell(j + 1).innerHTML = breedArr[i][j];
      row.cells[0].style.fontWeight = '600';
    }
    row.cells[3].innerHTML =
      '<button type="button" class="btn btn-danger">Delete</button>';
  }
}

// render table
function addBreedTable() {
  let row = table.insertRow(-1);
  row.insertCell(0);
  row.cells[0].innerHTML = row.rowIndex;
  for (let i = 0; i < breedArr[breedArr.length - 1].length; i++) {
    row.cells[0].style.fontWeight = '600';
    row.insertCell(i + 1).innerHTML = breedArr[breedArr.length - 1][i];
  }
  row.insertCell(3).innerHTML =
    '<button type="button" class="btn btn-danger">Delete</button>';
}

const DeleteRow = function (i) {
  breedArr.splice(i - 1, 1);
  saveToStorage('breedarr', breedArr);
  table.deleteRow(i - 1);
};

const resetBreed = function () {
  inputBreed.value = '';
  inputType.value = 'Select Type';
};

// btn thêm
submitBtn.addEventListener('click', function () {
  let checkBreed = breedArr.some(
    subArr => subArr[0] === inputBreed.value && subArr[1] === inputType.value
  );
  if (inputBreed.value == '') {
    alert('Select breed!!');
  } else if (checkBreed) {
    alert('breed already avaiable!!');
  } else if (inputType.value == 'Select Type') {
    alert('Select type breed!!');
  } else {
    let dataBreed = {
      nameBreed: inputBreed.value,
      typeBreed: inputType.value,
    };
    breedArr.push(Object.values(dataBreed));
    saveToStorage('breedarr', breedArr);
    addBreedTable();
    resetBreed();
    console.log(breedArr);
  }
});

// Click btn xoá
table.addEventListener('click', function (e) {
  if (e.target.closest('.btn-danger')) {
    breedArr.splice(
      e.target.closest('.btn-danger').parentNode.parentNode.rowIndex - 1,
      1
    );
    DeleteRow(e.target.closest('.btn-danger').parentNode.parentNode.rowIndex);
    console.log(breedArr);
  }
});
