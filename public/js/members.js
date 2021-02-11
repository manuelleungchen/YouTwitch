$(document).ready(() => {
  const darkModeNavbar = document.querySelector('#navToogle');
  const darkModeSidebar = document.querySelector('#sidebarToggle');
  const memberEL = document.querySelector('.member-name');

  // Toggle the side navbar
  $('.sidenav').sidenav();

  // Save darkmode settings to DB
  const darkmodeSave = function () {
    const data = {
      id: memberEL.getAttribute('data-userid'),
      darkmode: this.checked,
    };
    // Create PUT request to update Users table
    fetch('/api/darkmode', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      // eslint-disable-next-line
            console.log('Updating to the database');
      // eslint-disable-next-line
        }).catch((err) => console.log(err));
  };

  // Toggle Dark mode
  $('.switch label input').change(function () {
    if (this.checked) {
      // Dark Mode ON
      $('body').css('background-color', '#212121');
      $('body').css('color', 'white');
      $('#nav-mobile').css('background-color', '#000000');
      $('#searchBarDiv input').removeClass('darkModeOFF');
      $('#searchBarDiv input').addClass('darkModeON');
      $('#searchBarDiv button i').removeClass('grey-darken-3-text');
      $('#searchBarDiv button i').addClass('white-text');
      $('#logo span').removeClass('black-text');
      $('#logo span').addClass('white-text');
      $('#nav-mobile li h5').removeClass('black-text');
      $('#nav-mobile li h5').addClass('white-text');
      $('#nav-mobile li h6').removeClass('black-text');
      $('#nav-mobile li h6').addClass('white-text');
      $('#nav-mobile li a').removeClass('black-text');
      $('#nav-mobile li a').addClass('white-text');
      $('.switch label').removeClass('black-text');
      $('.switch label').addClass('white-text');
      $('#navLinks li a').removeClass('black-text');
      $('#navLinks li a').addClass('white-text');
      $('.sidenav-trigger i').removeClass('black-text');
      $('.sidenav-trigger i').addClass('white-text');
      $('.card').removeClass('darkModeOFF');
      $('.card').addClass('darkModeON');
    } else {
      // Dark Mode OFF
      $('body').css('background-color', '#f5f5f5');
      $('body').css('color', '#424242');
      $('#nav-mobile').css('background-color', '#bbdefb');
      $('#searchBarDiv input').removeClass('darkModeON');
      $('#searchBarDiv input').addClass('darkModeOFF');
      $('#searchBarDiv button i').removeClass('white-text');
      $('#searchBarDiv button i').addClass('grey-darken-3-text');
      $('#logo span').removeClass('white-text');
      $('#logo span').addClass('black-text');
      $('#nav-mobile li h5').removeClass('white-text');
      $('#nav-mobile li h5').addClass('black-text');
      $('#nav-mobile li h6').removeClass('white-text');
      $('#nav-mobile li h6').addClass('black-text');
      $('#nav-mobile li a').removeClass('white-text');
      $('#nav-mobile li a').addClass('black-text');
      $('.switch label').removeClass('white-text');
      $('.switch label').addClass('black-text');
      $('#navLinks li a').removeClass('white-text');
      $('#navLinks li a').addClass('black-text');
      $('.sidenav-trigger i').removeClass('white-text');
      $('.sidenav-trigger i').addClass('black-text');
      $('.card').removeClass('darkModeON');
      $('.card').addClass('darkModeOFF');
    }
  });

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page with the saved darkmode preferences
  $.get('/api/user_data').then((data) => {
    memberEL.textContent = data.email;
    memberEL.setAttribute('data-userid', data.id);

    // Check user mode preference of database
    if (data.darkmode === true) {
      darkModeNavbar.click();
      darkModeSidebar.checked = data.darkmode;
    }
  });

  // Event Listening for Darkmode toggle
  darkModeNavbar.addEventListener('click', darkmodeSave);

  // Event Listening Darkmode toggle for Mobile
  darkModeSidebar.addEventListener('click', darkmodeSave);

  // onclick event for favorites
  const favoritesEl = document.querySelectorAll('#favorites');
  favoritesEl.forEach((favorite) => {
    favorite.addEventListener('click', () => {
      const memberName = document.querySelector('.member-name').innerHTML;
      window.location.replace(`/members/favorites/${memberName}`);
    });
  });

  // Modal for Video Player
  const iframe = document.querySelectorAll('.iframe');
  $('.modal').on('hidden.bs.modal', () => {
    $('.modal iframe').attr('src', $('.modal iframe').attr('src'));
  });

  $('.modal').modal({
    opacity: 1,
    onCloseEnd: () => {
      iframe.forEach((video) => {
        video.setAttribute('src', video.getAttribute('src'));
      });
    },
  });

  // Fetch Videos when using searchbar.
  const createForm = document.getElementById('create-form');
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grabs the value of the textarea that goes by the name, "quote"
    const newSearch = {
      searchValue: document.getElementById('search').value.trim(),
    };

    if (!newSearch.searchValue) {
      return;
    }
    // Redirect to another page
    window.location.replace(`/members/${newSearch.searchValue}`);
  });

  // Event listening for Favorites Button
  const addBtnEl = document.querySelectorAll('.addBtn');
  addBtnEl.forEach((button) => {
    button.addEventListener('click', () => {
      const siblingEl = button.previousElementSibling.getAttribute('href');
      const imageElSrc = button.previousElementSibling.children[0].getAttribute('src');
      // eslint-disable-next-line
      const titleEl = button.parentElement.parentElement.children[2].children[0].innerHTML.toString();
      const siblingElInt = siblingEl.replace(/^\D+/g, '');
      const id = document.getElementById(siblingElInt);
      const iframeElSrc = id.childNodes[1].children[0].getAttribute('src');
      const memberNameEl = document.querySelector('.member-name');
      const savedVideoInfo = {
        email: memberNameEl.innerHTML,
        video: iframeElSrc,
        thumbnail: imageElSrc,
        title: titleEl,
      };
      // Create a POST request to favorites table
      fetch('/api/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(savedVideoInfo),
      }).then(() => {
        // eslint-disable-next-line
                console.log('Adding to the database');
        // eslint-disable-next-line
            }).catch((err) => console.log(err));
    });
  });
});
