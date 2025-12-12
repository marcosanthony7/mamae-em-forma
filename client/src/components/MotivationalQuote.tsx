import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MotivationalQuoteProps {
  quote: string;
  author?: string;
}

export default function MotivationalQuote({ quote, author }: MotivationalQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/50 to-primary/10 border border-accent-border"
    >
      <Sparkles className="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 text-primary/40" />
      <p className="font-serif text-sm sm:text-lg italic text-foreground leading-relaxed pr-6">
        "{quote}"
      </p>
      {author && (
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">— {author}</p>
      )}
    </motion.div>
  );
}
