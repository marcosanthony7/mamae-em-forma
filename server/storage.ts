import { 
  type User, 
  type UpsertUser,
  type UserProgress, 
  type UpdateProgress,
  type Achievement,
  defaultProgress,
  defaultAchievements,
  exercises,
  meals,
  shoppingCategories,
  extraVideos,
  faqs,
  motivationalQuotes,
  users,
  userProgress,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getProgress(userId: string): Promise<UserProgress>;
  updateProgress(userId: string, updates: UpdateProgress): Promise<UserProgress>;
  toggleExerciseComplete(userId: string, exerciseId: string): Promise<UserProgress>;
  toggleFavoriteRecipe(userId: string, recipeId: string): Promise<UserProgress>;
  toggleShoppingItem(userId: string, itemId: string): Promise<UserProgress>;
  toggleVideoWatched(userId: string, videoId: string): Promise<UserProgress>;
  setDiastasisResult(userId: string, result: number | null): Promise<UserProgress>;
  setBirthType(userId: string, type: "normal" | "cesarea" | null): Promise<UserProgress>;
  advanceDay(userId: string): Promise<UserProgress>;
  resetCycle(userId: string): Promise<UserProgress>;
  
  getExercises(): typeof exercises;
  getMeals(): typeof meals;
  getShoppingCategories(): typeof shoppingCategories;
  getVideos(): typeof extraVideos;
  getFaqs(): typeof faqs;
  getMotivationalQuotes(): typeof motivationalQuotes;
  getTodayQuote(day: number): { quote: string; author: string };
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  private async getOrCreateProgress(userId: string): Promise<UserProgress> {
    const [existingProgress] = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));

    if (existingProgress) {
      return this.mapRecordToProgress(existingProgress);
    }

    const today = new Date().toISOString().split("T")[0];
    const newProgress = {
      userId,
      currentDay: 1,
      streak: 1,
      completedExercises: [],
      favoriteRecipes: [],
      checkedShoppingItems: [],
      diastasisResult: null,
      watchedVideos: [],
      achievements: defaultAchievements,
      birthType: null,
      lastActiveDate: today,
      cyclesCompleted: 0,
    };

    const [created] = await db
      .insert(userProgress)
      .values(newProgress)
      .returning();

    return this.mapRecordToProgress(created);
  }

  private mapRecordToProgress(record: any): UserProgress {
    return {
      currentDay: record.currentDay,
      streak: record.streak,
      completedExercises: record.completedExercises || [],
      favoriteRecipes: record.favoriteRecipes || [],
      checkedShoppingItems: record.checkedShoppingItems || [],
      diastasisResult: record.diastasisResult,
      watchedVideos: record.watchedVideos || [],
      achievements: (record.achievements as Achievement[]) || defaultAchievements,
      birthType: record.birthType as "normal" | "cesarea" | null,
      lastActiveDate: record.lastActiveDate,
      cyclesCompleted: record.cyclesCompleted || 0,
    };
  }

  private checkAndUpdateStreak(progress: UserProgress): UserProgress {
    const today = new Date().toISOString().split("T")[0];
    const lastActive = progress.lastActiveDate;
    
    if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        if (progress.currentDay >= 30) {
          progress = this.autoResetCycle(progress);
        } else {
          progress.streak += 1;
          progress.currentDay = Math.min(progress.currentDay + 1, 30);
        }
        progress.completedExercises = [];
        progress.watchedVideos = [];
      } else if (diffDays > 1) {
        if (progress.currentDay >= 30) {
          progress = this.autoResetCycle(progress);
        } else {
          progress.streak = 1;
        }
        progress.completedExercises = [];
        progress.watchedVideos = [];
      }
      
      progress.lastActiveDate = today;
      progress = this.checkAchievements(progress);
    }
    
    return progress;
  }

  private autoResetCycle(progress: UserProgress): UserProgress {
    progress.cyclesCompleted += 1;
    progress.currentDay = 1;
    progress.streak = 1;
    progress.checkedShoppingItems = [];
    progress.achievements = defaultAchievements.map(a => ({
      ...a,
      unlocked: a.id === "first-day",
      unlockedAt: a.id === "first-day" ? new Date().toISOString() : undefined,
    }));
    return progress;
  }

  private checkAchievements(progress: UserProgress): UserProgress {
    const { streak, currentDay } = progress;
    
    progress.achievements = progress.achievements.map(achievement => {
      if (achievement.unlocked) return achievement;
      
      let shouldUnlock = false;
      
      switch (achievement.id) {
        case "first-day":
          shouldUnlock = currentDay >= 1;
          break;
        case "7-days":
          shouldUnlock = streak >= 7 || currentDay >= 7;
          break;
        case "15-days":
          shouldUnlock = streak >= 15 || currentDay >= 15;
          break;
        case "30-days":
          shouldUnlock = currentDay >= 30;
          break;
        case "master":
          shouldUnlock = currentDay >= 30 && streak >= 30;
          break;
      }
      
      if (shouldUnlock) {
        return { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      
      return achievement;
    });
    
    return progress;
  }

  private async saveProgress(userId: string, progress: UserProgress): Promise<void> {
    await db
      .update(userProgress)
      .set({
        currentDay: progress.currentDay,
        streak: progress.streak,
        completedExercises: progress.completedExercises,
        favoriteRecipes: progress.favoriteRecipes,
        checkedShoppingItems: progress.checkedShoppingItems,
        diastasisResult: progress.diastasisResult,
        watchedVideos: progress.watchedVideos,
        achievements: progress.achievements,
        birthType: progress.birthType,
        lastActiveDate: progress.lastActiveDate,
        cyclesCompleted: progress.cyclesCompleted,
        updatedAt: new Date(),
      })
      .where(eq(userProgress.userId, userId));
  }

  async getProgress(userId: string): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    progress = this.checkAndUpdateStreak(progress);
    await this.saveProgress(userId, progress);
    return progress;
  }

  async updateProgress(userId: string, updates: UpdateProgress): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    progress = { ...progress, ...updates };
    progress = this.checkAchievements(progress);
    await this.saveProgress(userId, progress);
    return progress;
  }

  async toggleExerciseComplete(userId: string, exerciseId: string): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    const index = progress.completedExercises.indexOf(exerciseId);
    if (index === -1) {
      progress.completedExercises.push(exerciseId);
    } else {
      progress.completedExercises.splice(index, 1);
    }
    await this.saveProgress(userId, progress);
    return progress;
  }

  async toggleFavoriteRecipe(userId: string, recipeId: string): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    const index = progress.favoriteRecipes.indexOf(recipeId);
    if (index === -1) {
      progress.favoriteRecipes.push(recipeId);
    } else {
      progress.favoriteRecipes.splice(index, 1);
    }
    await this.saveProgress(userId, progress);
    return progress;
  }

  async toggleShoppingItem(userId: string, itemId: string): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    const index = progress.checkedShoppingItems.indexOf(itemId);
    if (index === -1) {
      progress.checkedShoppingItems.push(itemId);
    } else {
      progress.checkedShoppingItems.splice(index, 1);
    }
    await this.saveProgress(userId, progress);
    return progress;
  }

  async toggleVideoWatched(userId: string, videoId: string): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    const index = progress.watchedVideos.indexOf(videoId);
    if (index === -1) {
      progress.watchedVideos.push(videoId);
    } else {
      progress.watchedVideos.splice(index, 1);
    }
    await this.saveProgress(userId, progress);
    return progress;
  }

  async setDiastasisResult(userId: string, result: number | null): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    progress.diastasisResult = result;
    await this.saveProgress(userId, progress);
    return progress;
  }

  async setBirthType(userId: string, type: "normal" | "cesarea" | null): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    progress.birthType = type;
    await this.saveProgress(userId, progress);
    return progress;
  }

  async advanceDay(userId: string): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    if (progress.currentDay < 30) {
      progress.currentDay += 1;
      progress.completedExercises = [];
      progress = this.checkAchievements(progress);
    }
    await this.saveProgress(userId, progress);
    return progress;
  }

  async resetCycle(userId: string): Promise<UserProgress> {
    let progress = await this.getOrCreateProgress(userId);
    
    if (progress.currentDay >= 30) {
      progress.cyclesCompleted += 1;
      progress.currentDay = 1;
      progress.streak = 1;
      progress.completedExercises = [];
      progress.checkedShoppingItems = [];
      progress.watchedVideos = [];
      progress.lastActiveDate = new Date().toISOString().split("T")[0];
      
      progress.achievements = defaultAchievements.map(a => ({
        ...a,
        unlocked: a.id === "first-day",
        unlockedAt: a.id === "first-day" ? new Date().toISOString() : undefined,
      }));
    }
    
    await this.saveProgress(userId, progress);
    return progress;
  }

  getExercises() {
    return exercises;
  }

  getMeals() {
    return meals;
  }

  getShoppingCategories() {
    return shoppingCategories;
  }

  getVideos() {
    return extraVideos;
  }

  getFaqs() {
    return faqs;
  }

  getMotivationalQuotes() {
    return motivationalQuotes;
  }

  getTodayQuote(day: number) {
    const quotes = this.getMotivationalQuotes();
    return quotes[day % quotes.length];
  }
}

export const storage = new DatabaseStorage();
