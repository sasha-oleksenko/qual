import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
}                               from '@mui/material'
import React, { FC, useEffect } from 'react'
import { QuestionKey }          from './questions'
import { FormikValues }         from 'formik/dist/types'


interface basicData {
  formik: FormikValues
  question: (state: any) => string,
  elementConstructor: string
  next: QuestionKey
  setCurrentQuestionHandler: (next: QuestionKey, current: QuestionKey) => void
  description: string
  current: string
  question1?:(arg:any)=> string
  setSchema: (current: QuestionKey) => void
}


export const Wrapper: React.FC<any> = ({ children, ...rest }) => {
  useEffect(() => {
    rest.setSchema(String(rest.current))
  }, [ rest.current ])

  const handleClick = async () => {
    const errors = await rest.formik.validateForm()
    rest.formik.submitForm()
    if (Object.keys(errors).length === 0) {
      rest.setCurrentQuestionHandler(rest.next, rest.current)
    }
  }

  return (

    <Grid
      container
      direction="column"
      sx={ { minHeight: 'calc( 100vh - 60px )' } }
    >
      <Typography
        variant="h6"
        sx={ { fontWeight: 'bold', padding: '0 10vw', marginTop: '10px' } }
      >
        { rest.question(rest.formik.values) }
      </Typography>
      <form onSubmit={ rest.formik.handleSubmit }>

        { children }

        <Typography sx={ { marginTop: '5vh', fontStyle: 'italic', padding: '3vw' } }>
          { rest.description }
        </Typography>

        <Grid
          item
          container
          justifyContent="center"
          flexShrink="0"
          sx={ { bottom: '40px', height: '50px', marginTop: 'auto', marginBottom: '5vh' } }
        >
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={ () => handleClick() }
          >
            <Typography variant="h6">Continue</Typography>
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

interface ICreateCheckboxQuestion extends basicData {
  answers?: { text: string, value: string }[] | undefined
  formName?: string
}

export const CreateRadioQuestion: FC<ICreateCheckboxQuestion> = ({
  answers,
  setCurrentQuestionHandler,
  next,
  question,
  description,
  formik,
  formName,
  current,
  setSchema,

}) => {

  useEffect(() => formik.setFieldValue(formName, answers && answers[0].value), [formName])
  return (
    <>
      <Wrapper
        next={ next }
        setCurrentQuestionHandler={ setCurrentQuestionHandler }
        description={ description }
        question={ question }
        formik={ formik }
        formName={ formName }
        setSchema={ setSchema }
        current={ current }

      >
        {formName && formik.values[formName] &&<RadioGroup
          name={ formName }
          onBlur={ formik.handleBlur }
          onChange={ formik.handleChange }
          defaultValue={ answers && answers[0].value }
          sx={ { marginTop: '4vh', paddingLeft: '10vw' } }
        >
          { answers && answers.map((item, index) =>
            <FormControlLabel
              onChange={ formik.handleChange }
              value={ item.value }
              name={ formName }
              key={ index }
              control={ <Radio/> }
              sx={ { maxHeight: '6vh' } }
              label={ <Typography variant="h6"> { item.text } </Typography> }
            />,
          ) }


        </RadioGroup>}

      </Wrapper>
    </>
  )
}

interface ICreateTextFieldQuestion extends basicData {
  inputs?: { text: string, value: string }[] | undefined
}

export const CreateTextFieldQuestion: FC<ICreateTextFieldQuestion> = ({
  question,
  inputs,
  setCurrentQuestionHandler,
  next,
  description,
  formik,
  current,
  setSchema,
}) => {
  return (
    <Wrapper
      next={ next }
      setCurrentQuestionHandler={ setCurrentQuestionHandler }
      description={ description }
      question={ question }
      formik={ formik }
      current={ current }
      setSchema={ setSchema }
    >

      <Grid
        container
        direction="column"
        sx={ { paddingLeft: '10vw' } }
      >

        { inputs && inputs.map((item: any, index: number) => {
            return <TextField
              label={
                <Typography
                  variant="h6"
                  color="black"
                  sx={ { fontStyle: 'italic', minWidth: '60vw' } }
                >
                  { item.text }
                </Typography> }
              onChange={ formik.handleChange }
              key={ index }
              autoFocus={index===0}
              variant="standard"
              color="primary"
              onBlur={ formik.handleBlur }
              value={ formik.values[item.value] }
              name={ item.value }
              InputProps={ { style: { fontSize: 20, fontWeight: 'bold' } } }
              sx={ { maxHeight: 'auto', maxWidth: '60vw' } }
              error={ formik.touched[item.value] && Boolean(formik.errors[item.value]) }
              helperText={ formik.touched[item.value] && <Typography
                component="span"
                color="primary"
                sx={ { fontSize: '15px' } }
              >{ formik.errors[item.value] }</Typography> }
            />
          }
        ) }
      </Grid>

    </Wrapper>
  )
}

interface ICreateCheckBoxQuestion extends basicData {
  answers?: { text: string, value: string }[] | undefined
  formName?: string

}

export const CreateCheckBoxQuestion: FC<ICreateCheckBoxQuestion> = ({
  question,
  answers,
  setCurrentQuestionHandler, next,
  description,
  formik,
  formName,
  current,
  setSchema,

}) => {
  return (
    <Wrapper
      next={ next }
      setCurrentQuestionHandler={ setCurrentQuestionHandler }
      description={ description }
      question={ question }
      formik={ formik }
      current={ current }
      setSchema={ setSchema }
    >

      <FormGroup
        onChange={ formik.handleChange }
        sx={ { paddingLeft: '10vw' } }
      >
        { answers && answers.map((item: any, index: number) => (
          <FormControlLabel
            control={ <Checkbox
            /> }
            label={ <Typography variant="h6"> { item.text } </Typography> }
            name={ formName }
            key={ index }
            value={ item.value }
            color="primary"
            sx={ { margin: '1vh 0', width: '80vw' } }
          />))
        }
      </FormGroup>

    </Wrapper>
  )
}


const states = [ 'Alaska', 'Alabama', 'Arkansas', 'American Samoa', 'Arizona', 'California', 'Colorado', 'Connecticut',
  'District of Columbia',
  'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Iowa', 'Idaho', 'Illinois', 'Indiana', 'Kansas', 'Kentucky',
  'Louisiana', 'Massachusetts',
  'Maryland', 'Maine', 'Michigan', 'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota',
  'Nebraska', 'New Hampshire',
  'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico',
  'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Virgin Islands', 'Vermont', 'Washington', 'Wisconsin',
  'West Virginia', 'Wyoming' ]

interface ICreateAutoCompleteQuestion extends basicData {
  inputs?: { text: string, value: string }[] | undefined
  formName?: string
}

export const CreateAutoCompleteQuestion: FC<ICreateAutoCompleteQuestion> = ({
  question,
  inputs,
  setCurrentQuestionHandler,
  next,
  description,
  formik,
  formName,
  current,
  setSchema,
}) => {

  return (
    <Wrapper
      next={ next }
      setCurrentQuestionHandler={ setCurrentQuestionHandler }
      description={ description }
      question={ question }
      formik={ formik }
      current={ current }
      setSchema={ setSchema }
    >
      <Grid
        container
        direction="column"
        wrap="nowrap"
        alignContent="center"
        justifyContent="space-evenly"
        alignItems="flex-start"
        sx={ { paddingLeft: '5vh' } }
      >
        { inputs && inputs.map((item, index: number) => (
          <Grid
            item
            sx={ { margin: '2vh 0' } }
            key={ index }
          >
            <Typography variant="h6">Option { index + 1 }</Typography>
            <Grid container>
              <TextField
                label={
                  <Typography
                    component="span"
                    color="black"
                    sx={ { fontStyle: 'italic', width: '200px' } }
                  >
                    { item.text }
                  </Typography> }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                value={ formik.values[item.value] }
                key={ index }
                variant="standard"
                color="primary"
                name={ item.value }
                InputProps={ { style: { fontSize: 20, fontWeight: 'bold' } } }
                sx={ { width: '40vw' } }
                error={ formik.touched[item.value] && Boolean(formik.errors[item.value]) }
                helperText={ formik.touched[item.value] && <Typography
                  component="span"
                  color="primary"
                  sx={ { fontSize: '15px' } }
                >{ formik.errors[item.value] }</Typography> }
              />
              <Autocomplete
                id={ `${ formName }[1]` }
                onChange={ (event, value) => formik.setFieldValue(`${ formName }[${ index }][1]`, value) }
                options={ states }
                sx={ { width: '40vw' } }
                renderInput={ (params) =>
                  <TextField { ...params } label="State"/> }
              />
            </Grid>
          </Grid>
        )) }
      </Grid>

    </Wrapper>
  )
}



