'use strict';

const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
let petsData = JSON.parse(getFromStorage('arr'));

// Export file___
function exportData() {
  if (petsData) {
    const jsonData = JSON.stringify(petsData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'petsData.json';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }
}

// Hàm kiểm tra cấu trúc dữ liệu nhập vào
function isSameStructure(importedData) {
  if (importedData.length !== petsData.length) {
    return false;
  }

  for (let i = 0; i < importedData.length; i++) {
    if (importedData[i].length !== petsData[i].length) {
      return false;
    }

    for (let j = 0; j < importedData[i].length; j++) {
      if (importedData[i][j] !== petsData[i][j]) {
        return false;
      }
    }
  }

  return true;
}

// Import file
function importData() {
  const fileInput = document.getElementById('input-file');

  if (fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target.result;
      const importedData = JSON.parse(contents);

      importedData.forEach(function (importedPet) {
        const existingPetIndex = petsData.findIndex(function (currenArr) {
          return currenArr[0] === importedPet[0];
        });

        if (existingPetIndex !== -1) {
          petsData[existingPetIndex] = importedPet;
        } else {
          petsData.push(importedPet);
        }
      });

      // Lưu dữ liệu mới vào local storage
      saveToStorage('arr', petsData);
      alert('Import thành công!!');
    };

    reader.readAsText(fileInput.files[0]);
  } else {
    alert('Chọn file cần import!!');
  }
}

/////////////////////////////////////////////////////
exportBtn.addEventListener('click', exportData);
importBtn.addEventListener('click', importData);
