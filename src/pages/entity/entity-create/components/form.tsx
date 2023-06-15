import EntityReview from '../components/entity-review';
import { MelodyType } from '@shared/enums/app.enums';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

interface FormComponentProps {
  activeStep: number;
  formData: {
    organization: string;
    title: string;
    type: string;
    rhythmNote: string;
    audioPath: string;
    chordType: string;
    soundType: string;
    experimentName: string;
    description: string;
  };
  handleFormChange: (event: any) => void;
  organization: string;
  valueGuide: string;
}

const generateTextField = (
  name: string,
  label: string,
  value: string,
  onChange: any
) => (
  <TextField
    sx={{ m: 1, width: '99%' }}
    id={name}
    name={name}
    label={label}
    variant="outlined"
    value={value}
    onChange={onChange}
    required
  />
);

export const FormComponent = ({
  activeStep,
  formData,
  handleFormChange,
  organization,
  valueGuide,
}: FormComponentProps) => {
  return (
    <form>
      {activeStep === 0 && (
        <div>
          <FormControl sx={{ m: 1, width: '99%' }} required>
            <InputLabel id="demo-simple-select-label">
              Associated Organization
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="organization"
              label="Organization"
              value={formData.organization}
              onChange={handleFormChange}
              input={<OutlinedInput label="Tag" />}
            >
              {[organization].map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {generateTextField(
            'title',
            'Melody Title',
            formData.title,
            handleFormChange
          )}

          <FormControl sx={{ m: 1, width: '99%' }} required>
            <InputLabel id="demo-simple-select-label">Melody Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              input={<OutlinedInput label="Tag" />}
            >
              {[MelodyType.TUNE, MelodyType.NOTE].map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {generateTextField(
            'rhythmNote',
            'Rhythm Code',
            formData.rhythmNote,
            handleFormChange
          )}
          <Typography
            variant="subtitle1"
            style={{ marginLeft: '16px', color: '#0074B7' }}
          >
            {valueGuide}
          </Typography>
        </div>
      )}
      {activeStep === 1 && (
        <div>
          {generateTextField(
            'audioPath',
            'Audio Path',
            formData.audioPath,
            handleFormChange
          )}
          {generateTextField(
            'chordType',
            'Chord Type',
            formData.chordType,
            handleFormChange
          )}
          {generateTextField(
            'soundType',
            'Sound Type',
            formData.soundType,
            handleFormChange
          )}
          {generateTextField(
            'experimentName',
            'Experiment Name',
            formData.experimentName,
            handleFormChange
          )}
          {generateTextField(
            'description',
            'Description',
            formData.description,
            handleFormChange
          )}
        </div>
      )}
      {activeStep === 2 && (
        <div>
          <EntityReview
            values={{
              'Associated Organization': formData.organization,
              'Melody Title': formData.title,
              'Type & Rhythm Code': formData.type + ' ' + formData.rhythmNote,
              'Audio Path': formData.audioPath,
              'Chord Type': formData.chordType,
              'Sound Type': formData.soundType,
              'Experiment Name': formData.experimentName,
              Description: formData.description,
            }}
          />
        </div>
      )}
    </form>
  );
};
