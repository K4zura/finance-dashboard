<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { Expense } from '@/lib/data'

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

  function getColor(color: string) {
    return colorClasses[color] ?? 'bg-gray-400'
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

<div class="w-full flex flex-col gap-4">
  {#each expenses as { category, spent, budget, color, expenseList }, index}
    {@const percentage = (spent / budget) * 100}
    {@const remaining = budget - spent}
    <article class=" bg-dark rounded-xl shadow-sm select-none">
      <header
        role="button"
        tabindex="0"
        aria-expanded={expandedIndex === index}
        class="p-4 cursor-pointer"
        on:click={() => (expandedIndex = expandedIndex === index ? null : index)}
        on:keydown={(e) =>
          e.key === 'Enter' && (expandedIndex = expandedIndex === index ? null : index)}
      >
        <div class="flex justify-between items-center mb-1">
          <div class="flex items-center gap-2">
            <span class={`w-4 h-4 rounded-full ${getColor(color)}`}></span>
            <span class="font-medium">{category}</span>
          </div>
          <span class="text-sm font-semibold">${spent} / ${budget}</span>
        </div>
        <div
          class="h-3 bg-border rounded-full overflow-hidden mb-1"
          role="progressbar"
          aria-valuenow={Number(percentage)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="h-full bg-accent transition-all duration-300"
            style={`width: ${percentage}%`}
          ></div>
        </div>
        <footer class="text-xs text-gray-500">
          {percentage.toFixed(1)}% used · Remaining: ${remaining}
        </footer>
      </header>
      {#if expandedIndex === index}
        <section class="text-sm pb-6 px-8 text-light transition-all" transition:slide>
          <h2 class="text-lg font-bold">Detalle de Gastos</h2>
          <ul class="mt-1 grid grid-cols-2 gap-3">
            {#each expenseList as { title, date, mount, frequency }}
              {@const usedPercent = ((mount / spent) * 100).toFixed(1)}
              <li class="p-4 flex flex-col gap-1 bg-surface shadow shadow-accent rounded group">
                <div role="group" class="flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <span class={`w-3 h-3 rounded-full ${colorClasses[color]}`}></span>
                    <div class="flex flex-col">
                      <h3 class="text-base font-semibold">{title}</h3>
                      <span class="bg-accent px-3 py-1 rounded-full text-surface font-semibold">
                        {frequency}
                      </span>
                    </div>
                  </div>
                  <div class="hidden group-hover:flex gap-1 items-center justify-end">
                    <button
                      aria-label="edit"
                      class="cursor-pointer text-primary p-2 hover:bg-border rounded-lg"
                    >
                      <svg
                        class="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path
                          d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        /><path
                          d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                        /></svg
                      >
                    </button>
                    <button
                      aria-label="delete"
                      class="cursor-pointer text-error p-2 hover:bg-border rounded-lg"
                    >
                      <svg
                        class="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
                          d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                        /><line x1="10" x2="10" y1="11" y2="17" /><line
                          x1="14"
                          x2="14"
                          y1="11"
                          y2="17"
                        /></svg
                      >
                    </button>
                  </div>
                </div>
                <div class="flex gap-2 items-center justify-between w-full">
                  <p class="text-xl font-semibold">${mount}</p>
                  <p>
                    {date.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div
                  class="h-2 w-full bg-border rounded-full"
                  role="progressbar"
                  aria-valuenow={Number(percentage)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    class={`h-full rounded-full ${getColor(color)}`}
                    style="width:{usedPercent}%;"
                  ></div>
                </div>
                <span class="flex flex-col items-start text-xs text-muted">
                  {usedPercent} % of total
                </span>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </article>
  {/each}

  <!-- <button
    on:click={addExpense}
    class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
  >
    Agregar gasto ejemplo
  </button> -->
</div>
