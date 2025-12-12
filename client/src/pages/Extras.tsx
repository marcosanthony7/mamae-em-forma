import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Search, Loader2, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useProgress, useVideos, useFaqs, useToggleVideoWatched } from "@/hooks/useProgress";

const categories = ["Todos", "Hipopressivos", "Postura", "Relaxamento", "Core", "Autocuidado"];

interface ExtrasProps {
  onBack?: () => void;
}

export default function Extras({ onBack }: ExtrasProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState<"videos" | "faq">("videos");

  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: videos, isLoading: videosLoading } = useVideos();
  const { data: faqs, isLoading: faqsLoading } = useFaqs();
  const toggleVideoWatched = useToggleVideoWatched();

  if (progressLoading || videosLoading || faqsLoading || !progress || !videos || !faqs) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const watchedVideos = new Set(progress.watchedVideos);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVideoCheck = (id: string) => {
    toggleVideoWatched.mutate(id);
  };

  const handleVideoPlay = (videoUrl?: string) => {
    if (videoUrl) {
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {onBack && (
            <Button size="icon" variant="ghost" onClick={onBack} data-testid="btn-back" className="flex-shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">Conteúdos Extras</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Vídeos e perguntas frequentes</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeTab === "videos" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("videos")}
            data-testid="tab-videos"
            className="text-xs sm:text-sm"
          >
            Vídeos
          </Button>
          <Button
            variant={activeTab === "faq" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("faq")}
            data-testid="tab-faq"
            className="text-xs sm:text-sm whitespace-nowrap"
          >
            Perguntas Frequentes
          </Button>
        </div>

        {activeTab === "videos" && (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar vídeos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
                data-testid="input-search"
              />
            </div>

            <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              <div className="flex gap-1.5 sm:gap-2 pb-3 flex-nowrap min-w-max">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className={`cursor-pointer whitespace-nowrap text-xs flex-shrink-0 ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`filter-${category.toLowerCase()}`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </header>

      <ScrollArea className="flex-1">
        <div className="px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24">
          {activeTab === "videos" ? (
            <div className="space-y-3 sm:space-y-4">
              {filteredVideos.map((video, index) => {
                const isWatched = watchedVideos.has(video.id);
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-lg sm:rounded-xl border p-3 sm:p-4 ${
                      isWatched
                        ? "bg-muted/50 border-muted"
                        : "bg-card border-card-border"
                    }`}
                    data-testid={`video-item-${video.id}`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <button
                        onClick={() => handleVideoCheck(video.id)}
                        className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isWatched
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/30 hover:border-primary"
                        }`}
                        data-testid={`checkbox-video-${video.id}`}
                      >
                        {isWatched && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <h4
                            className={`font-medium text-sm sm:text-base ${
                              isWatched ? "text-muted-foreground line-through" : "text-foreground"
                            }`}
                          >
                            {video.title}
                          </h4>
                          <Badge variant="secondary" className="text-[11px] sm:text-xs">
                            {video.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center flex-shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleVideoPlay(video.videoUrl)}
                          data-testid={`play-video-${video.id}`}
                          className="w-8 h-8 sm:w-9 sm:h-9"
                        >
                          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border rounded-xl px-4 bg-card"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
