import { Input, FormControl } from 'native-base';


interface InputProps{
    label?: string;
    placeholder: string;
    secureTextEntry?: boolean;
    value?: string,
    name?: string,
    onChangeText?: (text: string) => void;
}






export function EntradaTextoValidacao ({
    label,
    placeholder,
    secureTextEntry = false,
    value,
    name,
    onChangeText
} : InputProps) : JSX.Element {
    let errors = {};
    const validate = () => {
        if (value === undefined) {
            errors = { ...errors,
            name: 'Name is required'
          };
          return false;
        } else if (value.length < 3) {
            errors ={ ...errors,
            name: 'Name is too short'
          };
          return false;
        }else if(!(name in errors)){
            errors = { };
            return true;
        }
    
        return true;
      };
    


    return (
        <FormControl mt={3} isRequired isInvalid={name in errors}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Input
                placeholder={placeholder} 
                size="lg" 
                w="100%" 
                borderRadius='lg' 
                bgColor='gray.100' 
                secureTextEntry={secureTextEntry}
                shadow={3}
                value={value}
                onChangeText={onChangeText}
            />
            {validate() ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
              Name should contain atleast 3 character.
            </FormControl.HelperText>}
        </FormControl>
    )
}



