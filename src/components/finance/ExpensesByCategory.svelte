<script lang="ts">
  type Expense = {
    category: string
    spent: number
    budget: number
    color: string // nombre clave como 'red', 'blue', etc.
  }

  // Mapeo de nombre → clase Tailwind
  const colorClasses: Record<string, string> = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
  }

  let expenses: Expense[] = [
    { category: 'Alimentación', spent: 195, budget: 400, color: 'red' },
    { category: 'Transporte', spent: 60, budget: 200, color: 'blue' },
    { category: 'Entretenimiento', spent: 15, budget: 100, color: 'green' },
    { category: 'Servicios', spent: 85, budget: 300, color: 'yellow' },
    { category: 'Vestimenta', spent: 120, budget: 150, color: 'purple' },
  ]

  function addExpense() {
    expenses = [
      ...expenses,
      {
        category: 'Educación',
        spent: 50,
        budget: 100,
        color: 'indigo',
      },
    ]
  }
</script>

<div class="rounded-xl p-4 bg-dark shadow-sm w-full">
  {#each expenses as { category, spent, budget, color }, index}
    {@const percentage = (spent / budget) * 100}
    {@const remaining = budget - spent}
    <div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <div class="flex items-center gap-2">
          <span class={`w-3 h-3 rounded-full ${colorClasses[color]}`}></span>
          <span class="font-medium">{category}</span>
        </div>
        <span class="text-sm font-semibold">${spent} / ${budget}</span>
      </div>
      <div class="h-3 bg-border rounded-full overflow-hidden mb-1">
        <div
          class="h-full bg-accent transition-all duration-300"
          style={`width: ${percentage}%`}
        ></div>
      </div>
      <div class="text-xs text-gray-500">
        {percentage.toFixed(1)}% used · Remaining: ${remaining}
      </div>
    </div>
  {/each}

  <!-- <button
    on:click={addExpense}
    class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
  >
    Agregar gasto ejemplo
  </button> -->
</div>
