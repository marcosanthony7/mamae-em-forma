import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updateProgressSchema } from "@shared/schema";
import { isAuthenticated } from "./firebaseAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progress = await storage.getProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get progress" });
    }
  });

  app.patch("/api/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const parsed = updateProgressSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request body" });
      }
      const progress = await storage.updateProgress(userId, parsed.data);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  app.post("/api/progress/exercise/:id/toggle", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progress = await storage.toggleExerciseComplete(userId, req.params.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle exercise" });
    }
  });

  app.post("/api/progress/recipe/:id/toggle", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progress = await storage.toggleFavoriteRecipe(userId, req.params.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle recipe favorite" });
    }
  });

  app.post("/api/progress/shopping/:id/toggle", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progress = await storage.toggleShoppingItem(userId, req.params.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle shopping item" });
    }
  });

  app.post("/api/progress/video/:id/toggle", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progress = await storage.toggleVideoWatched(userId, req.params.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle video watched" });
    }
  });

  app.post("/api/progress/diastasis", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const { result } = req.body;
      const progress = await storage.setDiastasisResult(userId, result);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to set diastasis result" });
    }
  });

  app.post("/api/progress/birth-type", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const { type } = req.body;
      const progress = await storage.setBirthType(userId, type);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to set birth type" });
    }
  });

  app.post("/api/progress/advance-day", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progress = await storage.advanceDay(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to advance day" });
    }
  });

  app.post("/api/progress/reset-cycle", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.uid;
      const progress = await storage.resetCycle(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to reset cycle" });
    }
  });

  app.get("/api/exercises", async (_req, res) => {
    try {
      const exercises = storage.getExercises();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ error: "Failed to get exercises" });
    }
  });

  app.get("/api/meals", async (_req, res) => {
    try {
      const meals = storage.getMeals();
      res.json(meals);
    } catch (error) {
      res.status(500).json({ error: "Failed to get meals" });
    }
  });

  app.get("/api/shopping", async (_req, res) => {
    try {
      const categories = storage.getShoppingCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to get shopping list" });
    }
  });

  app.get("/api/videos", async (_req, res) => {
    try {
      const videos = storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to get videos" });
    }
  });

  app.get("/api/faqs", async (_req, res) => {
    try {
      const faqs = storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to get FAQs" });
    }
  });

  app.get("/api/quote/:day", async (req, res) => {
    try {
      const day = parseInt(req.params.day, 10);
      const quote = storage.getTodayQuote(day);
      res.json(quote);
    } catch (error) {
      res.status(500).json({ error: "Failed to get quote" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
