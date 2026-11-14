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

    filters.forEach(button => {
      button.classList.remove("active");
    });

    filter.classList.add("active");

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
   PROJECT MODAL + IMAGE SLIDER
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


/* =====================================================
   SLIDER ELEMENTS
===================================================== */

const modalSliderPrev =
  document.getElementById("modalSliderPrev");

const modalSliderNext =
  document.getElementById("modalSliderNext");

const modalSliderDots =
  document.getElementById("modalSliderDots");


/* =====================================================
   SLIDER VARIABLES
===================================================== */

let modalImages = [];

let currentModalImage = 0;

let modalSliderInterval = null;


/* =====================================================
   MOSTRAR IMAGEN
===================================================== */

function showModalImage(index) {

  if (!modalImages.length) {
    return;
  }

  if (index < 0) {
    index = modalImages.length - 1;
  }

  if (index >= modalImages.length) {
    index = 0;
  }

  currentModalImage = index;

  modalImage.style.opacity = "0";

  setTimeout(() => {

    modalImage.src =
      modalImages[currentModalImage];

    modalImage.style.opacity = "1";

  }, 150);

  updateModalDots();

}


/* =====================================================
   PUNTOS DEL SLIDER
===================================================== */

function createModalDots() {

  if (!modalSliderDots) {
    return;
  }

  modalSliderDots.innerHTML = "";

  modalImages.forEach((image, index) => {

    const dot =
      document.createElement("button");

    dot.type = "button";

    dot.className =
      "modal-slider-dot";

    dot.setAttribute(
      "aria-label",
      `Ver imagen ${index + 1}`
    );

    dot.addEventListener(
      "click",
      () => {

        showModalImage(index);

        restartModalSlider();

      }
    );

    modalSliderDots.appendChild(dot);

  });

  updateModalDots();

}


/* =====================================================
   ACTUALIZAR PUNTOS
===================================================== */

function updateModalDots() {

  if (!modalSliderDots) {
    return;
  }

  const dots =
    modalSliderDots.querySelectorAll(
      ".modal-slider-dot"
    );

  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentModalImage
    );

  });

}


/* =====================================================
   SIGUIENTE
===================================================== */

function nextModalImage() {

  if (modalImages.length <= 1) {
    return;
  }

  showModalImage(
    currentModalImage + 1
  );

}


/* =====================================================
   ANTERIOR
===================================================== */

function previousModalImage() {

  if (modalImages.length <= 1) {
    return;
  }

  showModalImage(
    currentModalImage - 1
  );

}


/* =====================================================
   AUTOPLAY
===================================================== */

function startModalSlider() {

  stopModalSlider();

  if (modalImages.length <= 1) {
    return;
  }

  modalSliderInterval =
    setInterval(() => {

      nextModalImage();

    }, 8000);

}


function stopModalSlider() {

  if (modalSliderInterval) {

    clearInterval(
      modalSliderInterval
    );

    modalSliderInterval = null;

  }

}


function restartModalSlider() {

  startModalSlider();

}


/* =====================================================
   BOTONES DEL SLIDER
===================================================== */

if (modalSliderNext) {

  modalSliderNext.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      nextModalImage();

      restartModalSlider();

    }
  );

}


if (modalSliderPrev) {

  modalSliderPrev.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      previousModalImage();

      restartModalSlider();

    }
  );

}


/* =====================================================
   CLICK SOBRE LA IMAGEN
===================================================== */

if (modalImage) {

  modalImage.addEventListener(
    "click",
    () => {

      nextModalImage();

      restartModalSlider();

    }
  );

}


/* =====================================================
   ABRIR PROYECTO
===================================================== */

