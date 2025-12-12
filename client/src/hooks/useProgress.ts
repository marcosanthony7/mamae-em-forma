import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { UserProgress, Exercise, Meal, ShoppingCategory, UpdateProgress } from "@shared/schema";

export function useProgress() {
  return useQuery<UserProgress>({
    queryKey: ["/api/progress"],
    staleTime: 1000 * 60,
  });
}

export function useExercises() {
  return useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
    staleTime: 1000 * 60 * 60,
  });
}

export function useMeals() {
  return useQuery<Record<string, Meal[]>>({
    queryKey: ["/api/meals"],
    staleTime: 1000 * 60 * 60,
  });
}

export function useShoppingCategories() {
  return useQuery<ShoppingCategory[]>({
    queryKey: ["/api/shopping"],
    staleTime: 1000 * 60 * 60,
  });
}

export function useVideos() {
  return useQuery<Array<{ id: string; title: string; category: string; videoUrl?: string }>>({
    queryKey: ["/api/videos"],
    staleTime: 1000 * 60 * 60,
  });
}

export function useFaqs() {
  return useQuery<Array<{ question: string; answer: string }>>({
    queryKey: ["/api/faqs"],
    staleTime: 1000 * 60 * 60,
  });
}

export function useToggleExercise() {
  return useMutation({
    mutationFn: async (exerciseId: string) => {
      const res = await apiRequest("POST", `/api/progress/exercise/${exerciseId}/toggle`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useToggleFavoriteRecipe() {
  return useMutation({
    mutationFn: async (recipeId: string) => {
      const res = await apiRequest("POST", `/api/progress/recipe/${recipeId}/toggle`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useToggleShoppingItem() {
  return useMutation({
    mutationFn: async (itemId: string) => {
      const res = await apiRequest("POST", `/api/progress/shopping/${itemId}/toggle`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useToggleVideoWatched() {
  return useMutation({
    mutationFn: async (videoId: string) => {
      const res = await apiRequest("POST", `/api/progress/video/${videoId}/toggle`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useSetDiastasisResult() {
  return useMutation({
    mutationFn: async (result: number | null) => {
      const res = await apiRequest("POST", "/api/progress/diastasis", { result });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useSetBirthType() {
  return useMutation({
    mutationFn: async (type: "normal" | "cesarea" | null) => {
      const res = await apiRequest("POST", "/api/progress/birth-type", { type });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useAdvanceDay() {
  return useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/progress/advance-day");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useUpdateProgress() {
  return useMutation({
    mutationFn: async (updates: UpdateProgress) => {
      const res = await apiRequest("PATCH", "/api/progress", updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}

export function useResetCycle() {
  return useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/progress/reset-cycle");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}
