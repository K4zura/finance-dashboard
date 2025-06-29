export type SavingGoal = {
	title: string;
	color: string;
	category: string;
	priority: "High" | "Medium" | "Low";
	total: number;
	saved: number;
	monthly: number;
	deadline: "2025-11-30";
};
