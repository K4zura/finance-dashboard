// incomeData.ts
export interface Category {
  icon: string
  name: string
  color: string
  budget?: number
}

export const incomeCategories: Category[] = [
  {
    icon: '💻',
    name: 'Freelance',
    color: 'green',
  },
  {
    icon: '🏪',
    name: 'Negocio',
    color: 'red',
  },
  {
    icon: '📈',
    name: 'Inversiones',
    color: 'purple',
  },
  {
    icon: '💼',
    name: 'Trabajo',
    color: 'blue',
  },
]

export interface Income {
  title: string
  category: Category
  type: string
  date: Date
  mount: number
}

export const incomeData: Income[] = [
  {
    title: 'Consultoria',
    category: incomeCategories[0],
    type: 'Variable',
    date: new Date('2025-01-14'),
    mount: 300,
  },
  {
    title: 'Venta de camisetas',
    category: incomeCategories[1], // Negocio
    type: 'Variable',
    date: new Date('2025-01-20'),
    mount: 150,
  },
  {
    title: 'Dividendos ETF',
    category: incomeCategories[2], // Inversiones
    type: 'Pasivo',
    date: new Date('2025-02-01'),
    mount: 120,
  },
  {
    title: 'Sueldo mensual',
    category: incomeCategories[3], // Trabajo
    type: 'Fijo',
    date: new Date('2025-02-28'),
    mount: 400,
  },
  {
    title: 'Proyecto diseño web',
    category: incomeCategories[0], // Freelance
    type: 'Variable',
    date: new Date('2024-03-12'),
    mount: 500,
  },
  {
    title: 'Ventas tienda online',
    category: incomeCategories[1], // Negocio
    type: 'Variable',
    date: new Date('2024-03-25'),
    mount: 350,
  },
  {
    title: 'Acciones Apple',
    category: incomeCategories[2], // Inversiones
    type: 'Pasivo',
    date: new Date('2024-04-10'),
    mount: 200,
  },
  {
    title: 'Sueldo mensual',
    category: incomeCategories[3], // Trabajo
    type: 'Fijo',
    date: new Date('2024-04-30'),
    mount: 1250,
  },
]

export interface Expense {
  title: string
  category: Category
  date: Date
  mount: number
}

export const expenseCategories: Category[] = [
  {
    icon: '🍽️',
    name: 'Alimentacion',
    color: 'green',
    budget: 300,
  },
  {
    icon: '🎮',
    name: 'Entretenimiento',
    color: 'red',
    budget: 150,
  },
  {
    icon: '🚗',
    name: 'Transporte',
    color: 'purple',
    budget: 200,
  },
  {
    icon: '👕',
    name: 'Vestimenta',
    color: 'blue',
    budget: 180,
  },
  {
    icon: '⚡',
    name: 'Servicios',
    color: 'yellow',
    budget: 250,
  },
]

export const expenseData: Expense[] = [
  {
    title: 'Almuerzo restaurante',
    category: expenseCategories[0],
    date: new Date('2024-12-05'),
    mount: 45,
  },
  {
    title: 'Comida rápida',
    category: expenseCategories[0],
    date: new Date('2025-01-10'),
    mount: 32,
  },
  {
    title: 'Suscripción Netflix',
    category: expenseCategories[1],
    date: new Date('2025-02-01'),
    mount: 38,
  },
  {
    title: 'Compra videojuego',
    category: expenseCategories[1],
    date: new Date('2025-03-18'),
    mount: 60,
  },
  {
    title: 'Recarga gasolina',
    category: expenseCategories[2],
    date: new Date('2024-11-03'),
    mount: 80,
  },
  {
    title: 'Transporte público',
    category: expenseCategories[2],
    date: new Date('2025-02-08'),
    mount: 25,
  },
  {
    title: 'Uber ida al trabajo',
    category: expenseCategories[2],
    date: new Date('2025-04-16'),
    mount: 40,
  },
  {
    title: 'Compra camiseta',
    category: expenseCategories[3],
    date: new Date('2024-10-12'),
    mount: 50,
  },
  {
    title: 'Zapatos deportivos',
    category: expenseCategories[3],
    date: new Date('2025-01-20'),
    mount: 120,
  },
  {
    title: 'Pago energía',
    category: expenseCategories[4],
    date: new Date('2024-12-07'),
    mount: 70,
  },
  {
    title: 'Pago agua',
    category: expenseCategories[4],
    date: new Date('2025-03-15'),
    mount: 60,
  },
  {
    title: 'Internet hogar',
    category: expenseCategories[4],
    date: new Date('2025-02-02'),
    mount: 55,
  },
  {
    title: 'Café y panadería',
    category: expenseCategories[0],
    date: new Date('2025-01-11'),
    mount: 18,
  },
  {
    title: 'Salida al cine',
    category: expenseCategories[1],
    date: new Date('2025-05-22'),
    mount: 30,
  },
]
