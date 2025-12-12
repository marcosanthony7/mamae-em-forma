import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// User progress table - stores progress per user
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  currentDay: integer("current_day").notNull().default(1),
  streak: integer("streak").notNull().default(1),
  completedExercises: text("completed_exercises").array().notNull().default(sql`'{}'::text[]`),
  favoriteRecipes: text("favorite_recipes").array().notNull().default(sql`'{}'::text[]`),
  checkedShoppingItems: text("checked_shopping_items").array().notNull().default(sql`'{}'::text[]`),
  diastasisResult: integer("diastasis_result"),
  watchedVideos: text("watched_videos").array().notNull().default(sql`'{}'::text[]`),
  achievements: jsonb("achievements").notNull().default(sql`'[]'::jsonb`),
  birthType: varchar("birth_type"),
  lastActiveDate: varchar("last_active_date").notNull(),
  cyclesCompleted: integer("cycles_completed").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserProgressRecord = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

export interface Exercise {
  id: string;
  title: string;
  duration: string;
  difficulty: "fácil" | "moderado" | "intenso";
  instructions: string;
  adaptations?: {
    normal?: string;
    cesarea?: string;
  };
  videoUrl?: string;
}

export interface Meal {
  id: string;
  title: string;
  prepTime: string;
  tags: string[];
  imageUrl?: string;
  day: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

export interface ShoppingCategory {
  name: string;
  items: ShoppingItem[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  currentDay: number;
  streak: number;
  completedExercises: string[];
  favoriteRecipes: string[];
  checkedShoppingItems: string[];
  diastasisResult: number | null;
  watchedVideos: string[];
  achievements: Achievement[];
  birthType: "normal" | "cesarea" | null;
  lastActiveDate: string;
  cyclesCompleted: number;
}

export const defaultAchievements: Achievement[] = [
  { id: "first-day", title: "Primeiro Dia", icon: "Star", unlocked: true, unlockedAt: new Date().toISOString() },
  { id: "7-days", title: "7 Dias", icon: "Flame", unlocked: false },
  { id: "15-days", title: "15 Dias", icon: "Target", unlocked: false },
  { id: "30-days", title: "30 Dias", icon: "Trophy", unlocked: false },
  { id: "master", title: "Guerreira", icon: "Crown", unlocked: false },
];

export const defaultProgress: UserProgress = {
  currentDay: 1,
  streak: 1,
  completedExercises: [],
  favoriteRecipes: [],
  checkedShoppingItems: [],
  diastasisResult: null,
  watchedVideos: [],
  achievements: defaultAchievements,
  birthType: null,
  lastActiveDate: new Date().toISOString().split("T")[0],
  cyclesCompleted: 0,
};

export const motivationalQuotes = [
  { quote: "Cada passo que você dá é uma vitória. Você está fazendo um trabalho incrível, mamãe!", author: "Equipe Mamãe em Forma" },
  { quote: "Seu corpo criou vida. Agora é hora de cuidar dele com amor e paciência.", author: "Equipe Mamãe em Forma" },
  { quote: "Não existe corpo perfeito, existe corpo forte e saudável. Você está no caminho certo!", author: "Equipe Mamãe em Forma" },
  { quote: "A jornada de mil passos começa com um único passo. Continue!", author: "Equipe Mamãe em Forma" },
  { quote: "Você é mais forte do que imagina. Cada dia é uma nova conquista.", author: "Equipe Mamãe em Forma" },
  { quote: "Cuide de você para poder cuidar de quem você ama.", author: "Equipe Mamãe em Forma" },
  { quote: "Seu bem-estar importa. Reserve esse momento para você.", author: "Equipe Mamãe em Forma" },
];

export const exercises: Exercise[] = [
  {
    id: "1",
    title: "Respiração Diafragmática",
    duration: "",
    difficulty: "fácil",
    instructions: "Deite-se de costas com os joelhos dobrados. Coloque uma mão no peito e outra no abdômen. Inspire profundamente pelo nariz, expandindo o abdômen. Expire lentamente pela boca.",
    adaptations: {
      normal: "Pode iniciar logo após o parto, respeitando seu conforto.",
      cesarea: "Aguarde liberação médica. Comece com movimentos suaves.",
    },
    videoUrl: "https://www.youtube.com/watch?v=AEbbzW7-Hts",
  },
  {
    id: "2",
    title: "Ativação do Transverso",
    duration: "",
    difficulty: "moderado",
    instructions: "Em posição de quatro apoios, inspire e ao expirar, contraia o abdômen como se estivesse puxando o umbigo para a coluna. Mantenha por 5 segundos.",
    adaptations: {
      normal: "Execute normalmente após 2 semanas pós-parto.",
      cesarea: "Inicie após 6-8 semanas com liberação médica.",
    },
    videoUrl: "https://www.youtube.com/watch?v=Ke9al-Aliyc",
  },
  {
    id: "3",
    title: "Ponte com Ativação",
    duration: "",
    difficulty: "moderado",
    instructions: "Deite-se de costas, joelhos dobrados, pés no chão. Contraia glúteos e abdômen, elevando o quadril. Mantenha 3 segundos e desça lentamente.",
    adaptations: {
      normal: "Pode iniciar após 3-4 semanas.",
      cesarea: "Aguarde cicatrização completa, cerca de 8 semanas.",
    },
    videoUrl: "https://www.youtube.com/watch?v=nH3pZ3qxwJ0",
  },
  {
    id: "4",
    title: "Exercício Hipopressivo Básico",
    duration: "",
    difficulty: "intenso",
    instructions: "Em pé, expire todo o ar e prenda a respiração. Abra as costelas como se fosse inspirar, mas sem deixar o ar entrar. Mantenha 10-15 segundos.",
    adaptations: {
      normal: "Inicie após 6 semanas pós-parto.",
      cesarea: "Aguarde 10-12 semanas para iniciar.",
    },
    videoUrl: "https://www.youtube.com/watch?v=INWl9XRFpnU",
  },
  {
    id: "5",
    title: "Alongamento de Quadril",
    duration: "",
    difficulty: "fácil",
    instructions: "Deite-se de costas e cruze uma perna sobre a outra. Puxe suavemente a perna de baixo em direção ao peito. Segure 30 segundos de cada lado.",
    adaptations: {
      normal: "Pode fazer desde o primeiro dia se confortável.",
      cesarea: "Inicie suavemente após 2 semanas.",
    },
    videoUrl: "https://www.youtube.com/watch?v=urPHpKncUpk",
  },
  {
    id: "6",
    title: "Fortalecimento de Assoalho Pélvico",
    duration: "",
    difficulty: "moderado",
    instructions: "Contraia os músculos do assoalho pélvico como se estivesse segurando a urina. Mantenha 5 segundos e relaxe. Repita 10 vezes.",
    adaptations: {
      normal: "Inicie assim que se sentir confortável.",
      cesarea: "Pode iniciar após liberação médica.",
    },
    videoUrl: "https://www.youtube.com/watch?v=xFYAheSzS3M",
  },
];

export const meals: Record<string, Meal[]> = {
  seg: [
    { id: "1", title: "Smoothie Energético de Banana e Aveia", prepTime: "5 min", tags: ["Rápida", "Energética"], day: "seg" },
    { id: "2", title: "Salada de Frango com Quinoa", prepTime: "20 min", tags: ["Proteína", "Leve"], day: "seg" },
    { id: "3", title: "Sopa de Legumes com Frango", prepTime: "30 min", tags: ["Reconfortante", "Nutritiva"], day: "seg" },
  ],
  ter: [
    { id: "4", title: "Panqueca de Banana com Aveia", prepTime: "15 min", tags: ["Café", "Sem Açúcar"], day: "ter" },
    { id: "5", title: "Wrap de Atum com Vegetais", prepTime: "10 min", tags: ["Rápida", "Proteína"], day: "ter" },
    { id: "6", title: "Frango Grelhado com Batata Doce", prepTime: "25 min", tags: ["Jantar", "Nutritiva"], day: "ter" },
  ],
  qua: [
    { id: "7", title: "Iogurte com Frutas e Granola", prepTime: "5 min", tags: ["Rápida", "Probiótico"], day: "qua" },
    { id: "8", title: "Omelete de Vegetais", prepTime: "10 min", tags: ["Proteína", "Baixa Caloria"], day: "qua" },
    { id: "9", title: "Peixe Assado com Legumes", prepTime: "35 min", tags: ["Ômega 3", "Leve"], day: "qua" },
  ],
  qui: [
    { id: "10", title: "Açaí com Frutas e Granola", prepTime: "5 min", tags: ["Energia", "Antioxidante"], day: "qui" },
    { id: "11", title: "Salada de Grão de Bico", prepTime: "15 min", tags: ["Fibras", "Proteína Vegetal"], day: "qui" },
    { id: "12", title: "Strogonoff de Frango Light", prepTime: "30 min", tags: ["Jantar", "Cremoso"], day: "qui" },
  ],
  sex: [
    { id: "13", title: "Vitamina de Mamão e Laranja", prepTime: "5 min", tags: ["Vitamina C", "Digestiva"], day: "sex" },
    { id: "14", title: "Sanduíche Natural de Frango", prepTime: "10 min", tags: ["Rápida", "Completa"], day: "sex" },
    { id: "15", title: "Risoto de Legumes", prepTime: "40 min", tags: ["Reconfortante", "Fibras"], day: "sex" },
  ],
  sab: [
    { id: "16", title: "Tapioca com Queijo e Tomate", prepTime: "10 min", tags: ["Sem Glúten", "Leve"], day: "sab" },
    { id: "17", title: "Bowl de Quinoa com Vegetais", prepTime: "20 min", tags: ["Completa", "Nutritiva"], day: "sab" },
    { id: "18", title: "Lasanha de Berinjela", prepTime: "45 min", tags: ["Low Carb", "Reconfortante"], day: "sab" },
  ],
  dom: [
    { id: "19", title: "Panqueca Americana Saudável", prepTime: "15 min", tags: ["Especial", "Café"], day: "dom" },
    { id: "20", title: "Ceviche de Peixe", prepTime: "20 min", tags: ["Leve", "Refrescante"], day: "dom" },
    { id: "21", title: "Carne Assada com Purê de Batata", prepTime: "60 min", tags: ["Família", "Especial"], day: "dom" },
  ],
};

export const shoppingCategories: ShoppingCategory[] = [
  {
    name: "Frutas e Verduras",
    items: [
      { id: "s1", name: "Banana", quantity: "6 unidades", checked: false },
      { id: "s2", name: "Espinafre", quantity: "1 maço", checked: false },
      { id: "s3", name: "Abacate", quantity: "2 unidades", checked: false },
      { id: "s4", name: "Tomate", quantity: "500g", checked: false },
      { id: "s5", name: "Berinjela", quantity: "2 unidades", checked: false },
      { id: "s6", name: "Mamão", quantity: "1 unidade", checked: false },
      { id: "s7", name: "Laranja", quantity: "6 unidades", checked: false },
    ],
  },
  {
    name: "Proteínas",
    items: [
      { id: "s8", name: "Peito de Frango", quantity: "1kg", checked: false },
      { id: "s9", name: "Ovos", quantity: "12 unidades", checked: false },
      { id: "s10", name: "Salmão", quantity: "400g", checked: false },
      { id: "s11", name: "Atum em Lata", quantity: "2 latas", checked: false },
      { id: "s12", name: "Carne Magra", quantity: "500g", checked: false },
    ],
  },
  {
    name: "Grãos e Cereais",
    items: [
      { id: "s13", name: "Aveia", quantity: "500g", checked: false },
      { id: "s14", name: "Quinoa", quantity: "300g", checked: false },
      { id: "s15", name: "Arroz Integral", quantity: "1kg", checked: false },
      { id: "s16", name: "Grão de Bico", quantity: "400g", checked: false },
      { id: "s17", name: "Tapioca", quantity: "500g", checked: false },
    ],
  },
  {
    name: "Laticínios",
    items: [
      { id: "s18", name: "Iogurte Natural", quantity: "4 unidades", checked: false },
      { id: "s19", name: "Queijo Branco", quantity: "200g", checked: false },
      { id: "s20", name: "Leite Desnatado", quantity: "1 litro", checked: false },
    ],
  },
];

export const extraVideos = [
  { id: "v1", title: "Introdução ao LPF - Exercícios Hipopressivos", category: "Hipopressivos", videoUrl: "https://www.youtube.com/watch?v=VKAFhOxtvUg" },
  { id: "v2", title: "Postura Correta para Amamentação", category: "Postura", videoUrl: "https://www.youtube.com/watch?v=kBEXkGnoHRg" },
  { id: "v3", title: "Alongamento para Alívio de Dores nas Costas", category: "Relaxamento", videoUrl: "https://www.youtube.com/watch?v=u83PMJNERNw" },
  { id: "v4", title: "Yoga Nidra para Relaxamento Profundo", category: "Relaxamento", videoUrl: "https://www.youtube.com/watch?v=WkwfWeC5zI0" },
  { id: "v5", title: "Respiração para Ansiedade", category: "Relaxamento", videoUrl: "https://www.youtube.com/watch?v=Ghbhtri8em4" },
  { id: "v6", title: "Fortalecimento do Assoalho Pélvico", category: "Core", videoUrl: "https://www.youtube.com/watch?v=ovCJvFCRlhI" },
  { id: "v7", title: "Exercícios para Diástase Leve", category: "Core", videoUrl: "https://www.youtube.com/watch?v=ACQsaQUs8vs" },
  { id: "v8", title: "Autocuidado para Mães", category: "Autocuidado", videoUrl: "https://www.youtube.com/watch?v=FlQ2wPA12Zs" },
];

export const faqs = [
  {
    question: "Quando posso começar os exercícios após o parto?",
    answer: "Para parto normal, você pode começar exercícios leves como respiração e caminhada após 2-4 semanas. Para cesárea, recomenda-se aguardar 6-8 semanas e liberação médica. Sempre respeite os sinais do seu corpo.",
  },
  {
    question: "Os exercícios são seguros durante a amamentação?",
    answer: "Sim! Os exercícios do programa são de baixo impacto e seguros durante a amamentação. A atividade física moderada não afeta a produção ou qualidade do leite materno.",
  },
  {
    question: "Como sei se tenho diástase abdominal?",
    answer: "A diástase pode ser identificada através do teste de autoavaliação disponível na seção 'Diástase' do app. Deite-se de costas, eleve a cabeça e sinta se há um espaço entre os músculos abdominais acima e abaixo do umbigo.",
  },
  {
    question: "Posso fazer os exercícios todos os dias?",
    answer: "Recomendamos seguir a programação diária do app, que já considera períodos de descanso. Ouvir seu corpo é fundamental - se sentir fadiga excessiva, tire um dia de descanso.",
  },
  {
    question: "Os exercícios hipopressivos são difíceis?",
    answer: "Os exercícios hipopressivos podem parecer estranhos no início, mas com prática ficam mais naturais. Nossos vídeos guiam cada movimento passo a passo. Comece devagar e aumente a dificuldade gradualmente.",
  },
];

export const updateProgressSchema = z.object({
  currentDay: z.number().optional(),
  streak: z.number().optional(),
  completedExercises: z.array(z.string()).optional(),
  favoriteRecipes: z.array(z.string()).optional(),
  checkedShoppingItems: z.array(z.string()).optional(),
  diastasisResult: z.number().nullable().optional(),
  watchedVideos: z.array(z.string()).optional(),
  birthType: z.enum(["normal", "cesarea"]).nullable().optional(),
});

export type UpdateProgress = z.infer<typeof updateProgressSchema>;
