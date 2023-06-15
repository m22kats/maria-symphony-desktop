import { useNavigate } from 'react-router-dom';
import { MelodyType } from '@shared/enums/app.enums';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  OutlinedInput,
  InputLabel,
} from '@mui/material';

import styled from 'styled-components';

const Container = styled(Box)`
  flex-grow: 1;
`;
const GridContainer = styled(Grid)`
  display: flex;
  margin-top: 18px;
  margin-left: 2px;
  justify-content: center;
  width: 100%;
`;
const MelodyTypeFormControl = styled(FormControl)`
  margin: 1px;
  width: 98.5%;
`;
const RhythmCodeTextField = styled(TextField)`
  margin: 1px;
  width: 98.5%;
`;
const SearchButtonGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const SearchButton = styled(Button)`
  margin-right: 2px;
  margin-top: 20px;
  margin-bottom: 18px;
  height: 54px;
  width: 98.7%;
`;

interface EntityFilterProps {
  keys: MelodyType[];
  keyName: MelodyType[];
  rhythmNote: string;
  onKeySelection: (event: SelectChangeEvent<MelodyType[]>) => void;
  onKeyValueChange: (value: any) => void;
  onClickSearch: () => void;
}

export const EntityFilter = ({
  keys,
  keyName,
  rhythmNote,
  onKeySelection,
  onKeyValueChange,
  onClickSearch,
}: EntityFilterProps) => {
  const navigate = useNavigate();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Container>
      <GridContainer container spacing={1}>
        <Grid item xs={12} md={6}>
          <div>
            <MelodyTypeFormControl>
              <InputLabel id="demo-multiple-checkbox-label">
                Melody Type
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={keyName}
                onChange={onKeySelection}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) =>
                  selected.map((x: string) => x).join(', ')
                }
                MenuProps={MenuProps}
              >
                {keys.map((key: string) => (
                  <MenuItem key={key} value={key}>
                    <Checkbox
                      checked={
                        keyName.findIndex((item: string) => item === key) >= 0
                      }
                    />
                    <ListItemText primary={key} />
                  </MenuItem>
                ))}
              </Select>
            </MelodyTypeFormControl>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <RhythmCodeTextField
              id="outlined-basic"
              label="Rhythm Code"
              variant="outlined"
              value={rhythmNote}
              onChange={onKeyValueChange}
            />
          </div>
        </Grid>
        <SearchButtonGrid>
          <SearchButton variant="contained" onClick={onClickSearch}>
            Search
          </SearchButton>
        </SearchButtonGrid>
      </GridContainer>
    </Container>
  );
};
