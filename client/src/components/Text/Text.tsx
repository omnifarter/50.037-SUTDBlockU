import { FunctionComponent } from "react";

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
    variant: "h1"| "p"
    black?:boolean
}
 
const Text: FunctionComponent<TextProps> = (props: TextProps) => {
    switch (props.variant) {
        case "h1":
            return (<h1 {...props} className={props.className + " text-2xl"  + (props.black ? " text-black" : " text-white")} >{props.children}</h1>)
    
        case "p":
            return (<p {...props} className={props.className + (props.black ? " text-black" : " text-white")}>{props.children}</p>)
    }
    ;
}
 
export default Text;