projects.forEach(project => {

  const link =
    project.querySelector(".project-link");

  if (!link) {
    return;
  }

  link.addEventListener(
    "click",
    async event => {

      event.preventDefault();


      /* ===============================================
         DATOS DEL PROYECTO
      =============================================== */

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

      const galleryThree =
        project.dataset.gallery3;

      const url =
        project.dataset.url;


      /* ===============================================
         OCULTAR FINANCIAL ANALYSIS
      =============================================== */

      setFinanceVisibility(false);


      /* ===============================================
         INFORMACIÓN
      =============================================== */

      if (modalTitle) {
        modalTitle.textContent = title;
      }

      if (modalCategory) {
        modalCategory.textContent = category;
      }

      if (modalYear) {
        modalYear.textContent = year;
      }

      if (modalDetailYear) {
        modalDetailYear.textContent = year;
      }

      if (modalDescription) {
        modalDescription.textContent = description;
      }

      if (modalClient) {
        modalClient.textContent = client;
      }

      if (modalServices) {
        modalServices.textContent = services;
      }


      /* ===============================================
         SLIDER
         
         data-image   = imagen 1
         data-gallery1 = imagen 2

      =============================================== */

      modalImages = [];

      if (image) {

        modalImages.push(image);

      }

      if (
        galleryOne &&
        galleryOne !== image
      ) {

        modalImages.push(
          galleryOne
        );

      }
      if (!modalImages.length) {

        modalImages = [
          "images/proyecto.jpg"
        ];

      }

      currentModalImage = 0;

      if (modalImage) {

        modalImage.alt = title;

      }

      createModalDots();

      showModalImage(0);


      /* ===============================================
         GALERÍA INFERIOR
         
         IMPORTANTE:
         gallery1 NO se coloca abajo.
         
         gallery2 = imagen inferior 1
         gallery3 = imagen inferior 2
      =============================================== */

      if (modalGalleryOne) {

        if (galleryTwo) {

          modalGalleryOne.src =
            galleryTwo;

          modalGalleryOne.alt =
            `${title} - imagen adicional`;

          modalGalleryOne.style.display =
            "block";

        } else {

          modalGalleryOne.src = "";

          modalGalleryOne.style.display =
            "none";

        }

      }


      if (modalGalleryTwo) {

        if (galleryThree) {

          modalGalleryTwo.src =
            galleryThree;

          modalGalleryTwo.alt =
            `${title} - detalle`;

          modalGalleryTwo.style.display =
            "block";

        } else {

          modalGalleryTwo.src = "";

          modalGalleryTwo.style.display =
            "none";

        }

      }


      /* ===============================================
         LINK
      =============================================== */

      if (modalProjectLink) {

        if (url) {

          modalProjectLink.href =
            url;

          modalProjectLink.style.display =
            "flex";

        } else {

          modalProjectLink.style.display =
            "none";

        }

      }


      /* ===============================================
         ABRIR MODAL
      =============================================== */

      if (projectModal) {

        projectModal.classList.add(
          "open"
        );

      }

      document.body.style.overflow =
        "hidden";


      /* ===============================================
         FINANCIAL DATA ANALYSIS
      =============================================== */

      const isFinanceProject =
        title === "Financial Data Analysis";

      if (isFinanceProject) {

        const financeContainer =
          createFinanceAnalysis();

        if (financeContainer) {

          setFinanceVisibility(true);

          requestAnimationFrame(() => {

            renderFinanceSummary();

            renderFinanceCharts();

          });

        }

      }


      /* ===============================================
         INICIAR SLIDER
      =============================================== */

      startModalSlider();

    }
  );

});


/* =====================================================
   CERRAR MODAL
===================================================== */

function closeProjectModal() {

  if (projectModal) {

    projectModal.classList.remove(
      "open"
    );

  }

  document.body.style.overflow = "";

  stopModalSlider();

}


/* =====================================================
   BOTÓN CERRAR
===================================================== */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeProjectModal
  );

}


/* =====================================================
   OVERLAY
===================================================== */

if (modalOverlay) {

  modalOverlay.addEventListener(
    "click",
    closeProjectModal
  );

}


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      !projectModal ||
      !projectModal.classList.contains("open")
    ) {

      return;

    }


    if (event.key === "Escape") {

      closeProjectModal();

    }


    if (event.key === "ArrowRight") {

      nextModalImage();

      restartModalSlider();

    }


    if (event.key === "ArrowLeft") {

      previousModalImage();

      restartModalSlider();

    }

  }
);


/* =====================================================
   CHART.JS
===================================================== */

let chartJsPromise = null;

