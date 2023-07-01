import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSelector } from '@redux/slices/auth/sign-in/sign-in.selector';
import { entityCreateActions } from '@redux/slices/entity/entity-create/entity-create.slice';
import { entityCreateSelector } from '@redux/slices/entity/entity-create/entity-create.selector';
import { FetchStatusEnum } from '@services/fetch.type';
import {
  EntityCreateRequest,
  PathCreateRequest,
  AttributeCreateRequest,
} from '@services/entity/entity.service.type';
import { MelodyType } from '@shared/enums/app.enums';
import { RHYTHM_CODE_REGEX } from '@shared/constants/app.constants';

import { useTheme, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import {
  DesktopStepperComponent,
  DesktopStepperBtnComponent,
  MobileStepperComponent,
} from './components/stepper';
import { FormComponent } from './components/form';

const Container = styled.div`
  margin-top: 3em;
`;
let isEntityCreationComplete = false;

function EntityCreate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const entityCreateFetchStatus = useSelector(
    entityCreateSelector.entityCreateFetchStatus
  );
  const organization: string =
    useSelector(signInSelector.user)?.organization || '';

  const [formData, setFormData] = useState({
    organization: organization || '',
    type: '',
    rhythmNote: '',
    title: '',
    audioPath: '',
    chordType: '',
    soundType: '',
    experimentName: '',
    description: '',
    createdActor: '',
  });
  const [valueGuide, setValueGuide] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Enter the type of the melody entity',
    'Specify the audio path for the desired chord type',
    'Review',
  ];

  useEffect(() => {
    if (
      entityCreateFetchStatus === FetchStatusEnum.SUCCESS &&
      isEntityCreationComplete
    ) {
      alert('Entity created successfully!');
      dispatch(entityCreateActions.resetEntityCreateState());
      navigate('/entity');
    } else if (entityCreateFetchStatus === FetchStatusEnum.FAILURE) {
      alert('Error creating entity!');
    }
  }, [entityCreateFetchStatus, isEntityCreationComplete]);

  const handleFormChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const tuneGuide =
      'The value of melody tune must be either 5 digits or between 7 and 9 digits.';
    const noteGuide =
      'The value of harmony note should consist of exactly 6 digits.';

    if (event.target.name === 'type') {
      event.target.value === MelodyType.TUNE
        ? setValueGuide(tuneGuide)
        : setValueGuide(noteGuide);
    }
  };

  const validateStep1 = () => {
    if (
      formData.organization === '' ||
      formData.title === '' ||
      formData.type === '' ||
      formData.rhythmNote === ''
    ) {
      alert('Please fill in all required fields.');
      return false;
    }

    switch (formData.type) {
      case MelodyType.TUNE:
        if (!formData.rhythmNote.match(RHYTHM_CODE_REGEX.TUNE)) {
          alert(
            'The value of melody tune must be either 5 digits or between 7 and 9 digits.'
          );
          return false;
        }
        break;

      case MelodyType.NOTE:
        if (!formData.rhythmNote.match(RHYTHM_CODE_REGEX.NOTE)) {
          alert(
            'The value of harmony note should consist of exactly 6 digits.'
          );
          return false;
        }
        break;
    }

    return true;
  };

  const validateStep2 = () => {
    if (
      formData.audioPath === '' ||
      formData.chordType === '' ||
      formData.soundType === '' ||
      formData.experimentName === '' ||
      formData.description === ''
    ) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateStep1()) return;
    if (activeStep === 1 && !validateStep2()) return;

    if (activeStep === steps.length - 1) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const entityCreate = new EntityCreateRequest();

    switch (formData.type) {
      case MelodyType.TUNE:
        entityCreate.type = 'TUNE';
        entityCreate.melodyId = `/A/${formData.rhythmNote}`;
        break;

      case MelodyType.NOTE:
        entityCreate.type = 'NOTE';
        entityCreate.melodyId = `/B/${formData.rhythmNote}`;
        break;
    }

    entityCreate.organization = formData.organization;
    entityCreate.title = formData.title;

    const attribute = new AttributeCreateRequest();
    attribute.mainSound = '/';
    attribute.paths = new Array<PathCreateRequest>();

    const path = new PathCreateRequest();
    path.soundType = formData.soundType;
    path.audioPath = formData.audioPath;
    path.experimentName = formData.experimentName;
    path.chordType = formData.chordType;
    path.description = formData.description;
    path.isDefault = true;
    attribute.paths.push(path);
    entityCreate.attributes.push(attribute);

    const entityCreateAction = entityCreateActions.createEntity(
      entityCreate // Pass the entityCreate object directly as the payload
    );

    isEntityCreationComplete = true;
    dispatch(entityCreateAction);
  };

  return (
    <>
      <div className="page-title">Melody Entity Create</div>
      {isMobile ? (
        <MobileStepperComponent
          steps={steps}
          activeStep={activeStep}
          handleBack={() =>
            setActiveStep((prevActiveStep) => prevActiveStep - 1)
          }
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      ) : (
        <DesktopStepperComponent steps={steps} activeStep={activeStep} />
      )}

      <Container>
        <FormComponent
          activeStep={activeStep}
          formData={formData}
          handleFormChange={handleFormChange}
          organization={organization}
          valueGuide={valueGuide}
        />
        {!isMobile ? (
          <DesktopStepperBtnComponent
            steps={steps}
            activeStep={activeStep}
            handleBack={() =>
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}

export default EntityCreate;
