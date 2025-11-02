import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "./ui/utils";
import { ReactNode, forwardRef } from "react";

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "glass" | "gradient" | "elevated" | "music";
  hover?: "lift" | "glow" | "scale" | "none";
  header?: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  decorative?: boolean;
}

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(({
  children,
  className,
  variant = "default",
  hover = "lift",
  onClick,
  header,
  title,
  description,
  footer,
  decorative = false,
  ...props
}, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "glass-card border-opacity-30";
      case "gradient":
        return "gradient-surface border-0";
      case "elevated":
        return "elevation-3 bg-surface-container";
      case "music":
        return "music-card gradient-overlay";
      default:
        return "";
    }
  };

  const getHoverClasses = () => {
    switch (hover) {
      case "lift":
        return "card-lift";
      case "glow":
        return "hover:shadow-2xl hover:shadow-primary/20";
      case "scale":
        return "hover:scale-105";
      case "none":
        return "";
      default:
        return "card-lift";
    }
  };

  const cardClasses = cn(
    // Base transition
    "transition-all duration-300",
    
    // Variant classes
    getVariantClasses(),
    
    // Hover effects
    getHoverClasses(),
    
    // Decorative pattern
    decorative && "music-pattern",
    
    // Clickable
    onClick && "cursor-pointer focus-enhanced",
    
    className
  );

  return (
    <Card 
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {header && (
        <CardHeader className="space-y-3">
          {header}
        </CardHeader>
      )}
      
      {(title || description) && (
        <CardHeader className="space-y-2">
          {title && (
            <CardTitle className="text-title-large leading-tight text-balanced">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-body-medium leading-relaxed">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className="pt-4 border-t border-border/50">
          {footer}
        </CardFooter>
      )}
      
      {/* Decorative music bars */}
      {variant === "music" && (
        <div className="absolute top-4 right-4 music-bars opacity-30">
          <div className="music-bar"></div>
          <div className="music-bar"></div>
          <div className="music-bar"></div>
          <div className="music-bar"></div>
          <div className="music-bar"></div>
        </div>
      )}
    </Card>
  );
});

EnhancedCard.displayName = "EnhancedCard";

// Pre-configured card variants for common use cases
export function GlassCard({ children, className, ...props }: Omit<EnhancedCardProps, 'variant'>) {
  return (
    <EnhancedCard variant="glass" className={className} {...props}>
      {children}
    </EnhancedCard>
  );
}

export function MusicCard({ children, className, ...props }: Omit<EnhancedCardProps, 'variant'>) {
  return (
    <EnhancedCard variant="music" decorative className={className} {...props}>
      {children}
    </EnhancedCard>
  );
}

export function ElevatedCard({ children, className, ...props }: Omit<EnhancedCardProps, 'variant'>) {
  return (
    <EnhancedCard variant="elevated" className={className} {...props}>
      {children}
    </EnhancedCard>
  );
}