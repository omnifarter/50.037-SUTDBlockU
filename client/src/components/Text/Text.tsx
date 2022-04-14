import { FunctionComponent } from "react";

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
    variant: "h1"| "p"
    black?:boolean
}
 
const Text: FunctionComponent<TextProps> = (props: TextProps) => {
    const {variant, black,...others} = props
    switch (variant) {
        case "h1":
            return (<h1 {...others} className={props.className + " text-2xl"  + (black ? " text-black" : " text-white")} >{props.children}</h1>)
    
        case "p":
            return (<p {...others} className={props.className + (black ? " text-black" : " text-white")}>{props.children}</p>)
    }
    ;
}
 
export default Text;