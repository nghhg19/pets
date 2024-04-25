'use strict';

const sidebar = document.querySelector('#sidebar');

document.getElementById('sidebar-title').addEventListener('click', function () {
  sidebar.classList.toggle('active');
});
