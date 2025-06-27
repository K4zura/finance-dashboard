<script>
  import { chart } from 'svelte-apexcharts'
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'

  // Recibe los datos desde .astro
  export let data = []

  let selectedYear = new Date().getFullYear()
  let selectedMonth = 'Todos'
  $: categoryLabels = Array.from(
    new Set(data.flatMap((item) => Object.keys(item).filter((k) => k !== 'year' && k !== 'month'))),
  )

  $: {
    if (!availableMonths.includes(selectedMonth)) {
      selectedMonth = 'Todos'
    }
  }

  // Obtener años disponibles desde los datos
  $: availableYears = [...new Set(data.map((item) => item.year))]

  // Obtener meses disponibles para el año seleccionado
  $: availableMonths = [
    'Todos',
    ...new Set(data.filter((item) => item.year === selectedYear).map((item) => item.month)),
  ]

  // Filtrar los datos según año y mes
  $: filteredData = data.filter(
    (item) =>
      item.year === selectedYear && (selectedMonth === 'Todos' || item.month === selectedMonth),
  )

  // Función para sumar una categoría en todos los meses del año
  function sumCategory(category) {
    return filteredData.reduce((total, item) => total + (item[category] || 0), 0)
  }

  // Colores adaptados a tu tema (Tailwind o variables CSS)
  let colorPrimary = '#4f46e5'
  let colorSecondary = '#10b981'
  let colorTertiary = '#f59e0b'
  let bgColor = '#ffffff'
  let boColor = '#ffffff'

  onMount(() => {
    const styles = getComputedStyle(document.documentElement)
    colorPrimary = styles.getPropertyValue('--color-primary').trim() || colorPrimary
    colorSecondary = styles.getPropertyValue('--color-secondary').trim() || colorSecondary
    colorTertiary = styles.getPropertyValue('--color-tertiary').trim() || colorTertiary
    bgColor = styles.getPropertyValue('--color-surface').trim() || bgColor
    boColor = styles.getPropertyValue('--color-dark').trim() || boColor
  })

  // Configuración del gráfico ApexCharts
  $: options = {
    chart: {
      type: 'bar',
      height: 350,
      background: bgColor,
      fontFamily: 'Oxanium Variable',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: false,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    theme: {
      mode: 'dark',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        endingShape: 'rounded',
        borderRadius: 10,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categoryLabels,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: boColor,
    },
    fill: {
      opacity: 1,
    },
    series: [
      {
        data:
          selectedMonth === 'Todos'
            ? categoryLabels.map((label) => ({
                x: label,
                y: [sumCategory(label)],
              }))
            : categoryLabels.map((label) => ({
                x: label,
                y: filteredData.map((d) => d[label] || 0),
              })),
      },
    ],
  }
</script>

<!-- Filtros -->
<div class="flex flex-wrap gap-4 mb-4">
  <div>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block mb-1 text-sm font-medium" for="year">Año</label>
    <select
      bind:value={selectedYear}
      id="year"
      class="border px-3 py-1 rounded bg-dark border-border"
    >
      {#each availableYears as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>

  <div>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block mb-1 text-sm font-medium" for="month">Mes</label>
    <select
      bind:value={selectedMonth}
      id="month"
      class="border px-3 py-1 rounded bg-dark border-border"
    >
      {#each availableMonths as month}
        <option value={month}>{month}</option>
      {/each}
    </select>
  </div>
</div>

<!-- Gráfico -->
<!-- svelte-ignore element_invalid_self_closing_tag -->

<div
  use:chart={options}
  transition:slide={{ duration: 500 }}
  class="min-h-[350px] bg-surface rounded-xl shadow-lg shadow-dark p-4"
/>
