import React, { useState } from "react";
import {
  Icon,
  Button,
  StepLabel,
  Step,
  Stepper,
  CardActions
} from "@material-ui/core";
import UserForm from "../../user/components/UserForm";
import ResumeStep from "./ResumeStep";
import ScheduleStep from "./ScheduleStep";
import ConfirmStep from "./ConfirmStep";
import { setApplyData } from "../../../redux/actions/ApplyActions"
import { connect } from "react-redux";

function getSteps() {
  return ["Personal Information", "Validation", "Resume", "Schedule", "Confirm"];
}

function getStepContent(stepIndex, props) {
    switch (stepIndex) {
    case 0:
        return <UserForm {...props}/>
    case 1:
        return <div>Validation</div>
    case 2:
        return <ResumeStep/>
    case 3:
        return <ScheduleStep/>
    case 4:
        return <ConfirmStep/>
    default:
      return "";
    }
  }

const ApplyStepper = (props) => {
    const { history, match } = props
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = () => {
      console.log("Submiting...", props.apply);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleCancel = () => {
        history.push(`/growth-opportunities/${match.params.opp_id}`)
    };

    return (
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <div className="flex flex-middle mb-16">
                  <Icon>done</Icon> <span className="ml-8">Done</span>
                </div>
                <Button variant="contained" color="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep, props)}
                <div className="pt-24">
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className="ml-16 align-self-end"
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button
                        className="ml-16"
                        variant="contained"
                        color="default"
                        onClick={handleCancel}
                    >
                        {"Cancel"}
                    </Button>
                  </CardActions>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

const mapStateToProps = ({ applyReducer }) => {
  const { apply, user, growth_detail } = applyReducer;
  return {
      apply, 
      user, 
      growth_detail
  };
};

export default connect(mapStateToProps, {
  setApplyData,
})(ApplyStepper);