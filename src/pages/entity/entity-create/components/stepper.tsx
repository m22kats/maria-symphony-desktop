import { Stepper, Step, StepLabel, MobileStepper, Button } from '@mui/material';
import styled from 'styled-components';
const StyledMobileStepTitle = styled.div`
  margin: 1em 0em 2em 0em;
  color: #404040;
  font-size: 1em;
  text-align: center;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
`;
const BtnTxt = styled.div`
  font-style: italic;
  font-weight: bold;
`;

interface MobileStepperProps {
  steps: string[];
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: (e: any) => void;
}
const MobileStepperComponent = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
}: MobileStepperProps) => {
  return (
    <div>
      <StyledMobileStepTitle>{steps[activeStep]}</StyledMobileStepTitle>
      <MobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        sx={{ bgcolor: 'background.paper' }}
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
        nextButton={
          <Button size="small" onClick={handleNext}>
            {activeStep === steps.length - 1 ? (
              <BtnTxt onClick={handleSubmit}>Create</BtnTxt>
            ) : (
              'Next'
            )}
          </Button>
        }
      />
    </div>
  );
};

interface DesktopStepperComponentProps {
  steps: string[];
  activeStep: number;
}
const DesktopStepperComponent = ({
  steps,
  activeStep,
}: DesktopStepperComponentProps) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

interface DesktopStepperBtnProps {
  steps: string[];
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: (e: any) => void;
}
const DesktopStepperBtnComponent = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
}: DesktopStepperBtnProps) => {
  return (
    <BtnContainer>
      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        Back
      </Button>
      <Button size="small" onClick={handleNext}>
        {activeStep === steps.length - 1 ? (
          <BtnTxt onClick={handleSubmit}>Create</BtnTxt>
        ) : (
          'Next'
        )}
      </Button>
    </BtnContainer>
  );
};

export {
  MobileStepperComponent,
  DesktopStepperComponent,
  DesktopStepperBtnComponent,
};
