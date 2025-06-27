<script lang="ts">
  import { onMount } from 'svelte'
  import { format } from 'date-fns'
  import type { SavingGoal } from '@/types/savings'
  export let goal: SavingGoal

  let editing = false
  let editedGoal = { ...goal }

  let percent = 0
  let remaining = 0
  let monthsLeft = 0
  let daysLeft = 0
  let deadlinePassed = false
  let newAmount = ''
  let isCompleted = false

  const updateStats = () => {
    percent = (goal.saved / goal.total) * 100
    remaining = goal.total - goal.saved
    monthsLeft = Math.ceil(remaining / goal.monthly)
    isCompleted = goal.saved >= goal.total

    const today = new Date()
    const deadline = new Date(goal.deadline)
    const msLeft = deadline.getTime() - today.getTime()
    daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24))
    deadlinePassed = msLeft < 0
  }

  const addSavings = () => {
    if (goal.saved + goal.monthly > goal.total) {
      goal.monthly = goal.total - goal.saved
    }
    if (!isNaN(goal.monthly) && goal.monthly >= 0) {
      goal.saved += goal.monthly
      updateStats()
    }
  }

  onMount(updateStats)
</script>

<article class="flex flex-col gap-0.5 px-2">
  {#if isCompleted}
    <div class="absolute inset-0 z-20 flex backdrop-blur items-center justify-center rounded">
      <div class="relative text-center animate-bounce px-6 py-4">
        <h3 class="text-3xl font-extrabold text-success drop-shadow-md">
          ¡Goal ({goal.title}) Completed! 🎉
        </h3>
        <p class="text-white/90 mt-2 text-base">You have reached your savings goal</p>
      </div>
    </div>
  {/if}
  <div class="flex justify-between font-bold text-sm text-accent">
    <span>Progress</span>
    <span>{percent.toFixed(1)}%</span>
  </div>
  <div class="w-full h-3 bg-border overflow-x-hidden rounded">
    <div
      class="transition-all duration-500 h-full bg-{goal.color}-500 rounded"
      style="width: {percent}%;"
    ></div>
  </div>
  <div class="flex justify-between text-xs mt-1 text-gray-300">
    <p>{goal.saved.toLocaleString()}</p>
    <p>{goal.total.toLocaleString()}</p>
  </div>
  <div class="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
    <div>
      <p class="text-accent text-sm font-semibold">You are missing</p>
      <p class="text-error font-bold">${remaining.toLocaleString()}</p>
    </div>
    <div>
      <p class="text-accent text-sm font-semibold">Monthly savings</p>
      <p class="text-success font-bold">${goal.monthly.toLocaleString()}</p>
    </div>
    <div>
      <p class="text-accent text-sm font-semibold">Remaining months</p>
      <p class="text-light font-bold">{monthsLeft} months</p>
    </div>
    <div>
      <p class="text-accent text-sm font-semibold">Days until the deadline</p>
      {#if deadlinePassed}
        <p class="text-error font-bold">Expired</p>
      {:else}
        <p class="text-success font-bold">{daysLeft} days</p>
      {/if}
    </div>
  </div>
  <div class="flex justify-between border-t border-border text-sm py-1.5 mt-2">
    <p class="font-bold text-accent">Deadline:</p>
    <p class=" font-semibold text-light">{format(new Date(goal.deadline), 'MM/dd/yyyy')}</p>
  </div>
  <div class="flex gap-2">
    <button
      on:click={addSavings}
      class="flex-1 p-2 bg-accent hover:bg-accent/80 rounded text-surface font-bold cursor-pointer"
    >
      Add Savings Up</button
    >
    <button class="px-3 bg-tertiary hover:bg-secondary rounded cursor-pointer font-semibold">
      Edit
    </button>
  </div>
</article>
