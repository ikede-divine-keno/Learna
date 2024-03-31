// Constants
const BASE_PATH = "/frontend";

// Hide body
document.body.style.display = "none";

// Load Scripts
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * This function will load stylesheets
 * @param {*} url
 * @param {*} callback
 */
function loadStylesheet(url, callback) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";

  if (link.readyState) {
    // IE
    link.onreadystatechange = function () {
      if (link.readyState === "loaded" || link.readyState === "complete") {
        link.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    link.onload = function () {
      callback();
    };
  }

  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

/**
 * This function will initialize the UI
 */
function init() {
  // Set theme
  const theme = localStorage.getItem("theme");
  let logo = 'logo';
  if (theme) {
    document.body.classList.add(theme);
    if (theme === "dark") {
      logo = 'logo-white';
    }
  }

  // Display body
  document.body.style.display = "block";

  const sideBar = document.querySelector(".sidebar");
  const sidebarContent = `
  <header>
    <div class="image-text">
      <span class="image">
        <img id="logo" src="/frontend/images/${logo}.svg" alt="">
      </span>
    </div>

    <i class='bx bx-chevron-right toggle'></i>
  </header>

  <div class="menu-bar">
    <div class="menu">
      <ul class="menu-links">
      </ul>
    </div>

    <div class="bottom-content">
      <li class="">
        <a href="#">
          <i class='bx bx-log-out icon'></i>
          <span class="text nav-text">Logout</span>
        </a>
      </li>

      <li class="mode">
        <div class="sun-moon">
          <i class='bx bx-moon icon moon'></i>
          <i class='bx bx-sun icon sun'></i>
        </div>
        <span class="mode-text text">Dark mode</span>

        <div class="toggle-switch">
          <span class="switch"></span>
        </div>
      </li>

    </div>
  </div>
  `;
  if (sideBar) {
    sideBar.innerHTML = sidebarContent;
  }

  const body = document.querySelector("body"),
    sidebar = body.querySelector("nav"),
    toggle = body.querySelector(".toggle"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    // Change logo
    const logo = document.getElementById("logo");
    if (body.classList.contains("dark")) {
      logo.src = `${BASE_PATH}/images/logo-white.svg`;
    } else {
      logo.src = `${BASE_PATH}/images/logo.svg`;
    }

    // Save theme to local storage
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");

    if (body.classList.contains("dark")) {
      modeText.innerText = "Light mode";
    } else {
      modeText.innerText = "Dark mode";
    }
  });

  // Show password code
  $(".show-password").click(function () {
    const input = $(".password");
    const type = input.attr("type") === "password" ? "text" : "password";
    input.attr("type", type);
    console.log($(this).children());
    $(".show-password .bx").toggleClass("bx-show");
    $(".show-password .bx").toggleClass("bx-hide");
  });

  // UI Advanced DOM
  const path = window.location.pathname;
  const isAdmin = path.includes("/admin/");
  const isTeacher = path.includes("/teacher/");
  const isStudent = path.includes("/student/");

  const menuLinks = document.querySelector(".menu-links");

  const navBars = {
    admin: [
      {
        href: "/admin/dashboard.html",
        text: "Dashboard",
        icon: "bx bx-home",
      },
      {
        href: "/admin/institution.html",
        text: "Institution",
        icon: "bx bxs-school",
      },
      {
        href: "/admin/teachers.html",
        text: "Teachers",
        icon: "bx bx-chalkboard",
      },
      {
        href: "/admin/students.html",
        text: "Students",
        icon: "bx bx-user",
      },
      {
        href: "/admin/courses.html",
        text: "Courses",
        icon: "bx bx-book-content",
      },
      {
        href: "/admin/notifications.html",
        text: "Notifications",
        icon: "bx bx-bell",
      },
      {
        href: "/admin/analytics.html",
        text: "Analytics",
        icon: "bx bx-pie-chart-alt",
      },
    ],
  };

  function setNavbar() {
    let navBar = navBars["admin"];

    if (isTeacher) {
      navBar = navBars["teacher"];
    }

    if (isStudent) {
      navBar = navBars["student"];
    }

    navBar.forEach((item) => {
      const expectedPath = `${BASE_PATH}${item.href}`.replace(".html", "");
      const isActive = path.includes(expectedPath);

      const listEl = document.createElement("li");
      listEl.classList.add("nav-link");

      if (isActive) {
        listEl.classList.add("active");
        const pageTitle = document.querySelector("title");
        pageTitle.innerText = `Learna - ${item.text}`;
      }

      listEl.innerHTML = `
    <a href="${BASE_PATH}${item.href}">
      <i class="${item.icon} icon"></i>
      <span class="text nav-text">${item.text}</span>
    </a>
  `;
      menuLinks.appendChild(listEl);
    });
  }

  setNavbar();

  // Form validation
  (() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  // Institution page
  const profileForm = document.getElementById("profile-form");
  const changePasswordForm = document.getElementById("change-password-form");
  const goToChangePassword = document.getElementById("goToChangePassword");
  const goToProfile = document.getElementById("goToProfile");

  if (goToChangePassword && goToProfile) {
    goToChangePassword.addEventListener("click", () => {
      profileForm.classList.add("d-none");
      changePasswordForm.classList.remove("d-none");
    });

    goToProfile.addEventListener("click", () => {
      profileForm.classList.remove("d-none");
      changePasswordForm.classList.add("d-none");
    });
  }

  // Toggle form elements
  const formElements = ["input", "textarea", "select"];
  function toggleForm(id) {
    const formEl = document.getElementById(id);
    const disabled = $(formEl).hasClass("disabled");
    $(formEl).toggleClass("disabled");
    formElements.forEach((el) => {
      const els = Array.from(formEl.getElementsByTagName(el));
      els.forEach((input) => {
        if (disabled) {
          $(input).removeAttr("disabled");
        } else {
          $(input).attr("disabled", "disabled");
        }
      });
    });
  }

  // Edit and updateBtn
  const editBtn = document.getElementById("editBtn");
  const updateBtn = document.getElementById("updateBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (editBtn && updateBtn && cancelBtn) {
    editBtn.addEventListener("click", () => {
      // Show update and cancel buttons
      updateBtn.classList.remove("d-none");
      cancelBtn.classList.remove("d-none");
      editBtn.classList.add("d-none");
      
      // Enable form elements
      const formId = editBtn.getAttribute("data-form")
      toggleForm(formId);
    });

    cancelBtn.addEventListener("click", () => {
      updateBtn.classList.add("d-none");
      cancelBtn.classList.add("d-none");
      editBtn.classList.remove("d-none");

      // Disable form elements
      const formId = editBtn.getAttribute("data-form")
      toggleForm(formId);
    });
  }

  // DataTable
  new DataTable(".example");
}

/**
 * This function will load scripts recursively,
 * and then initialize the UI
 */
function recursiveLoadScripts(scripts, index) {
  if (index === scripts.length) {
    return init();
  }

  loadScript(scripts[index], () => {
    recursiveLoadScripts(scripts, index + 1);
  });
}

function startScriptLoad() {
  recursiveLoadScripts(
    [
      "https://code.jquery.com/jquery-3.7.1.js",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
      "https://cdn.datatables.net/2.0.3/js/dataTables.js",
      "https://cdn.datatables.net/2.0.3/js/dataTables.bootstrap5.js",
    ],
    0
  );
}

/**
 * This function will load stylesheets recursively
 */
function recursiveLoadStylesheets(stylesheets, index) {
  if (index === stylesheets.length) {
    return startScriptLoad();
  }

  loadStylesheet(stylesheets[index], () => {
    recursiveLoadStylesheets(stylesheets, index + 1);
  });
}

recursiveLoadStylesheets(
  [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    "https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css",
    "https://cdn.datatables.net/2.0.3/css/dataTables.bootstrap5.css",
    `${BASE_PATH}/styles/style.css`,
  ],
  0
);
