import { Play, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface VideoCardProps {
  id: string;
  title: string;
  category: string;
  videoUrl?: string;
  thumbnail?: string;
  watched?: boolean;
  progress?: number;
  onClick?: (id: string) => void;
}

export default function VideoCard({
  id,
  title,
  category,
  videoUrl,
  thumbnail,
  watched = false,
  progress = 0,
  onClick,
}: VideoCardProps) {
  const handleClick = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    }
    onClick?.(id);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="w-full text-left rounded-lg sm:rounded-xl bg-card border border-card-border overflow-hidden hover-elevate active-elevate-2"
      data-testid={`video-card-${id}`}
    >
      <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-accent/20">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-4 h-4 sm:w-6 sm:h-6 text-primary ml-0.5" />
            </div>
          </div>
        )}
        
        {watched && (
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>
        )}
        
        {progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-2 sm:p-3">
        <Badge variant="secondary" className="text-[11px] sm:text-xs mb-1.5 sm:mb-2">
          {category}
        </Badge>
        <h4 className="font-medium text-foreground text-xs sm:text-sm line-clamp-2">
          {title}
        </h4>
      </div>
    </motion.button>
  );
}
