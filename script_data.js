document.addEventListener('DOMContentLoaded', () => {
  const TIER_COLORS = {
    Starter: '#38bdf8',
    Pro: '#a855f7',
    Business: '#f59e0b',
    Enterprise: '#4ade80'
  };

  let charts = {};

  // Escuchamos los clics en las tarjetas de proyectos
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const isSaas = card.dataset.isSaas === 'true';
      const saasContainer = document.getElementById('saasDashboardContainer');
      const sliderHero = document.querySelector('.modal-hero.modal-slider');

      if (isSaas) {
        // Es el proyecto de Data Analytics: ocultamos slider de fotos y mostramos gráficos
        if (sliderHero) sliderHero.style.display = 'none';
        if (saasContainer) saasContainer.style.display = 'block';
        initSaasDashboard();
      } else {
        // Es un proyecto de Diseño UI/UX: restauramos el slider normal
        if (sliderHero) sliderHero.style.display = '';
        if (saasContainer) saasContainer.style.display = 'none';
      }
    });
  });

  async function initSaasDashboard() {
    try {
      const response = await fetch('saas_data.json');
      const data = await response.json();
      renderSaasTable(data.summary_table);
      renderSaasCharts(data);
    } catch (err) {
      console.error('Error cargando saas_data.json:', err);
    }
  }

  function renderSaasTable(summary) {
    const tbody = document.getElementById('saas-table-body');
    if (!tbody) return;
    tbody.innerHTML = summary.map(row => {
      const nrrColor = parseFloat(row.nrr) >= 100 ? '#4ade80' : '#f87171';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 0.7rem 0; color: ${TIER_COLORS[row.tier]}; font-weight: 600;">${row.tier}</td>
          <td style="padding: 0.7rem 0;">${row.mrr}</td>
          <td style="padding: 0.7rem 0; color: ${nrrColor}; font-weight: 600;">${row.nrr}</td>
          <td style="padding: 0.7rem 0;">${row.monthly_churn}</td>
          <td style="padding: 0.7rem 0;">${row.ltv_cac}</td>
        </tr>
      `;
    }).join('');
  }

  function renderSaasCharts(data) {
    const tiers = Object.keys(data.mrr_series);
    Object.values(charts).forEach(chart => chart.destroy());

    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom', labels: { color: '#cbd5e1', usePointStyle: true, boxWidth: 8, font: { size: 11 } } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', maxTicksLimit: 6, font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { color: '#94a3b8', font: { size: 10 } } }
      }
    };

    // Gráfico 02: MRR
    charts.mrr = new Chart(document.getElementById('chart-mrr'), {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: tiers.map(t => ({ label: t, data: data.mrr_series[t], borderColor: TIER_COLORS[t], borderWidth: 2, pointRadius: 0, tension: 0.3 }))
      },
      options: {
        ...baseOptions,
        scales: { ...baseOptions.scales, y: { ...baseOptions.scales.y, ticks: { color: '#94a3b8', font: { size: 10 }, callback: v => '$' + (v / 1000).toFixed(0) + 'k' } } }
      }
    });

    // Gráfico 03: Retención
    charts.retention = new Chart(document.getElementById('chart-retention'), {
      type: 'line',
      data: {
        labels: Array.from({ length: 25 }, (_, i) => `M${i}`),
        datasets: tiers.map(t => ({ label: t, data: data.retention_series[t], borderColor: TIER_COLORS[t], borderWidth: 2, pointRadius: 0, tension: 0.3 }))
      },
      options: {
        ...baseOptions,
        scales: { ...baseOptions.scales, y: { ...baseOptions.scales.y, ticks: { color: '#94a3b8', font: { size: 10 }, callback: v => v + '%' } } }
      }
    });

    // Gráfico 04: Churn
    charts.churn = new Chart(document.getElementById('chart-churn'), {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: tiers.map(t => ({ label: t, data: data.churn_series[t], borderColor: TIER_COLORS[t], borderWidth: 1.5, pointRadius: 0, tension: 0.2 }))
      },
      options: {
        ...baseOptions,
        scales: { ...baseOptions.scales, y: { ...baseOptions.scales.y, ticks: { color: '#94a3b8', font: { size: 10 }, callback: v => v + '%' } } }
      }
    });
  }
});