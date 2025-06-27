<script lang="ts">
  import type { Expense } from '@/lib/data'
  import { slide } from 'svelte/transition'

  type Expenses = {
    category: string
    spent: number
    budget: number
    color: string
    expenseList: Expense[]
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

  export let expenses: Expenses[] = []

  // function addExpense() {
  //   expenses = [
  //     ...expenses,
  //     {
  //       category: 'Educación',
  //       spent: 50,
  //       budget: 100,
  //       color: 'indigo',
  //     },
  //   ]
  // }
  let expandedIndex: number | null = null
</script>

<div class="w-full">
  {#each expenses as { category, spent, budget, color, expenseList }, index}
    {@const percentage = (spent / budget) * 100}
    {@const remaining = budget - spent}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="mb-4 cursor-pointer bg-dark p-4 rounded-xl shadow-sm"
      on:click={() => (expandedIndex = expandedIndex === index ? null : index)}
    >
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
      {#if expandedIndex === index}
        <section class="mt-2 text-sm px-2 text-muted transition-all" transition:slide>
          <h2 class="text-lg font-semibold">Detalle de Gastos</h2>
          <ul class="mt-1 flex flex-col px-3">
            {#each expenseList as { title, date, mount }}
              <li>
                <h3 class="text-md">{title}</h3>
                <p>{mount}</p>
                <p>{date.toLocaleDateString()}</p>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </div>
  {/each}

  <!-- <button
    on:click={addExpense}
    class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
  >
    Agregar gasto ejemplo
  </button> -->
</div>
