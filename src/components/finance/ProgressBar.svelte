<script lang="ts">
let totalBudget = 1150;
let totalSpent = 475;

let percentage = (totalSpent / totalBudget) * 100;
</script>

<div class="space-y-2">
  <div class="h-4 rounded-full bg-border overflow-hidden">
    <div class="h-full bg-accent transition-all duration-300" style={`width: ${percentage}%`}></div>
  </div>
  <p class="text-xs text-gray-300">{percentage.toFixed(1)}% used</p>
</div>
