import { FunctionComponent } from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}
 
const Button: FunctionComponent<ButtonProps> = (props:ButtonProps) => {
    return (
        <button className="flex justify-center p-2 px-4 bg-violet-600 rounded-md text-white shadow-lg" {...props}>
            {props.children}
        </button>
    );
}
 
export default Button;