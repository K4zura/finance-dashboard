<script>
  import { chart } from 'svelte-apexcharts'
  import { onMount } from 'svelte'

  // Recibe los datos desde .astro
  export let data = [
    { year: 2024, month: 'Ene', Trabajo: 1500, Trading: 300, Ropa: 100 },
    { year: 2024, month: 'Feb', Trabajo: 1800, Trading: 0, Ropa: 50 },
    { year: 2024, month: 'Mar', Trabajo: 1700, Trading: 600, Ropa: 200 },
    { year: 2025, month: 'Ene', Trabajo: 1600, Trading: 400, Ropa: 120 },
    { year: 2025, month: 'Feb', Trabajo: 1750, Trading: 200, Ropa: 80 },
  ]

  let selectedYear = new Date().getFullYear()
  let selectedMonth = 'Todos'
  const categoryLabels = ['Trabajo', 'Trading', 'Ropa']

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
              ],
            },
          ],
  }
</script>

<!-- Filtros -->
<div class="flex flex-wrap gap-4 mb-4">
  <div>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block mb-1 text-sm font-medium">Año</label>
    <select bind:value={selectedYear} class="border px-3 py-1 rounded bg-dark border-border">
      {#each availableYears as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>

  <div>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block mb-1 text-sm font-medium">Mes</label>
    <select bind:value={selectedMonth} class="border px-3 py-1 rounded bg-dark border-border">
      {#each availableMonths as month}
        <option value={month}>{month}</option>
      {/each}
    </select>
  </div>
</div>

<!-- Gráfico -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div use:chart={options} class="min-h-[350px] bg-surface rounded-xl shadow-lg p-4" />
