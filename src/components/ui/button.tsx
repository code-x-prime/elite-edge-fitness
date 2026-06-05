import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#0A0A0A] text-white hover:bg-[#FF6B00] hover:text-[#0A0A0A]",
        gold: "bg-[#FF6B00] text-[#0A0A0A] hover:bg-[#E55A00]",
        outline: "border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white",
        ghost: "hover:bg-[#F4F4F4] text-[#0A0A0A]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        link: "text-[#FF6B00] underline-offset-4 hover:underline p-0 h-auto font-bold",
      },
      size: {
        default: "h-11 px-8 py-3",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    if (href) {
      return <Link href={href} className={classes}>{props.children}</Link>;
    }
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={classes} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

