const API_KEY = 'AIzaSyBSVErjJ4nkV8K_n0W5pGw6o7Ib6cNW_9Y';
const CLIENT_ID = '101870314583052125282';
const SPREADSHEET_ID = '1loGn-rvjnjbdi_c9ZdoJpUyytdN4F_wsxhPXUDdNYDE/edit?gid';
const RANGE = 'Sheet1!A:C';

const categorySelect = document.getElementById('category');
const productTable = document.getElementById('products');

let productsData;

// Fetch data from Google Sheets
async function fetchData() {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
  );
  const data = await response.json();
  productsData = data.values.slice(1);
  renderProducts(productsData);
}

// Render products to the table
function renderProducts(products) {
  const tbody = productTable.querySelector('tbody');
  tbody.innerHTML = '';
  products.forEach((product) => {
    const tr = document.createElement('tr');
    product.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// Filter products by category
function filterProducts(category) {
  if (category === '') {
    renderProducts(productsData);
  } else {
    const filteredProducts = productsData.filter(
      (product) => product[2] === category
    );
    renderProducts(filteredProducts);
  }
}

// Initialize the select element
categorySelect.addEventListener('change', () => {
  filterProducts(categorySelect.value);
});

// Fetch data from Google Sheets
fetchData();




/*

function renderProducts(products) {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';

      const dayGroups = {
        'Monday': 'group-monday-thursday',
        'Thursday': 'group-monday-thursday',
        'Tuesday': 'group-tuesday-friday',
        'Friday': 'group-tuesday-friday',
        'Wednesday': 'group-wednesday-saturday',
        'Saturday': 'group-wednesday-saturday'
      };

      const groupedProducts = products.sort((a, b) => {
        const dayOrder = ['Monday', 'Thursday', 'Tuesday', 'Friday', 'Wednesday', 'Saturday'];
        return dayOrder.indexOf(a[1]) - dayOrder.indexOf(b[1]);
      });

      groupedProducts.forEach((product) => {
        const tr = document.createElement('tr');
        const day = product[1];
        const groupClass = dayGroups[day] || '';

        tr.className = groupClass;
        product.forEach((cell) => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      });
    }








    function renderProducts(products) {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
    
      const dayGroups = {
        'Monday': [],
        'Thursday': [],
        'Tuesday': [],
        'Friday': [],
        'Wednesday': [],
        'Saturday': []
      };
    
      products.forEach((product) => {
        const day = product[1];
        const grade = product[3];
        const kelas = product[4];
    
        dayGroups[day].push({ grade, kelas, product });
      });
    
      let mondayThursdayCounter = 0;
      let tuesdayFridayCounter = 0;
      let wednesdaySaturdayCounter = 0;
    
      let days = [['Monday', 'Thursday'], ['Tuesday', 'Friday'], ['Wednesday', 'Saturday']];
      for (let i = 0; i < days.length; i++) {
        const day1 = days[i][0];
        const day2 = days[i][1];
      
        dayGroups[day1].sort((a, b) => a.grade.localeCompare(b.grade) || a.kelas.localeCompare(b.kelas));
        dayGroups[day2].sort((a, b) => a.grade.localeCompare(b.grade) || a.kelas.localeCompare(b.kelas));
      
        let counter = i === 2? wednesdaySaturdayCounter : i === 1? tuesdayFridayCounter : mondayThursdayCounter;
      
        const gradeGroupsDay1 = {};
        dayGroups[day1].forEach((product) => {
          if (!gradeGroupsDay1[product.grade + product.kelas]) {
            gradeGroupsDay1[product.grade + product.kelas] = [];
          }
          gradeGroupsDay1[product.grade + product.kelas].push(product);
        });
      
        const gradeGroupsDay2 = {};
        dayGroups[day2].forEach((product) => {
          if (!gradeGroupsDay2[product.grade + product.kelas]) {
            gradeGroupsDay2[product.grade + product.kelas] = [];
          }
          gradeGroupsDay2[product.grade + product.kelas].push(product);
        });
      
        Object.keys(gradeGroupsDay1).forEach((key) => {
          const productsDay1 = gradeGroupsDay1[key];
          const productsDay2 = gradeGroupsDay2[key];
      
          productsDay1.forEach((productDay1) => {
            const trDay1 = document.createElement('tr');
            trDay1.className = counter % 2 === 0? (i === 0? 'group-monday-thursday-1' : i === 1? 'group-tuesday-friday-1' : 'group-wednesday-saturday-1') : (i === 0? 'group-monday-thursday-2' : i === 1? 'group-tuesday-friday-2' : 'group-wednesday-saturday-2');
            productDay1.product.forEach((cell) => {
              const td = document.createElement('td');
              td.textContent = cell;
              trDay1.appendChild(td);
            });
            tableBody.appendChild(trDay1);
      
            if (productsDay2.length > 0) {
              const trDay2 = document.createElement('tr');
              trDay2.className = trDay1.className;
              productsDay2[0].product.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                trDay2.appendChild(td);
              });
              tableBody.appendChild(trDay2);
              productsDay2.shift();
            } else {
              tableBody.appendChild(trDay1.cloneNode(true));
            }
      
            counter++;
          });
      
          if (productsDay2.length > 0) {
            productsDay2.forEach((productDay2) => {
              const trDay2 = document.createElement('tr');
              trDay2.className = counter % 2 === 0? (i === 0? 'group-monday-thursday-1' : i === 1? 'group-tuesday-friday-1' : 'group-wednesday-saturday-1') : (i === 0? 'group-monday-thursday-2' : i === 1? 'group-tuesday-friday-2' : 'group-wednesday-saturday-2');
              productDay2.product.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                trDay2.appendChild(td);
              });
              tableBody.appendChild(trDay2);
              counter++;
            });
          }
        });
      
        if (i === 0) {
          mondayThursdayCounter = counter;
        } else if (i === 1) {
          tuesdayFridayCounter = counter;
        } else {
          wednesdaySaturdayCounter = counter;
        }
      }
    }






    function renderProducts(products) {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
    
      const dayGroups = {
        'Monday': [],
        'Thursday': [],
        'Tuesday': [],
        'Friday': [],
        'Wednesday': [],
        'Saturday': []
      };
    
      products.forEach((product) => {
        const day = product[1];
        const grade = product[3];
        const kelas = product[4];
    
        dayGroups[day].push({ grade, kelas, product });
      });
    
      let mondayThursdayCounter = 0;
      let tuesdayFridayCounter = 0;
      let wednesdaySaturdayCounter = 0;
    
      let days = [['Monday', 'Thursday'], ['Tuesday', 'Friday'], ['Wednesday', 'Saturday']];
      for (let i = 0; i < days.length; i++) {
        const day1 = days[i][0];
        const day2 = days[i][1];
    
        dayGroups[day1].sort((a, b) => a.grade.localeCompare(b.grade) || a.kelas.localeCompare(b.kelas));
        dayGroups[day2].sort((a, b) => a.grade.localeCompare(b.grade) || a.kelas.localeCompare(b.kelas));
    
        let counter = i === 2? wednesdaySaturdayCounter : i === 1? tuesdayFridayCounter : mondayThursdayCounter;
    
        dayGroups[day1].forEach((productDay1, index) => {
          const trDay1 = document.createElement('tr');
          trDay1.className = (index + counter) % 2 === 0? 'white-bg' : 'gray-bg';
          productDay1.product.forEach((cell) => {
            const td = document.createElement('td');
            td.textContent = cell;
            trDay1.appendChild(td);
          });
          tableBody.appendChild(trDay1);
    
          const correspondingDay2Product = dayGroups[day2].find((productDay2) => productDay2.grade === productDay1.grade && productDay2.kelas === productDay1.kelas);
          if (correspondingDay2Product) {
            const trDay2 = document.createElement('tr');
            trDay2.className = trDay1.className;
            correspondingDay2Product.product.forEach((cell) => {
              const td = document.createElement('td');
              td.textContent = cell;
              trDay2.appendChild(td);
            });
            tableBody.appendChild(trDay2);
          } else {
            // Add an empty row for day2 if no corresponding product is found
            const trDay2 = document.createElement('tr');
            trDay2.className = trDay1.className;
            productDay1.product.forEach((cell) => {
              const td = document.createElement('td');
              td.textContent = '';
              trDay2.appendChild(td);
            });
            tableBody.appendChild(trDay2);
          }
        });
    
        dayGroups[day2].forEach((productDay2) => {
          if (!dayGroups[day1].some((productDay1) => productDay1.grade === productDay2.grade && productDay1.kelas === productDay2.kelas)) {
            const trDay2 = document.createElement('tr');
            trDay2.className = 'gray-bg';
            productDay2.product.forEach((cell) => {
              const td = document.createElement('td');
              td.textContent = cell;
              trDay2.appendChild(td);
            });
            tableBody.appendChild(trDay2);
    
            const trDay1 = document.createElement('tr');
            trDay1.className = 'gray-bg';
            productDay2.product.forEach((cell) => {
              const td = document.createElement('td');
              td.textContent = '';
              trDay1.appendChild(td);
            });
            tableBody.appendChild(trDay1);
          }
        });
    
        if (i === 0) {
          mondayThursdayCounter += dayGroups[day1].length;
        } else if (i === 1) {
          tuesdayFridayCounter += dayGroups[day1].length;
        } else {
          wednesdaySaturdayCounter += dayGroups[day1].length;
        }
      }
    }














          (ini yg bener)
              ||
              VV

    let activeFilters = {};

function updateFilter(columnIndex, filterValue, button) {
  if (filterValue === 'All') {
    if (activeFilters[columnIndex]) {
      delete activeFilters[columnIndex];
      document.querySelectorAll(`button:nth-child(${columnIndex + 1})`).forEach((btn) => btn.classList.remove('active'));
    }
  } else {
    if (!activeFilters[columnIndex]) {
      activeFilters[columnIndex] = [];
    }
    const existingFilterIndex = activeFilters[columnIndex].findIndex((filter) => filter === filterValue);

    if (existingFilterIndex >= 0) {
      activeFilters[columnIndex].splice(existingFilterIndex, 1);
      button.classList.remove('active');
    } else {
      activeFilters[columnIndex].push(filterValue);
      button.classList.add('active');
    }
  }

  applyFilters();
}

function applyFilters() {
  const rows = document.querySelectorAll('#table-body tr');
  if (Object.keys(activeFilters).length === 0) {
    rows.forEach((row) => {
      row.style.display = '';
    });
  } else {
    rows.forEach((row) => {
      let showRow = true;
      Object.keys(activeFilters).forEach((columnIndex) => {
        if (activeFilters[columnIndex].length > 0 && !activeFilters[columnIndex].some((filter) => row.children[columnIndex].textContent === filter)) {
          showRow = false;
        }
      });
      row.style.display = showRow ? '' : 'none';
    });
  }
}

    const filters = [
      { id: 'filter-dea', column: 0, value: 'Ms. Dea' },
      { id: 'filter-yola', column: 0, value: 'Ms. Yola' },
      { id: 'filter-irma', column: 0, value: 'Ms. Irma' },
      { id: 'filter-anre', column: 0, value: 'Mr. Anre' },
      { id: 'filter-puput', column: 0, value: 'Ms. Puput' },
      { id: 'filter-kipli', column: 0, value: 'Mr. Kipli' },
      { id: 'filter-9', column: 2, value: '9:00' },
      { id: 'filter-10', column: 2, value: '10:00' },
      { id: 'filter-11', column: 2, value: '11:00' },
      { id: 'filter-13', column: 2, value: '13:00' },
      { id: 'filter-14', column: 2, value: '14:00' },
      { id: 'filter-15', column: 2, value: '15:00' },
      { id: 'filter-16', column: 2, value: '16:00' },
      { id: 'filter-17', column: 2, value: '17:00' },
      { id: 'filter-mon', column: 1, value: 'Monday' },
      { id: 'filter-tues', column: 1, value: 'Tuesday' },
      { id: 'filter-wed', column: 1, value: 'Wednesday' },
      { id: 'filter-thur', column: 1, value: 'Thursday' },
      { id: 'filter-fri', column: 1, value: 'Friday' },
      { id: 'filter-sat', column: 1, value: 'Saturday' },
      { id: 'filter-g1', column: 3, value: 'Grade 1' },
      { id: 'filter-g2', column: 3, value: 'Grade 2' },
      { id: 'filter-g3', column: 3, value: 'Grade 3' },
      { id: 'filter-g4', column: 3, value: 'Grade 4' },
      { id: 'filter-g5', column: 3, value: 'Grade 5' },
      { id: 'filter-g6', column: 3, value: 'Grade 6' },
      { id: 'filter-k1', column: 4, value: 'Kelas 1' },
      { id: 'filter-k2', column: 4, value: 'Kelas 2' },
      { id: 'filter-k3', column: 4, value: 'Kelas 3' },
      { id: 'filter-k4', column: 4, value: 'Kelas 4' },
      { id: 'filter-k5', column: 4, value: 'Kelas 5' },
      { id: 'filter-k6', column: 4, value: 'Kelas 6' },
      { id: 'filter-full', column: 5, value: 'Full' },
      { id: 'filter-avail', column: 5, value: 'Avail' },
    ];

    filters.forEach((filter) => {
      const button = document.getElementById(filter.id);
      button.addEventListener('click', () => {
        if (filter.value === 'All') {
          activeFilters = [];
          document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
          fetchData();
        } else {
          updateFilter(filter.column, filter.value, button);
        }
      });
    });

    fetchData();
  </script>
</body>
</html>



















pas grade sama kelas ke pisah

<!DOCTYPE html>
<html>
<head>
  <title>Cari Jadwal Sakamoto</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Cari Jadwal Sakamoto</h1>
  <div id="button-container">
    <button id="filter-dea">Ms. Dea</button>
    <button id="filter-yola">Ms. Yola</button>
    <button id="filter-irma">Ms. Irma</button>
    <button id="filter-anre">Mr. Anre</button>
    <button id="filter-puput">Ms. Puput</button>
    <button id="filter-kipli">Mr. Kipli</button>
    <button id="filter-9">9:00</button>
    <button id="filter-10">10:00</button>
    <button id="filter-11">11:00</button>
    <button id="filter-13">13:00</button>
    <button id="filter-14">14:00</button>
    <button id="filter-15">15:00</button>
    <button id="filter-16">16:00</button>
    <button id="filter-17">17:00</button>
    <button id="filter-mon">Monday</button>
    <button id="filter-tues">Tuesday</button>
    <button id="filter-wed">Wednesday</button>
    <button id="filter-thur">Thursday</button>
    <button id="filter-fri">Friday</button>
    <button id="filter-sat">Saturday</button>
    <button id="filter-g1">Grade 1</button>
    <button id="filter-g2">Grade 2</button>
    <button id="filter-g3">Grade 3</button>
    <button id="filter-g4">Grade 4</button>
    <button id="filter-g5">Grade 5</button>
    <button id="filter-g6">Grade 6</button>
    <button id="filter-k1">Kelas 1</button>
    <button id="filter-k2">Kelas 2</button>
    <button id="filter-k3">Kelas 3</button>
    <button id="filter-k4">Kelas 4</button>
    <button id="filter-k5">Kelas 5</button>
    <button id="filter-k6">Kelas 6</button>
    <button id="filter-full">Full</button>
    <button id="filter-avail">Avail</button>
  </div>

  <table id="products">
    <thead>
      <tr>
        <th>Teacher</th>
        <th>Day</th>
        <th>Time</th>
        <th>Grade</th>
        <th>Kelas</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id="table-body"></tbody>
  </table>
  <script>
    const API_KEY = 'AIzaSyBSVErjJ4nkV8K_n0W5pGw6o7Ib6cNW_9Y';
    const SPREADSHEET_ID = '1loGn-rvjnjbdi_c9ZdoJpUyytdN4F_wsxhPXUDdNYDE';
    const RANGE = 'Sheet1!A1:F';

    async function fetchData() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();
        const productsData = data.values.slice(1);
        renderProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    function renderProducts(products) {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
    
      const dayGroups = {
        'Monday': [],
        'Thursday': [],
        'Tuesday': [],
        'Friday': [],
        'Wednesday': [],
        'Saturday': []
      };
    
      products.forEach((product) => {
        const day = product[1];
        const grade = product[3];
        const kelas = product[4];
    
        dayGroups[day].push({ grade, kelas, product });
      });
    
      let mondayThursdayCounter = 0;
      let tuesdayFridayCounter = 0;
      let wednesdaySaturdayCounter = 0;
    
      let days = [['Monday', 'Thursday'], ['Tuesday', 'Friday'], ['Wednesday', 'Saturday']];
      for (let i = 0; i < days.length; i++) {
        const day1 = days[i][0];
        const day2 = days[i][1];
    
        dayGroups[day1].sort((a, b) => a.grade.localeCompare(b.grade) || a.kelas.localeCompare(b.kelas));
        dayGroups[day2].sort((a, b) => a.grade.localeCompare(b.grade) || a.kelas.localeCompare(b.kelas));
    
        let counter = i === 2 ? wednesdaySaturdayCounter : i === 1 ? tuesdayFridayCounter : mondayThursdayCounter;
    
        const gradeGroupsDay1 = {};
        dayGroups[day1].forEach((product) => {
          if (!gradeGroupsDay1[product.grade + product.kelas]) {
            gradeGroupsDay1[product.grade + product.kelas] = [];
          }
          gradeGroupsDay1[product.grade + product.kelas].push(product);
        });
    
        const gradeGroupsDay2 = {};
        dayGroups[day2].forEach((product) => {
          if (!gradeGroupsDay2[product.grade + product.kelas]) {
            gradeGroupsDay2[product.grade + product.kelas] = [];
          }
          gradeGroupsDay2[product.grade + product.kelas].push(product);
        });
    
        Object.keys(gradeGroupsDay1).forEach((key) => {
          const productsDay1 = gradeGroupsDay1[key];
          const productsDay2 = gradeGroupsDay2[key];
    
          productsDay1.forEach((productDay1) => {
            const trDay1 = document.createElement('tr');
            trDay1.className = counter % 2 === 0 ? 'white-bg' : 'gray-bg';
            productDay1.product.forEach((cell) => {
              const td = document.createElement('td');
              td.textContent = cell;
              trDay1.appendChild(td);
            });
            tableBody.appendChild(trDay1);
    
            if (productsDay2.length > 0) {
              const trDay2 = document.createElement('tr');
              trDay2.className = trDay1.className;
              productsDay2[0].product.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                trDay2.appendChild(td);
              });
              tableBody.appendChild(trDay2);
              productsDay2.shift();
            } else {
              tableBody.appendChild(trDay1.cloneNode(true));
            }
    
            counter++;
          });
    
          if (productsDay2.length > 0) {
            productsDay2.forEach((productDay2) => {
              const trDay2 = document.createElement('tr');
              trDay2.className = counter % 2 === 0 ? 'white-bg' : 'gray-bg';
              productDay2.product.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                trDay2.appendChild(td);
              });
              tableBody.appendChild(trDay2);
              counter++;
            });
          }
        });
    
        if (i === 0) {
          mondayThursdayCounter = counter;
        } else if (i === 1) {
          tuesdayFridayCounter = counter;
        } else {
          wednesdaySaturdayCounter = counter;
        }
      }
    }
    

    let activeFilters = {};

function updateFilter(columnIndex, filterValue, button) {
  if (filterValue === 'All') {
    if (activeFilters[columnIndex]) {
      delete activeFilters[columnIndex];
      document.querySelectorAll(`button:nth-child(${columnIndex + 1})`).forEach((btn) => btn.classList.remove('active'));
    }
  } else {
    if (!activeFilters[columnIndex]) {
      activeFilters[columnIndex] = [];
    }
    const existingFilterIndex = activeFilters[columnIndex].findIndex((filter) => filter === filterValue);

    if (existingFilterIndex >= 0) {
      activeFilters[columnIndex].splice(existingFilterIndex, 1);
      button.classList.remove('active');
    } else {
      activeFilters[columnIndex].push(filterValue);
      button.classList.add('active');
    }
  }

  applyFilters();
}

function applyFilters() {
  const rows = document.querySelectorAll('#table-body tr');
  if (Object.keys(activeFilters).length === 0) {
    rows.forEach((row) => {
      row.style.display = '';
    });
  } else {
    rows.forEach((row) => {
      let showRow = true;
      Object.keys(activeFilters).forEach((columnIndex) => {
        if (activeFilters[columnIndex].length > 0 && !activeFilters[columnIndex].some((filter) => row.children[columnIndex].textContent === filter)) {
          showRow = false;
        }
      });
      row.style.display = showRow ? '' : 'none';
    });
  }
}

    const filters = [
      { id: 'filter-dea', column: 0, value: 'Ms. Dea' },
      { id: 'filter-yola', column: 0, value: 'Ms. Yola' },
      { id: 'filter-irma', column: 0, value: 'Ms. Irma' },
      { id: 'filter-anre', column: 0, value: 'Mr. Anre' },
      { id: 'filter-puput', column: 0, value: 'Ms. Puput' },
      { id: 'filter-kipli', column: 0, value: 'Mr. Kipli' },
      { id: 'filter-9', column: 2, value: '9:00' },
      { id: 'filter-10', column: 2, value: '10:00' },
      { id: 'filter-11', column: 2, value: '11:00' },
      { id: 'filter-13', column: 2, value: '13:00' },
      { id: 'filter-14', column: 2, value: '14:00' },
      { id: 'filter-15', column: 2, value: '15:00' },
      { id: 'filter-16', column: 2, value: '16:00' },
      { id: 'filter-17', column: 2, value: '17:00' },
      { id: 'filter-mon', column: 1, value: 'Monday' },
      { id: 'filter-tues', column: 1, value: 'Tuesday' },
      { id: 'filter-wed', column: 1, value: 'Wednesday' },
      { id: 'filter-thur', column: 1, value: 'Thursday' },
      { id: 'filter-fri', column: 1, value: 'Friday' },
      { id: 'filter-sat', column: 1, value: 'Saturday' },
      { id: 'filter-g1', column: 3, value: 'Grade 1' },
      { id: 'filter-g2', column: 3, value: 'Grade 2' },
      { id: 'filter-g3', column: 3, value: 'Grade 3' },
      { id: 'filter-g4', column: 3, value: 'Grade 4' },
      { id: 'filter-g5', column: 3, value: 'Grade 5' },
      { id: 'filter-g6', column: 3, value: 'Grade 6' },
      { id: 'filter-k1', column: 4, value: 'Kelas 1' },
      { id: 'filter-k2', column: 4, value: 'Kelas 2' },
      { id: 'filter-k3', column: 4, value: 'Kelas 3' },
      { id: 'filter-k4', column: 4, value: 'Kelas 4' },
      { id: 'filter-k5', column: 4, value: 'Kelas 5' },
      { id: 'filter-k6', column: 4, value: 'Kelas 6' },
      { id: 'filter-full', column: 5, value: 'Full' },
      { id: 'filter-avail', column: 5, value: 'Avail' },
    ];

    filters.forEach((filter) => {
      const button = document.getElementById(filter.id);
      button.addEventListener('click', () => {
        if (filter.value === 'All') {
          activeFilters = [];
          document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
          fetchData();
        } else {
          updateFilter(filter.column, filter.value, button);
        }
      });
    });

    fetchData();
  </script>
</body>
</html>
      */