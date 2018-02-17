var addBtn = document.getElementById('addBtn');
var modal = document.querySelector('.modal');
var saveBtn = document.getElementById('saveBtn');
var cancelBtn = document.getElementById('cancelBtn');

var entries = [];
// boolean to keep track of editing
var editingIndex = -1;

var dateInput = document.getElementById('dateInput');
var odoInput = document.getElementById('odoInput');
var volInput = document.getElementById('volInput');
var priceInput = document.getElementById('priceInput');

addBtn.addEventListener('click', toggleForm);

saveBtn.addEventListener('click', function(e) {
  e.preventDefault();

  const date = dateInput.value;
  const odo = odoInput.value;
  const volume = volInput.value;
  const price = priceInput.value;
  const cost = Math.round((priceInput.valueAsNumber * volInput.valueAsNumber) * 100)/100;
  
  const newEntry = {
    date,
    odo,
    volume,
    price,
    cost
  }

  // save new data if not editing
  if (editingIndex === -1) {
    entries.unshift(newEntry);
  } else {
    // save with edited data 
    entries[editingIndex] = newEntry;
    editingIndex = -1;
  }

  clearInput();
  toggleForm();
  displayEntries();
});

cancelBtn.addEventListener('click', function(e) {
  // prevent button submission
  e.preventDefault();
  toggleForm();
});

function toggleForm() {
  modal.classList.toggle('show-modal');
}

function clearInput() {
  dateInput.value = '';
  odoInput.value = '';
  volInput.value = '';
  priceInput.value = '';
};

function displayEntries() {
  var showData = document.querySelector('#showData');
  showData.innerHTML = '';
  
  for (let i = 0; i < entries.length; i++) {
    var HTMLString = `
    <ul class="ul">
      <li>
        <strong><p>${entries[i].date}</p></strong>
      </li>
      <li>
        <p>Odometer: ${entries[i].odo} mi</p>          
      </li>
      <li>
        <p>Volume: ${entries[i].volume} gal</p>
      </li>
      <li>
        <p>Price/gal: $${entries[i].price}</p>
      </li>
      <li>
        <p>Cost: $${entries[i].cost}</p>
      </li>
      <button class="edit" onclick='editEntry(${i})'>Edit</button>
      <button class="delete" ondblclick='deleteEntry(${i})'>Del</button>
      <small>Double click to delete</small>
    </ul>
    `
    showData.innerHTML += HTMLString;
  }
}

// show edit form
function editEntry (i) {
  editingIndex = i;
  toggleForm();

  dateInput.value = entries[i].date;
  odoInput.value =  entries[i].odo;
  volInput.value =  entries[i].volume;
  priceInput.value =  entries[i].price;
}

function deleteEntry(i) {
  entries.splice(i, 1);
  displayEntries();
}

// hide form when modal is clicked
window.addEventListener('click', function(e) {
  if (e.target === modal) {
  toggleForm();
  }
});
