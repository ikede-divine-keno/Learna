const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});

// UI Advanced DOM
const path = window.location.pathname;
const isAdmin = path.includes("/admin/");
const isTeacher = path.includes("/teacher/");
const isStudent = path.includes("/student/");

const menuLinks = document.querySelector(".menu-links");
const basePath = "/frontend";

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
      href: "/admin/subjects.html",
      text: "Notifications",
      icon: "bx bx-bell",
    },
    {
      href: "/admin/subjects.html",
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
    const expectedPath = `${basePath}${item.href}`;
    const isActive = path === expectedPath;

    const listEl = document.createElement("li");
    listEl.classList.add("nav-link");
    if (isActive) {
      listEl.classList.add("active");
      const pageTitle = document.querySelector("title");
      pageTitle.innerText = `Learna - ${item.text}`
    }

    listEl.innerHTML = `
    <a href="${basePath}${item.href}">
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

// DataTable
new DataTable('#example');
