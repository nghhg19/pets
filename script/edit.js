'use strict';

const submitBtn = document.getElementById('submit-btn');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const date = document.querySelector('.dateAdd');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const table = document.getElementById('tbody');

let petArr = JSON.parse(getFromStorage('arr')) ?? [];
let breedArr = JSON.parse(localStorage.getItem('breedarr')) ?? [];
let thisRow;

// Khởi tạo bảng
function renderTable() {
  if (petArr.length > 0) {
    for (let i = 0; i < petArr.length; i++) {
      let row = table.insertRow(-1);

      for (let j = 0; j < petArr[i].length; j++) {
        let cell = row.insertCell();
        cell.innerHTML = petArr[i][j];
      }
      row.cells[petArr[i].length - 1].innerHTML =
        '<button type="button" class="btn btn-warning">Edit</button>';
      row.deleteCell(11);
      row.cells[0].style.fontWeight = '600';
    }
  }
}

renderTable();

function renderBreed() {
  while (breedInput.children.length > 1) {
    breedInput.removeChild(breedInput.lastChild);
  }

  // Tạo các options từ mảng
  for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i][1] === typeInput.value) {
      let option = document.createElement('option');
      option.value = breedArr[i][0];
      option.text = breedArr[i][0];
      breedInput.appendChild(option);
    }
  }
}

function startEditPet(e) {
  let target = e.target.closest('.btn-warning');
  if (target) {
    thisRow = target.parentNode.parentNode.rowIndex;
    let getCorlor = /color: #(.*?);/g;
    let breedOptions = petArr[thisRow - 1][6];

    document.querySelector('.edit-pet').classList.remove('hide');

    idInput.value = petArr[thisRow - 1][0];
    nameInput.value = petArr[thisRow - 1][1];
    ageInput.value = petArr[thisRow - 1][2];
    typeInput.value = petArr[thisRow - 1][3];
    weightInput.value = parseInt(petArr[thisRow - 1][4]);
    lengthInput.value = parseInt(petArr[thisRow - 1][5]);
    renderBreed();
    for (var i = 0; i < breedInput.options.length; i++) {
      if (breedInput.options[i].text === breedOptions) {
        breedInput.selectedIndex = i;
        break;
      }
    }
    colorInput.value = `#${getCorlor.exec(petArr[thisRow - 1][7])[1]}`;
    date.value = petArr[thisRow - 1][12];
    petArr[thisRow - 1][8] == `<i class="bi bi-check-circle-fill"></i>`
      ? (vaccinatedInput.checked = true)
      : (vaccinatedInput.checked = false);
    petArr[thisRow - 1][9] == `<i class="bi bi-check-circle-fill"></i>`
      ? (dewormedInput.checked = true)
      : (dewormedInput.checked = false);
    petArr[thisRow - 1][10] == `<i class="bi bi-check-circle-fill"></i>`
      ? (sterilizedInput.checked = true)
      : (sterilizedInput.checked = false);
  }
}

table.addEventListener('click', startEditPet);

// thay đổi breed dựa theo loài
typeInput.addEventListener('change', renderBreed);

//Sửa breed
submitBtn.addEventListener('click', function () {
  if (nameInput.value == '') {
    alert(`Please input for name's Pet!`);
  } else if (ageInput.value <= 0 || ageInput.value > 15) {
    alert('Age must be between 1 and 15!');
  } else if (typeInput.value == `Select Type`) {
    alert('Please select Type!');
  } else if (weightInput.value <= 0 || weightInput.value > 15) {
    alert('Weight must be between 1 and 15!');
  } else if (lengthInput.value <= 0 || lengthInput.value > 100) {
    alert('Length must be between 1 and 100!');
  } else if (breedInput.value == `Select Breed`) {
    alert('Please select Breed!');
  } else if (date.value == '') {
    alert('Please choose your date!');
  } else {
    const dataPet = {
      id: idInput.value,
      namePet: nameInput.value,
      age: ageInput.value,
      type: typeInput.value,
      weight: weightInput.value + ' kg',
      Length: lengthInput.value + ' cm',
      breed: breedInput.value,
      color: `<i class="bi bi-square-fill" style="color: ${colorInput.value};"></i>`,
      vaccinated: vaccinatedInput.checked
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`,
      dewormed: dewormedInput.checked
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`,
      sterilized: sterilizedInput.checked
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`,
      bmi: '?',
      date: date.value,
      deletebtn: `<button type="button" class="btn btn-danger">Delete</button>`,
    };
    petArr[thisRow - 1] = Object.values(dataPet);
    saveToStorage('arr', petArr);
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
    renderTable();
  }
});
