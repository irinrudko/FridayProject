import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export function BasicSelect() {
    const [cardsPerPage, setCardsPerPage] = React.useState('5');

    const handleChange = (event: SelectChangeEvent) => {
        setCardsPerPage(event.target.value as string);
    };

    return (
            <FormControl sx={{paddingLeft:1,paddingRight:1}}  size="small">
                <Select
                    autoWidth
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={cardsPerPage}
                    onChange={handleChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl>
    );
}
