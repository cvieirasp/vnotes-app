import * as React from "react";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex items-center pl-0 pr-4 bg-background rounded-md border border-input mb-3 ring-offset-background focus:outline-none hover:ring-1 hover:ring-ring hover:ring-offset-0">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-md outline-none border-0 py-2 px-4 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {showPassword ? (
          <EyeIcon
            className="text-primary cursor-pointer"
            size={24}
            onClick={handleTogglePasswordVisibility}
          />
        ) : (
          <EyeOffIcon
            className="text-muted-foreground cursor-pointer"
            size={24}
            onClick={handleTogglePasswordVisibility}
          />
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "Input";

export { PasswordInput };
