async function fetchData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    // Map company names to their corresponding elements
    const jobLists = {
      Photosnap: document.getElementById('job-photosnap'),
      Manage: document.getElementById('job-manage'),
      Account: document.getElementById('job-account'),
      MyHome: document.getElementById('job-myhome'),
      'Loop Studios': document.getElementById('job-loopstudios'),
      FaceIt: document.getElementById('job-FaceIt'),
      Shortly: document.getElementById('job-shortly'),
      Insure: document.getElementById('job-Insure'),
      'Eyecam Co.': document.getElementById('job-EyecamCo'),
      'The Air Filter Company': document.getElementById('job-TheAirFilterCompany'),
    };

    data.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.classList.add('job-card');
      jobCard.innerHTML = `
        <img src="${job.logo}" alt="${job.company} Logo">
        <h2>${job.company}</h2>
        <p id="position">${job.position}</p>
        <p>${job.role} - ${job.level}</p>
        <p>${job.location}</p>
        <p>${job.languages.join(', ')}</p>
        <p>${job.tools.join(', ')}</p>
        <p>${job.postedAt}</p>
        <p>${job.contract}</p>
      `;

      // Append job card to the corresponding job list
      const jobsList = jobLists[job.company];
      if (jobsList) {
        jobsList.appendChild(jobCard);
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-button');
  const items = []; // This array should be populated with job items

  let activeFilter = null;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // Toggle active class on filter buttons
      if (filterValue === activeFilter) {
        activeFilter = null;
      } else {
        activeFilter = filterValue;
      }

      filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn === button && filterValue === activeFilter);
      });

      const filteredItems = items.filter(item => {
        return item.languages.includes(filterValue) || item.tools.includes(filterValue);
      });

      // Call your displayFilteredItems function here with the filteredItems array
    });
  });
});
