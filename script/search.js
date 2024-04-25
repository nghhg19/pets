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
const findBtn = document.getElementById('find-btn');

let petArr = JSON.parse(getFromStorage('arr')) ?? [];
let breedArr = JSON.parse(localStorage.getItem('breedarr')) ?? [];

if (petArr.length > 0) {
  for (let i = 0; i < petArr.length; i++) {
    let row = table.insertRow(-1);

    for (let j = 0; j < petArr[i].length - 1; j++) {
      let cell = row.insertCell();
      cell.innerHTML = petArr[i][j];
      row.cells[0].style.fontWeight = '600';
    }
    row.cells[11].remove();
  }
}

for (let i = 0; i < breedArr.length; i++) {
  let option = document.createElement('option');
  option.value = breedArr[i][0];
  option.text = breedArr[i][0];
  breedInput.appendChild(option);
}

typeInput.addEventListener('change', function () {
  while (breedInput.children.length > 1) {
    breedInput.removeChild(breedInput.lastChild);
  }
  for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i][1] === typeInput.value) {
      let option = document.createElement('option');
      option.value = breedArr[i][0];
      option.text = breedArr[i][0];
      breedInput.appendChild(option);
    }
  }
});

function findPets() {
  const searchID = idInput.value.toLowerCase();
  const searchName = nameInput.value.toLowerCase();
  const searchType = typeInput.value.toLowerCase();
  const searchBreed = breedInput.value.toLowerCase();
  const searchvaccinated = vaccinatedInput.checked
    ? '<i class="bi bi-check-circle-fill"></i>'
    : '<i class="bi bi-x-circle-fill"></i>';
  const searchdewormed = dewormedInput.checked
    ? '<i class="bi bi-check-circle-fill"></i>'
    : '<i class="bi bi-x-circle-fill"></i>';
  const searchsterilized = sterilizedInput.checked
    ? '<i class="bi bi-check-circle-fill"></i>'
    : '<i class="bi bi-x-circle-fill"></i>';

  if (
    petArr &&
    (searchID !== '' ||
      searchName !== '' ||
      searchType !== '' ||
      searchBreed !== '')
  ) {
    table.innerHTML = '';

    petArr.forEach(function (pet) {
      const id = pet[0].toLowerCase();
      const name = pet[1].toLowerCase();
      const type = pet[3].toLowerCase();
      const breed = pet[6].toLowerCase();
      const vaccined = pet[8].toLowerCase();
      const dewormed = pet[9].toLowerCase();
      const sterilized = pet[10].toLowerCase();

      if (
        (id.includes(searchID) || searchID === '') &&
        (name.includes(searchName) || searchName === '') &&
        (type.includes(searchType) || searchType === 'select type') &&
        (breed.includes(searchBreed) || searchBreed === 'select breed') &&
        (vaccined.includes(searchvaccinated) ||
          searchvaccinated === '<i class="bi bi-x-circle-fill"></i>') &&
        (dewormed.includes(searchdewormed) ||
          searchdewormed === '<i class="bi bi-x-circle-fill"></i>') &&
        (sterilized.includes(searchsterilized) ||
          searchsterilized === '<i class="bi bi-x-circle-fill"></i>')
      ) {
        const row = table.insertRow();
        for (let i = 0; i < pet.length - 1; i++) {
          const cell = row.insertCell(i);
          cell.innerHTML = pet[i];
        }
        row.cells[11].remove();
      }
    });
  }
}

findBtn.addEventListener('click', findPets);
