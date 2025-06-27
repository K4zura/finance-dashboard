<script>
  import { chart } from 'svelte-apexcharts'
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'

  // Recibe los datos desde .astro
  export let data = [
    { year: 2024, month: 'Ene', Trabajo: 1500, Trading: 300, Ropa: 100, Tortas: 20, Youtube: 700 },
    { year: 2024, month: 'Feb', Trabajo: 1800, Trading: 20, Ropa: 50, Tortas: 300, Youtube: 700 },
    { year: 2024, month: 'Mar', Trabajo: 1700, Trading: 60, Ropa: 200, Tortas: 200, Youtube: 500 },
    { year: 2024, month: 'Abr', Trabajo: 1500, Trading: 40, Ropa: 210, Tortas: 500, Youtube: 1200 },
    { year: 2024, month: 'May', Trabajo: 1200, Trading: 510, Ropa: 20, Tortas: 40, Youtube: 900 },
    { year: 2024, month: 'Jul', Trabajo: 2000, Trading: 100, Ropa: 130, Tortas: 20, Youtube: 700 },
    { year: 2024, month: 'Jun', Trabajo: 1900, Trading: 10, Ropa: 70, Tortas: 20, Youtube: 700 },
    { year: 2025, month: 'Ene', Trabajo: 1600, Trading: 400, Ropa: 120, Tortas: 20, Youtube: 700 },
    { year: 2025, month: 'Feb', Trabajo: 1750, Trading: 200, Ropa: 80, Tortas: 20, Youtube: 700 },
    { year: 2025, month: 'Mar', Trabajo: 1750, Trading: 200, Ropa: 80, Tortas: 20, Youtube: 700 },
    { year: 2025, month: 'Abr', Trabajo: 1750, Trading: 200, Ropa: 80, Tortas: 20, Youtube: 700 },
    { year: 2025, month: 'May', Trabajo: 1750, Trading: 200, Ropa: 80, Tortas: 20, Youtube: 700 },
  ]

  let selectedYear = new Date().getFullYear()
  let selectedMonth = 'Todos'
  const categoryLabels = ['Trabajo', 'Trading', 'Venta Ropa', 'Venta Tortas', 'Youtube']

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
    return filteredData.reduce((total, item) => total + item[category], 0)
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
    series:
      selectedMonth === 'Todos'
        ? [
            {
              data: [
                {
                  x: 'Trabajo',
                  y: [sumCategory('Trabajo')],
                },
                {
                  x: 'Trading',
                  y: [sumCategory('Trading')],
                },
                {
                  x: 'Ropa',
                  y: [sumCategory('Ropa')],
                },
                {
                  x: 'Tortas',
                  y: [sumCategory('Tortas')],
                },
                {
                  x: 'Youtube',
                  y: [sumCategory('Youtube')],
                },
              ],
            },
          ]
        : [
            {
              data: [
                {
                  x: 'Trabajo',
                  y: filteredData.map((d) => d.Trabajo),
                },
                {
                  x: 'Trading',
                  y: filteredData.map((d) => d.Trading),
                },
                {
                  x: 'Ropa',
                  y: filteredData.map((d) => d.Ropa),
                },
                {
                  x: 'Tortas',
                  y: filteredData.map((d) => d.Tortas),
                },
                {
                  x: 'Youtube',
                  y: filteredData.map((d) => d.Youtube),
                },
              ],
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
