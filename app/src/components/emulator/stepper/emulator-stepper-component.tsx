import './emulator-stepper.scss'
import React from 'react'
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

/**
 * Component state definition.
 */
interface ComponentState {
  activeStep: number
  selectedEmulatorId?: EmulatorId
  configurationMissing: boolean
  hasError: boolean
  emulator?: Emulator
}

/**
 * This component handles the display of a stepper during emulator creation.
 */
class EmulatorStepper extends React.PureComponent<
  WithTranslation,
  ComponentState
> {
  /**
   * Initialize component.
   *
   * @param props - component properties.
   */
  constructor(props: WithTranslation) {
    super(props)

    this.state = {
      activeStep: 0,
      hasError: false,
      configurationMissing: true,
    }
  }

  /**
   * Retrieve stepper steps labels.
   *
   * @returns steps as array of strings.
   */
  private getSteps = (): string[] => {
    return [
      this.props.i18n.t('breadcrumb.add-emulator'),
      this.props.i18n.t('breadcrumb.configure-emulator'),
      this.props.i18n.t('breadcrumb.create-emulator'),
    ]
  }

  /**
   * Handles selection of emulator Id.
   *
   * @param emulatorId - selected emulator Id.
   */
  private selectedEmulatorIdHandler = (emulatorId: EmulatorId): void => {
    this.setState({
      selectedEmulatorId: emulatorId,
      emulator: getEmulator(emulatorId),
    })
  }

  /**
   * Error handler.
   *
   * @param hasError - true if an error occured, else false.
   */
  private errorHandler = (hasError: boolean): void => {
    this.setState({
      hasError: hasError,
    })
  }

  /**
   * Set if an emulator configuration is missing.
   *
   * @param configurationMissing - true if a configuration is missing, else false.
   */
  private setconfigurationMissing = (configurationMissing: boolean): void => {
    this.setState({
      configurationMissing: configurationMissing,
    })
  }

  /**
   * Retrieve stepper steps contents as array of components.
   *
   * @param step - step index to retrieve corresponding step content
   * @returns component node corresponding to specified step.
   */
  private getStepContent = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return (
          <AddEmulator
            selectedEmulatorId={this.state.selectedEmulatorId}
            onSelectedEmulatorId={this.selectedEmulatorIdHandler}
            onError={this.errorHandler}
          />
        )
      case 1:
        if (this.state.emulator)
          return (
            <ConfigureEmulator
              emulator={this.state.emulator}
              setConfigurationMissing={this.setconfigurationMissing}
            />
          )
        return <Redirect to="/" />
      case 2:
        return <CreateEmulator emulator={this.state.emulator} />
      default:
        return <Redirect to="/" />
    }
  }

  /**
   * Handle next button event.
   */
  private handleNext = (): void => {
    this.setState((state) => {
      return {
        activeStep: state.activeStep + 1,
      }
    })
  }

  /**
   * Handle back button event.
   */
  private handleBack = (): void => {
    this.setState((state) => {
      return {
        activeStep: state.activeStep - 1,
      }
    })
  }

  /**
   * Compute next button disabled status.
   *
   * @returns true to disable next button, else false.
   */
  private getNextButtonDisabledStatus = (): boolean => {
    switch (this.state.activeStep) {
      case 0:
        // Choose emulator
        return (
          this.state.hasError || this.state.selectedEmulatorId === undefined
        )
      case 1:
        // Configure emulator
        return this.state.configurationMissing
      default:
        return false
    }
  }

  /**
   * Render stepper.
   */
  public render(): React.ReactNode {
    const steps = this.getSteps()

    return (
      <div className="stepper">
        <Stepper activeStep={this.state.activeStep}>
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
          {this.state.activeStep === steps.length ? (
            <Redirect to="/" />
          ) : (
            <div>
              {this.getStepContent(this.state.activeStep)}
              <div>
                {this.state.activeStep !== steps.length - 1 && (
                  <Button color="secondary" onClick={this.handleBack}>
                    {this.props.i18n.t('common.back')}
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  disabled={this.getNextButtonDisabledStatus()}
                >
                  {this.state.activeStep === 0
                    ? this.props.i18n.t('common.next')
                    : this.props.i18n.t('common.ok')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withTranslation()(EmulatorStepper)
