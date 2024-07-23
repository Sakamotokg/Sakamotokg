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
      */