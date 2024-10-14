import {Text, ITextProps } from "native-base";
import { ReactNode } from "react";

interface TextProps extends ITextProps {
    children: ReactNode
}

export function Texto({children, ...rest}: TextProps ){
    return(
        <Text 
            fontSize={16}
            fontWeight="bold" 
            color="blue.500" 
            textAlign="center" 
            mt={5}
            {...rest}
        >
            {children}
        </Text>
    )
}