/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen
    );

  });


  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}



/* =====================================================
   PORTFOLIO FILTER
===================================================== */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    const selectedCategory =
      filter.dataset.filter;


    /* Cambiar botón activo */

    filters.forEach(button => {
      button.classList.remove("active");
    });

    filter.classList.add("active");


    /* Filtrar proyectos */

    projects.forEach(project => {

      const category =
        project.dataset.category;


      if (
        selectedCategory === "all" ||
        category === selectedCategory
      ) {

        project.classList.remove("hide");

        project.classList.add("show");

      } else {

        project.classList.remove("show");

        project.classList.add("hide");

      }

    });

  });

});



/* =====================================================
   SCROLL REVEAL
===================================================== */

const elementsToReveal = document.querySelectorAll(
  ".project-card, .service, .about-content, .contact-inner"
);

elementsToReveal.forEach(element => {
  element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(
          entry.target
        );

      }

    });

  },
  {
    threshold: 0.12
  }
);


elementsToReveal.forEach(element => {

  revealObserver.observe(element);

});



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll(
  "section[id]"
);

const navigationLinks =
  document.querySelectorAll(".nav-link");


const sectionObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const currentId =
          entry.target.getAttribute("id");


        navigationLinks.forEach(link => {

          link.classList.remove("active");

          if (
            link.getAttribute("href") ===
            `#${currentId}`
          ) {
            link.classList.add("active");
          }

        });

      }

    });

  },
  {
    rootMargin: "-30% 0px -60% 0px"
  }
);


sections.forEach(section => {

  sectionObserver.observe(section);

});



/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
  document.querySelector(".footer a");

if (backToTop) {

  backToTop.addEventListener("click", event => {

    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}

/* =====================================================
   PROJECT MODAL
===================================================== */

const projectModal =
  document.getElementById("projectModal");

const modalOverlay =
  document.getElementById("modalOverlay");

const modalClose =
  document.getElementById("modalClose");


const modalTitle =
  document.getElementById("modalTitle");

const modalCategory =
  document.getElementById("modalCategory");

const modalYear =
  document.getElementById("modalYear");

const modalImage =
  document.getElementById("modalImage");

const modalDescription =
  document.getElementById("modalDescription");

const modalClient =
  document.getElementById("modalClient");

const modalServices =
  document.getElementById("modalServices");

const modalDetailYear =
  document.getElementById("modalDetailYear");

const modalGalleryOne =
  document.getElementById("modalGalleryOne");

const modalGalleryTwo =
  document.getElementById("modalGalleryTwo");

const modalProjectLink =
  document.getElementById("modalProjectLink");


/* ABRIR */

projects.forEach(project => {

  const link =
    project.querySelector(".project-link");

  link.addEventListener("click", event => {

    event.preventDefault();


    /* Obtener información */

    const title =
      project.dataset.title;

    const category =
      project.dataset.type;

    const year =
      project.dataset.year;

    const description =
      project.dataset.description;

    const client =
      project.dataset.client;

    const services =
      project.dataset.services;

    const image =
      project.dataset.image;

    const galleryOne =
      project.dataset.gallery1;

    const galleryTwo =
      project.dataset.gallery2;

    const url =
      project.dataset.url;


    /* Insertar información */

    modalTitle.textContent = title;

    modalCategory.textContent = category;

    modalYear.textContent = year;

    modalDetailYear.textContent = year;

    modalDescription.textContent =
      description;

    modalClient.textContent =
      client;

    modalServices.textContent =
      services;

    modalImage.src = image;

    modalImage.alt = title;

    modalGalleryOne.src =
      galleryOne;

    modalGalleryTwo.src =
      galleryTwo;

    modalProjectLink.href =
      url;


    /* Abrir modal */

    projectModal.classList.add("open");

    document.body.style.overflow = "hidden";

  });

});


/* CERRAR */

function closeProjectModal() {

  projectModal.classList.remove("open");

  document.body.style.overflow = "";

}


modalClose.addEventListener(
  "click",
  closeProjectModal
);


modalOverlay.addEventListener(
  "click",
  closeProjectModal
);


/* ESC */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      projectModal.classList.contains("open")
    ) {

      closeProjectModal();

    }

  }
);

/* =====================================================
   HEADER SCROLL
===================================================== */

const header = document.querySelector(".header");

if (header) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  });

}