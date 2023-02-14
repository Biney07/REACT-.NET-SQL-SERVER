import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import style from "./BanoriComponets/BanoriCard.module.css"

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}



export default function RadioButtonGroup({options, onChange, selectedValue}: Props) {
   
    return (
        <FormControl component="fieldset" >
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({ value, label }) => (
                    <FormControlLabel className={style.radio_button} value={value} control={<Radio />} label={label} key={value} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}