function loadChartJS() {

  if (window.Chart) {

    return Promise.resolve(
      window.Chart
    );

  }

  if (chartJsPromise) {

    return chartJsPromise;

  }

  chartJsPromise = new Promise(
    (resolve, reject) => {

      const existingScript =
        document.querySelector(
          'script[src*="chart.js"]'
        );

      if (existingScript) {

        existingScript.addEventListener(
          "load",
          () => resolve(window.Chart)
        );

        existingScript.addEventListener(
          "error",
          reject
        );

        return;

      }

      const script =
        document.createElement("script");

      script.src =
        "https://cdn.jsdelivr.net/npm/chart.js";

      script.onload = () => {

        resolve(
          window.Chart
        );

      };

      script.onerror = () => {

        reject(
          new Error(
            "No se pudo cargar Chart.js"
          )
        );

      };

      document.head.appendChild(
        script
      );

    }
  );

  return chartJsPromise;

}


/* =====================================================
   FINANCIAL DATA
===================================================== */

const financeCharts = {};

const financeDataCache = {};


/* =====================================================
   CARGAR JSON
===================================================== */

async function loadFinanceJSON(
  filename
) {

  if (financeDataCache[filename]) {

    return financeDataCache[filename];

  }

  const response =
    await fetch(
      `data/${filename}`
    );

  if (!response.ok) {

    throw new Error(
      `No se pudo cargar data/${filename}`
    );

  }

  const data =
    await response.json();

  financeDataCache[filename] =
    data;

  return data;

}


/* =====================================================
   NORMALIZAR JSON
===================================================== */

function normalizeTimeSeries(
  data
) {

  if (Array.isArray(data)) {

    return data;

  }

  return Object.entries(data)
    .map(([date, values]) => {

      return {
        date,
        ...values
      };

    })
    .sort((a, b) => {

      return (
        new Date(a.date) -
        new Date(b.date)
      );

    });

}


/* =====================================================
   COLORES FINANCIAL
===================================================== */

const financeAssetColors = {

  "S&P 500": "#9A6658",

  "Gold": "#B89A5A",

  "Bitcoin": "#777777",

  "Bonds": "#B7B2AC"

};


/* =====================================================
   FORMATEAR NÚMEROS
===================================================== */

function formatPercent(value) {

  if (
    value === null ||
    value === undefined ||
    Number.isNaN(
      Number(value)
    )
  ) {

    return "—";

  }

  return (
    Number(value).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    ) +
    "%"
  );

}


/* =====================================================
   CREAR CONTENEDOR FINANCIERO
===================================================== */

