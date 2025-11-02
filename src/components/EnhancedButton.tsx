import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { ReactNode, forwardRef } from "react";

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glass" | "gradient" | "floating";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  ripple?: boolean;
  glow?: boolean;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(({
  children,
  variant = "default",
  size = "default",
  className,
  icon,
  iconPosition = "left",
  loading = false,
  ripple = true,
  glow = false,
  disabled,
  type = "button",
  ...props
}, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "glass text-white border-0 hover:bg-white/20";
      case "gradient":
        return "gradient-primary text-white border-0 hover:opacity-90";
      case "floating":
        return "btn-floating bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg";
      default:
        return "";
    }
  };

  const buttonClasses = cn(
    // Base classes
    "relative overflow-hidden transition-all duration-300",
    
    // Variant-specific classes
    getVariantClasses(),
    
    // Ripple effect
    ripple && "ripple",
    
    // Glow effect
    glow && "shadow-lg hover:shadow-xl hover:shadow-primary/25",
    
    // Loading state
    loading && "pointer-events-none opacity-70",
    
    // Focus enhancement
    "focus-enhanced",
    
    className
  );

  const iconElement = icon && (
    <span className={cn(
      "transition-transform duration-200",
      loading && "animate-spin",
      size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"
    )}>
      {icon}
    </span>
  );

  return (
    <Button
      ref={ref}
      variant={variant === "glass" || variant === "gradient" || variant === "floating" ? "default" : variant}
      size={size}
      className={buttonClasses}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {iconPosition === "left" && iconElement}
      
      <span className={cn(
        "transition-all duration-200",
        icon && (iconPosition === "left" ? "ml-2" : "mr-2")
      )}>
        {loading ? "Loading..." : children}
      </span>
      
      {iconPosition === "right" && iconElement}
      
      {/* Shimmer effect for loading */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      )}
    </Button>
  );
});

EnhancedButton.displayName = "EnhancedButton";