import React, { useState } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { withTranslation, WithTranslation } from 'react-i18next'
import AddEmulator from 'container/emulators/add-emulator'
import ConfigureEmulator from 'container/emulators/configure-emulator'
import CreateEmulator from 'container/emulators/create-emulator'
import { Button } from '@material-ui/core'
import { EmulatorId, Emulator } from 'models/emulator/types'
import { Redirect } from 'react-router-dom'
import { getEmulator } from 'services/emulators-service'
import useStyles from './stepper-styles'

/**
 * This component handles the display of a stepper during emulator creation.
 */
function EmulatorStepper(props: WithTranslation): React.ReactElement {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [configurationMissing, setConfigurationMissing] = useState(true)
  const [selectedEmulatorId, setSelectedEmulatorId] = useState<
    EmulatorId | undefined
  >()
  const [emulator, setEmulator] = useState<Emulator | undefined>()

  /**
   * Retrieve stepper steps labels.
   *
   * @returns steps as array of strings.
   */
  const getSteps = (): string[] => {
    return [
      props.i18n.t('breadcrumb.add-emulator'),
      props.i18n.t('breadcrumb.configure-emulator'),
      props.i18n.t('breadcrumb.create-emulator'),
    ]
  }

  /**
   * Handles selection of emulator Id.
   *
   * @param emulatorId - selected emulator Id.
   */
  const selectedEmulatorIdHandler = (emulatorId: EmulatorId): void => {
    setSelectedEmulatorId(emulatorId)
    setEmulator(getEmulator(emulatorId))
  }

  /**
   * Error handler.
   *
   * @param hasError - true if an error occured, else false.
   */
  const errorHandler = (hasError: boolean): void => {
    setHasError(hasError)
  }

  /**
   * Set if an emulator configuration is missing.
   *
   * @param configurationMissing - true if a configuration is missing, else false.
   */
  const setconfigurationMissing = (configurationMissing: boolean): void => {
    setConfigurationMissing(configurationMissing)
  }

  /**
   * Retrieve stepper steps contents as array of components.
   *
   * @param step - step index to retrieve corresponding step content
   * @returns component node corresponding to specified step.
   */
  const getStepContent = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return (
          <AddEmulator
            selectedEmulatorId={selectedEmulatorId}
            onSelectedEmulatorId={selectedEmulatorIdHandler}
            onError={errorHandler}
          />
        )
      case 1:
        if (emulator)
          return (
            <ConfigureEmulator
              emulator={emulator}
              setConfigurationMissing={setconfigurationMissing}
            />
          )
        return <Redirect to="/" />
      case 2:
        return <CreateEmulator emulator={emulator} />
      default:
        return <Redirect to="/" />
    }
  }

  /**
   * Handle next button event.
   */
  const handleNext = (): void => {
    setActiveStep(activeStep + 1)
  }

  /**
   * Handle back button event.
   */
  const handleBack = (): void => {
    setActiveStep(activeStep - 1)
  }

  /**
   * Compute next button disabled status.
   *
   * @returns true to disable next button, else false.
   */
  const getNextButtonDisabledStatus = (): boolean => {
    switch (activeStep) {
      case 0:
        // Choose emulator
        return hasError || selectedEmulatorId === undefined
      case 1:
        // Configure emulator
        return configurationMissing
      default:
        return false
    }
  }

  const steps = getSteps()

  return (
    <div className={classes.stepperMain}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {} = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <Redirect to="/" />
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              {activeStep !== steps.length - 1 && (
                <Button color="secondary" onClick={handleBack}>
                  {props.i18n.t('common.back')}
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={getNextButtonDisabledStatus()}
              >
                {activeStep === 0
                  ? props.i18n.t('common.next')
                  : props.i18n.t('common.ok')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default withTranslation()(EmulatorStepper)
