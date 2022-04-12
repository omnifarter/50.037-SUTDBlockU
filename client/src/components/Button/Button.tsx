import { CSSProperties, FunctionComponent } from "react";
import { Button as SecondaryButton } from "@mantine/core";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "Primary" | "Secondary";
  wFull?: boolean; //width full
}

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const { className, style, variant, wFull, ...others } = props;
  if (variant === "Secondary") {
    return (
      <SecondaryButton
        color="violet"
        size="md"
        variant="outline"
        style={wFull ? { width: "100%" } : {}}
        className={className}
      >
        {props.children}
      </SecondaryButton>
    );
  } else {
    return (
      <button
        className={`flex justify-center p-2 px-4 bg-violet-600 rounded-md text-white shadow-lg ${className} ${
          wFull ? "w-full" : ""
        }`}
        style={{ height: "42px", ...style }}
        {...others}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
