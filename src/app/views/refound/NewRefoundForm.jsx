import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  FormControl,
  InputLabel,
  TextField,
  Icon,
  Button,
  StepLabel,
  Step,
  Stepper,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import {
  getStudiesCatergory,
  GetIformationLists,
  SaveRefund
} from "../../redux/actions/RefoundActions";
import UploadForm from "./UploadForm";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker 
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { format } from 'date-fns';
import es from "date-fns/locale/es";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MuiAlert from '@material-ui/lab/Alert';

function getSteps() {
  return ["Categoría del Curso", "Datos del Curso", "Archivos Adjuntos"];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const UNIVERSITY_STUDIES = "ESTUDIOS UNIVERSITARIOS";
export const CERTIFICATION = "CERTIFICACIÓN";
export const CISCO = "CISCO";
export const LANGUAGES = "IDIOMAS";
export const TECHNICAL_STUDIES = "ESTUDIOS TÉCNICOS";
export const OTHERS = "OTROS";

const NewRefoundForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const studiesCatergory = useSelector(state => state.refound.studiesCatergory);
  const universityInstitutes = useSelector(state => state.refound.universityInstitutes);
  const ciscoAcademies = useSelector(state => state.refound.ciscoAcademies);
  const techStudiesCenter = useSelector(state => state.refound.techStudiesCenter);
  const languageAcademies = useSelector(state => state.refound.languageAcademies);
  const certifications = useSelector(state => state.refound.certifications);
  const saveRefound = useSelector(state => state.refound.saveRefound);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLoading = useSelector(state => state.refound.loading);
  const [isError, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isErrorUpload, setIsErrorUpload] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [files, setFiles] = useState([]);
  
  const [form, setForm] = useState({
    badge: user.badge, //'42553',,
    name: user.fullname,
    exchangeRate: '',
    studiesCategory: '',
    universityInstitute: '',
    techStudiesCenter: '',
    languajeCenter: '',
    certification: '',
    ciscoAcademy: '',
    others: '',
    course: '',
    invoiceNumber: '',
    certificationDate: null, //new Date(),//null, 
    startDate: null, //new Date(),  
    endDate: null, //new Date().setDate(new Date().getDate() + 1), //null,
    email: ''
  });

  useEffect(() => {
    dispatch(GetIformationLists(user.badge));
    dispatch(getStudiesCatergory());
  }, []);

  const validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  const handleChange = (event) => {
    event.persist();
    if (event.target.name == "email") {
      if (!validateEmail(event.target.value)) {
        setEmailError(true);
        setErrorMessage(errorMessage => ({ ...errorMessage, email: "*Se debe ingresar el correo en formato correcto" }));
      } else {
        setEmailError(false);
        setErrorMessage(errorMessage => ({ ...errorMessage, email: null }));
      }
    }

    if (event.target.name == "course" && event.target.value != "") {
      setErrorMessage(errorMessage => ({ ...errorMessage, course: "" }));
    }

    if (event.target.name == "invoiceNumber" && event.target.value != "") {
      setErrorMessage(errorMessage => ({ ...errorMessage, invoiceNumber: "" }));
    }

    if (isError) {

      if ((event.target.name == "universityInstitute" || event.target.name == "certification" ||
        event.target.name == "ciscoAcademy" || event.target.name == "languajeCenter" || event.target.name == "techStudiesCenter") && event.target.value != "") {
        setError(false);
        setErrorMessage(errorMessage => ({ ...errorMessage, customFormControl: "" }));
      }

      if (event.target.name == "others" && event.target.value != null) {
        setError(false);
        setErrorMessage(errorMessage => ({ ...errorMessage, others: "" }));
      }
    }

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const ValidateSelect = () => {
    switch (form.studiesCategory.toUpperCase()) {
      case UNIVERSITY_STUDIES:
        if (form.universityInstitute == "" || form.universityInstitute == undefined) {
          setError(true);
          setErrorMessage(errorMessage => ({ ...errorMessage, customFormControl: "*Se debe seleccionar una Insitución Universitaria" }));
        }
        break;
      case CERTIFICATION:
        if (form.certification == "" || form.certification == undefined) {
          setError(true);
          setErrorMessage(errorMessage => ({ ...errorMessage, customFormControl: "*Se debe seleccionar un centro de Certificación" }));
        }
        break;
      case CISCO:
        if (form.ciscoAcademy == "" || form.ciscoAcademy == undefined) {
          setError(true);
          setErrorMessage(errorMessage => ({ ...errorMessage, customFormControl: "*Se debe seleccionar una academia de CISCO" }));
        }
        break;
      case LANGUAGES:
        if (form.languajeCenter == "" || form.languajeCenter == undefined) {
          setError(true);
          setErrorMessage(errorMessage => ({ ...errorMessage, customFormControl: "*Se debe seleccionar un centro de Idiomas" }));
        }
        break;
      case TECHNICAL_STUDIES:
        if (form.techStudiesCenter == "" || form.techStudiesCenter == undefined) {
          setError(true);
          setErrorMessage(errorMessage => ({ ...errorMessage, customFormControl: "*Se debe seleccionar un centro de estudios técnico" }));
        }
        break;
      case OTHERS:
        if (form.others == "" || form.others == undefined) {
          setError(true);
          setErrorMessage(errorMessage => ({ ...errorMessage, others: "*Se debe ingresar un valor" }));
        }
        break;
      default:
        break;
    }

  }

  const handleNext = () => {
    let isErrorValidation = false;
    if (activeStep == 1) {

      ValidateSelect();

      if (form.course == "" || form.course == undefined) {
        isErrorValidation = true;
        setErrorMessage(errorMessage => ({ ...errorMessage, course: "*Se debe ingresar el nombre del curso" }));
      }

      if (form.invoiceNumber == "" || form.invoiceNumber == undefined) {
        isErrorValidation = true;
        setErrorMessage(errorMessage => ({ ...errorMessage, invoiceNumber: "*Se debe ingresar una factura válida" }));
      }

      if (form.email == "" || form.email == undefined) {
        isErrorValidation = true;
        setErrorMessage(errorMessage => ({ ...errorMessage, email: "*Se debe ingresar el correo en formato correcto" }));
      }

      if (form.studiesCategory.toUpperCase() == CERTIFICATION) {
        if (form.certificationDate == null) {
          isErrorValidation = true;
          setErrorMessage(errorMessage => ({ ...errorMessage, certificationDate: "*Se debe seleccionar la fecha de certificación" }));
        }
      } else {
        if (form.startDate == null) {
          isErrorValidation = true;
          setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "*Se debe seleccionar la fecha de inicio" }));
        }
        if (form.endDate == null) {
          isErrorValidation = true;
          setErrorMessage(errorMessage => ({ ...errorMessage, endDate: "*Se debe seleccionar la fecha de finalización" }));
        }
      }
    }
    if (!isErrorValidation && !isError && !emailError) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      return;
    }

  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);

    if (activeStep == 1) {
      setForm({
        ...form,
        studiesCategory: '',
        universityInstitute: '',
        techStudiesCenter: '',
        languajeCenter: '',
        certification: '',
        ciscoAcademy: '',
        others: '',
        course: '',
        invoiceNumber: '',
        certificationDate: null,
        startDate: null,
        endDate: null,
        email: ''
      });
    };
    setError(false);
    setEmailError(false);
    setFiles([]);
    setErrorMessage([]);
  };

  const handleReset = () => {
    setActiveStep(0);
    setForm({
      ...form,
      studiesCategory: '',
      universityInstitute: '',
      techStudiesCenter: '',
      languajeCenter: '',
      certification: '',
      ciscoAcademy: '',
      others: '',
      course: '',
      invoiceNumber: '',
      certificationDate: null,
      startDate: null,
      endDate: null,
      email: ''
    });
    setError(false);
    setEmailError(false);
    setFiles([]);
    
    setErrorMessage([]);
  };

  const handleSubmit = async () => {
    if (files.length <= 0) {
      setIsErrorUpload(true);
      setErrorMessage(errorMessage => ({ ...errorMessage, files: "*Se debe seleccionar al menos un archivo" }));
      return;
    }
    setActiveStep(steps.length);
    await dispatch(SaveRefund(form, files));
  }

  const handleDateChangeStartDate = date => {
    if (date != null) {
      setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "", endDate: "" }));
    }
    setForm({
      ...form,
      startDate: date,
    });
  };

  const handleDateChangeEndDate = date => {
    if (date != null) {
      setErrorMessage(errorMessage => ({ ...errorMessage, endDate: "", endDate: "" }));
    }
    setForm({
      ...form,
      endDate: date,
    });
  };

 const handleDateChangeCertificationDate = date => {
    if (date != null) {
      setErrorMessage(errorMessage => ({ ...errorMessage, certificationDate: "" }));
    }

    setForm({
      ...form,
      certificationDate: date,
    });
  };

  const CustomFormControl = (props) => (
    <FormControl className="form-control-leader mt-24 mr-24" error={isError}>
      <InputLabel id={`input-${props.id}`}>{props.label}</InputLabel>
      <Select labelId={`label-${props.id}`} onChange={event => handleChange(event)}
        value={props.value}
        name={props.id}
        error={!!errorMessage.customFormControl}
      >
        {props.dataArray.map(item => (
          <MenuItem key={`item-${item.id}`} value={item.id}>
            {item.tittle}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {errorMessage.customFormControl}
      </FormHelperText>
    </FormControl>
  );

  const handleSelectCategory = () => {
    switch (form.studiesCategory.toUpperCase()) {
      case UNIVERSITY_STUDIES:
        return (
          <CustomFormControl label="Institución Universitaria *" id="universityInstitute" value={form.universityInstitute} dataArray={universityInstitutes} />
        );
      case CERTIFICATION:
        return (
          <CustomFormControl label="Centros de certificación *" id="certification" value={form.certification} dataArray={certifications} />
        );
      case CISCO:
        return (
          <CustomFormControl label="Academia CISCO *" id="ciscoAcademy" value={form.ciscoAcademy} dataArray={ciscoAcademies} />
        );
      case LANGUAGES:
        return (
          <CustomFormControl label="Centros de Idiomas *" id="languajeCenter" value={form.languajeCenter} dataArray={languageAcademies} />
        );
      case TECHNICAL_STUDIES:
        return (
          <CustomFormControl label="Centro de estudios técnico *" id="techStudiesCenter" value={form.techStudiesCenter} dataArray={techStudiesCenter} />
        );
      case OTHERS:
        return (
          <TextField name="others" value={form.others} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Otros" onChange={event => handleChange(event)}
            error={!!errorMessage.others}
            helperText={errorMessage.others}
          />
        );
      default:
        return "";
    }
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="mb-24">
            <TextField name="bagde" value={form.badge} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Badge" disabled variant="filled"
              InputProps={{
                readOnly: true,
              }} />
            <TextField name="nombre" value={form.name} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Nombre" disabled variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl className="form-control-leader mt-24">
              <InputLabel id="CategoriaEstudio">Categoría de estudio *</InputLabel>
              <Select labelId="CategoriaEstudio" onChange={event => handleChange(event)}
                value={form.studiesCategory}
                name="studiesCategory"
                validators={[
                  "required",
                ]}
              >
                {studiesCatergory.map(categoria => (
                  <MenuItem key={`categoria-${categoria}`} value={categoria}>
                    {categoria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="Message">
              <p>Seleccione una categoría de Estudio.</p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="mb-24">
            {handleSelectCategory()}

            <TextField className="mr-24 mt-24"
              style={{ width: "calc(50% - 24px)" }} label="Nombre de la materia o curso*" name="course" value={form.course} onChange={event => handleChange(event)}
              error={!!errorMessage.course}
              helperText={errorMessage.course}
            />

            <TextField className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Factura*"
              name="invoiceNumber" value={form.invoiceNumber} onChange={event => handleChange(event)}
              error={!!errorMessage.invoiceNumber}
              helperText={errorMessage.invoiceNumber}
            />

            <TextField className="mr-24 mt-24 " style={{ width: "calc(50% - 24px)" }} label="Correo Electrónico*"
              name="email" value={form.email}
              onChange={event => handleChange(event)}
              error={!!errorMessage.email}
              helperText={errorMessage.email}
            />

            {form.studiesCategory.toUpperCase() != CERTIFICATION ?
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <DatePicker
                    className="mr-24 mt-24"
                    style={{ width: "calc(50% - 24px)" }}
                    cancelLabel="CANCELAR"
                    error={!!errorMessage.startDate}
                    helperText={errorMessage.startDate}
                    format="dd/MM/yyyy"
                    label="Fecha de Inicio*"
                    value={form.startDate}
                    name="endDate"
                    onChange={handleDateChangeStartDate}    
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                  <DatePicker
                    className="mr-24 mt-24"
                    style={{ width: "calc(50% - 24px)" }}
                    cancelLabel="CANCELAR"
                    error={!!errorMessage.endDate}
                    helperText={errorMessage.endDate}
                    format="dd/MM/yyyy"
                    label="Fecha de Finalización*"
                    value={form.endDate}
                    name="endDate"
                    onChange={handleDateChangeEndDate}
                    minDate={form.startDate != null ? new Date(form.startDate).setTime(new Date(form.startDate).getTime() + 1 * 86400000) : null}
                    disabled={!form.startDate}
                  />
                </MuiPickersUtilsProvider>
              </div> :
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                <DatePicker
                  className="mr-24 mt-24"
                  style={{ width: "calc(50% - 24px)" }}
                  cancelLabel="CANCELAR"
                  error={!!errorMessage.certificationDate}
                  helperText={errorMessage.certificationDate}
                  format="dd/MM/yyyy"
                  label="Fecha de Certificación*"
                  value={form.certificationDate}
                  name="certificationDate"
                  onChange={handleDateChangeCertificationDate}
                  minDate={form.startDate != null ? new Date(form.startDate).setTime(new Date(form.startDate).getTime() + 1 * 86400000) : null}
                />
              </MuiPickersUtilsProvider>
            }
          </div>
        );
      case 2:
        return <UploadForm files={files} setFiles={setFiles} isError={isErrorUpload} setErrorMessage={setIsErrorUpload} errorMessage={errorMessage.files} />
      default:
        return "";
    }
  }

  return (
    <div>
      {isLoading ? <Loading /> :
        <div className="m-sm-30">
          <SimpleCard title="Nuevo reembolso educativo">
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
                  {saveRefound != null ? 
                  <div>
                    <div className="d-flex justify-content-center mb-16">
                    <Alert variant="outlined" severity={!saveRefound.success == false ? "success" : "error"}>
                      {!saveRefound.success == false ? "¡Guardado existosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"}
                    </Alert>
                  </div>
                  <Button variant="contained" color="secondary" onClick={handleReset}>
                    Volver a nuevo
                  </Button>
                  
                  </div> 
                  : <div><p>Hello from here</p></div>}
                </div>
              ) : (
                  <div>
                    {getStepContent(activeStep)}
                    <div className="pt-24">
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        Regresar
                      </Button>
                      <Button
                        className="ml-16"
                        variant="contained"
                        color="primary"
                        onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                        disabled={form.studiesCategory ? false : true}
                      >
                        {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                      </Button>
                    </div>
                  </div>
                )}
            </div>
          </SimpleCard>
        </div>
      }
    </div>
  )
}

export default NewRefoundForm