function createFinanceAnalysis() {

  let financeContainer =
    document.querySelector(
      ".finance-analysis"
    );

  if (financeContainer) {

    return financeContainer;

  }

  const modalContainer =
    document.querySelector(
      ".modal-container"
    );

  if (!modalContainer) {

    return null;

  }

  financeContainer =
    document.createElement(
      "section"
    );

  financeContainer.className =
    "finance-analysis";

  financeContainer.innerHTML = `

    <div class="finance-intro">

      <span class="finance-eyebrow">
        DATA ANALYSIS
      </span>

      <h3>
        Financial Market Analysis
      </h3>

      <p>
        Monthly analysis of four asset classes
        using historical price data,
        performance metrics and
        inflation-adjusted measurements.
      </p>

      <div class="finance-tags">

        <span>Python</span>
        <span>Data Analysis</span>
        <span>Data Visualization</span>
        <span>JavaScript</span>

      </div>

    </div>


    <div class="finance-summary">

      <div class="finance-summary-header">

        <span class="finance-section-number">
          01
        </span>

        <div>

          <span class="finance-eyebrow">
            PERFORMANCE & RISK
          </span>

          <h4>
            Asset performance
          </h4>

        </div>

      </div>


      <div class="finance-table-wrapper">

        <table class="finance-table">

          <thead>

            <tr>

              <th>Asset</th>

              <th>Nominal Return</th>

              <th>Real Return</th>

              <th>Volatility</th>

              <th>Max Drawdown</th>

            </tr>

          </thead>

          <tbody id="financeSummaryBody"></tbody>

        </table>

      </div>

    </div>


    <div class="finance-chart-section">

      <div class="finance-chart-heading">

        <span class="finance-section-number">
          02
        </span>

        <div>

          <span class="finance-eyebrow">
            PERFORMANCE
          </span>

          <h4>
            Growth of $100
          </h4>

          <p>
            Evolution of a hypothetical
            $100 investment over time.
          </p>

        </div>

      </div>

      <div class="finance-chart">

        <canvas id="growthChart"></canvas>

      </div>

    </div>


    <div class="finance-chart-section">

      <div class="finance-chart-heading">

        <span class="finance-section-number">
          03
        </span>

        <div>

          <span class="finance-eyebrow">
            INFLATION ADJUSTED
          </span>

          <h4>
            Real Growth
          </h4>

          <p>
            Growth adjusted for inflation
            using the CPI data from the analysis.
          </p>

        </div>

      </div>

      <div class="finance-chart">

        <canvas id="realGrowthChart"></canvas>

      </div>

    </div>


    <div class="finance-chart-section">

      <div class="finance-chart-heading">

        <span class="finance-section-number">
          04
        </span>

        <div>

          <span class="finance-eyebrow">
            RISK
          </span>

          <h4>
            Drawdown
          </h4>

          <p>
            Historical decline from previous
            portfolio peaks.
          </p>

        </div>

      </div>

      <div class="finance-chart">

        <canvas id="drawdownChart"></canvas>

      </div>

    </div>


    <div class="finance-reading">

      <div class="finance-reading-label">

        <span class="finance-eyebrow">
          READING THE DATA
        </span>

      </div>

      <div class="finance-reading-content">

        <h4>
          From historical data to visual insight.
        </h4>

        <p>
          The analysis compares S&P 500,
          Gold, Bitcoin and Bonds across
          nominal performance, real performance,
          volatility and maximum drawdown.
        </p>

        <p>
          Returns are calculated from historical
          price data. Real returns incorporate
          the inflation adjustment used in the
          original analysis.
        </p>

      </div>

    </div>

  `;

  modalContainer.appendChild(
    financeContainer
  );

  return financeContainer;

}


/* =====================================================
   MOSTRAR / OCULTAR FINANCE
===================================================== */

function setFinanceVisibility(
  isVisible
) {

  const financeContainer =
    document.querySelector(
      ".finance-analysis"
    );

  if (!financeContainer) {

    return;

  }

  if (isVisible) {

    financeContainer.classList.add(
      "finance-visible"
    );

  } else {

    financeContainer.classList.remove(
      "finance-visible"
    );

  }

}


/* =====================================================
   SUMMARY
===================================================== */

async function renderFinanceSummary() {

  const body =
    document.getElementById(
      "financeSummaryBody"
    );

  if (!body) {

    return;

  }

  try {

    const summary =
      await loadFinanceJSON(
        "finance_summary.json"
      );

    body.innerHTML = "";

    Object.entries(summary)
      .forEach(
        ([asset, metrics]) => {

          const row =
            document.createElement(
              "tr"
            );

          const assetColor =
            financeAssetColors[asset] ||
            "#777";

          row.innerHTML = `

            <td>

              <span
                class="finance-asset"
                style="--asset-color: ${assetColor};"
              >

                ${asset}

              </span>

            </td>

            <td>
              ${formatPercent(
                metrics["Nominal Return"]
              )}
            </td>

            <td>
              ${formatPercent(
                metrics["Real Return"]
              )}
            </td>

            <td>
              ${formatPercent(
                metrics["Volatility"]
              )}
            </td>

            <td>
              ${formatPercent(
                metrics["Max Drawdown"]
              )}
            </td>

          `;

          body.appendChild(
            row
          );

        }
      );

  } catch (error) {

    console.error(
      "Error cargando finance_summary.json:",
      error
    );

    body.innerHTML = `

      <tr>

        <td colspan="5">

          No se pudo cargar el resumen
          financiero.

        </td>

      </tr>

    `;

  }

}


/* =====================================================
   CREAR GRÁFICO
===================================================== */

