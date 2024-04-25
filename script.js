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
const healthybtn = document.getElementById('healthy-btn');
const bmibtn = document.getElementById('bmi-btn');

let healthyCheck = false;
let petArr = JSON.parse(getFromStorage('arr')) ?? [];
let breedArr = JSON.parse(localStorage.getItem('breedarr')) ?? [];
let checkID = [];

for (let i = 0; i < petArr.length; i++) {
  checkID.push(petArr[i][0]);
}

console.log(petArr);
console.log(checkID);
console.log(breedArr);

if (petArr.length > 0) {
  for (let i = 0; i < petArr.length; i++) {
    let row = table.insertRow(-1);

    for (let j = 0; j < petArr[i].length; j++) {
      let cell = row.insertCell();
      cell.innerHTML = petArr[i][j];
      row.cells[0].style.fontWeight = '600';
    }
  }
}

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

function addRow() {
  let row = table.insertRow(-1);
  for (let i = 0; i < petArr[petArr.length - 1].length; i++) {
    let cell = row.insertCell();
    cell.innerHTML = petArr[petArr.length - 1][i];
    row.cells[0].style.fontWeight = 'bold';
  }
}

function DeleteRow(i) {
  petArr.splice(i - 1, 1);
  saveToStorage('arr', petArr);
  table.deleteRow(i - 1);
}

function clearInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  breedInput.value = 'Select Breed';
  colorInput.value = '#000000';
  date.value = '';
  vaccinatedInput.checked =
    dewormedInput.checked =
    sterilizedInput.checked =
      false;
}

submitBtn.addEventListener('click', function () {
  // checkID.push(idInput.value);
  console.log('petArr: ' + petArr);
  console.log('Arr trong storage: ' + getFromStorage('arr'));
  console.log(checkID);
  if (checkID.includes(idInput.value)) {
    alert('ID must be unique!');
  } else if (idInput.value == '') {
    alert('Please input for id!');
  } else if (nameInput.value == '') {
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
    petArr.push(Object.values(dataPet));
    checkID.push(idInput.value);
    saveToStorage('arr', petArr);
    saveToStorage('ID', checkID);
    addRow();
    clearInput();
  }
});

// Hiển thị pet khoẻ mạnh
healthybtn.addEventListener('click', function () {
  if (!healthyCheck) {
    for (let i = 0; i < table.rows.length; i++) {
      let Vaccined = table.rows[i].cells[8].innerHTML.includes(
        'bi-check-circle-fill'
      );
      let Dewormed = table.rows[i].cells[9].innerHTML.includes(
        'bi-check-circle-fill'
      );
      let Sterilized = table.rows[i].cells[10].innerHTML.includes(
        'bi-check-circle-fill'
      );

      if (!Vaccined || !Dewormed || !Sterilized) {
        table.rows[i].style.display = 'none';
      }
    }

    healthyCheck = true;
    healthybtn.textContent = 'Show All Pet';
  } else {
    // Nếu đã lọc, hiển thị lại tất cả các hàng
    for (let i = 0; i < table.rows.length; i++) {
      let row = table.rows[i];
      row.style.display = '';
    }
    healthyCheck = false;
    healthybtn.textContent = 'Show Healthy Pet';
  }
});

//Tính chỉ số BMI
bmibtn.addEventListener('click', function () {
  // Duyệt qua tất cả các hàng
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];

    if (row.cells[3].innerHTML === 'Dog') {
      let bmi =
        (parseInt(row.cells[4].innerHTML) * 703) /
        parseInt(row.cells[5].innerHTML) ** 2;
      row.cells[11].innerText = bmi.toFixed(1);
    } else if (row.cells[3].innerHTML === 'Cat') {
      let bmi =
        (parseInt(row.cells[4].innerHTML) * 886) /
        parseInt(row.cells[5].innerHTML) ** 2;
      row.cells[11].innerText = bmi.toFixed(1);
    }
  }
});

table.addEventListener('click', function (e) {
  if (e.target.closest('.btn-danger'))
    DeleteRow(e.target.closest('.btn-danger').parentNode.parentNode.rowIndex);
});

typeInput.addEventListener('change', renderBreed);