async function createFinanceChart(
  canvasId,
  filename,
  chartType = "line"
) {

  const canvas =
    document.getElementById(
      canvasId
    );

  if (!canvas) {

    return;

  }

  try {

    const Chart =
      await loadChartJS();

    const rawData =
      await loadFinanceJSON(
        filename
      );

    const data =
      normalizeTimeSeries(
        rawData
      );

    const assets = [

      "S&P 500",

      "Gold",

      "Bitcoin",

      "Bonds"

    ];

    const labels =
      data.map(item => {

        if (!item.date) {

          return "";

        }

        const date =
          new Date(
            item.date
          );

        return date.toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric"
          }
        );

      });

    const datasets =
      assets.map(asset => {

        return {

          label: asset,

          data:
            data.map(item => {

              const value =
                item[asset];

              return value !== undefined
                ? Number(value)
                : null;

            }),

          borderColor:
            financeAssetColors[asset],

          backgroundColor:
            financeAssetColors[asset],

          borderWidth: 1.8,

          pointRadius: 0,

          pointHoverRadius: 4,

          tension: 0.25,

          fill: false

        };

      });


    if (financeCharts[canvasId]) {

      financeCharts[canvasId].destroy();

    }


    financeCharts[canvasId] =
      new Chart(
        canvas.getContext("2d"),
        {

          type: chartType,

          data: {

            labels,

            datasets

          },

          options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {

              mode: "index",

              intersect: false

            },

            plugins: {

              legend: {

                display: true,

                position: "bottom",

                labels: {

                  usePointStyle: true,

                  pointStyle: "line",

                  boxWidth: 20,

                  padding: 20,

                  font: {

                    family: "DM Sans",

                    size: 10

                  }

                }

              },

              tooltip: {

                backgroundColor:
                  "#211f1d",

                titleFont: {

                  family: "DM Sans",

                  size: 11

                },

                bodyFont: {

                  family: "DM Sans",

                  size: 11

                },

                padding: 12,

                displayColors: true,

                callbacks: {

                  label:
                    function(context) {

                      const value =
                        context.parsed.y;

                      return (

                        `${context.dataset.label}: ` +

                        Number(value)
                          .toLocaleString(
                            "en-US",
                            {

                              minimumFractionDigits: 2,

                              maximumFractionDigits: 2

                            }
                          )

                      );

                    }

                }

              }

            },

            scales: {

              x: {

                grid: {

                  display: false

                },

                ticks: {

                  maxTicksLimit: 8,

                  color: "#888",

                  font: {

                    family: "DM Sans",

                    size: 9

                  }

                },

                border: {

                  display: false

                }

              },

              y: {

                grid: {

                  color:
                    "rgba(0,0,0,.06)"

                },

                ticks: {

                  color: "#888",

                  font: {

                    family: "DM Sans",

                    size: 9

                  },

                  callback:
                    function(value) {

                      return Number(value)
                        .toLocaleString(
                          "en-US",
                          {

                            maximumFractionDigits: 0

                          }
                        );

                    }

                },

                border: {

                  display: false

                }

              }

            }

          }

        }

      );

  } catch (error) {

    console.error(
      `Error cargando ${filename}:`,
      error
    );

    const parent =
      canvas.closest(
        ".finance-chart"
      );

    if (parent) {

      parent.innerHTML = `

        <div class="finance-error">

          No se pudieron cargar
          los datos de este gráfico.

        </div>

      `;

    }

  }

}


/* =====================================================
   CARGAR TODOS LOS GRÁFICOS
===================================================== */

async function renderFinanceCharts() {

  await loadChartJS();

  await createFinanceChart(
    "growthChart",
    "growth_data.json"
  );

  await createFinanceChart(
    "realGrowthChart",
    "real_growth_data.json"
  );

  await createFinanceChart(
    "drawdownChart",
    "drawdown_data.json"
  );

}


/* =====================================================
   HEADER SCROLL
===================================================== */

const header =
  document.querySelector(".header");

if (header) {

  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 50) {

        header.classList.add(
          "scrolled"
        );

      } else {

        header.classList.remove(
          "scrolled"
        );

      }

    }
  );

}