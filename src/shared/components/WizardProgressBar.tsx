import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export type WizardProgressStatus = 'completed' | 'active' | 'upcoming';

export type WizardProgressStep = {
  id: number | string;
  label: ReactNode;
  status: WizardProgressStatus;
};

export type WizardProgressStyles = {
  header: SxProps<Theme>;
  steps: SxProps<Theme>;
  stepWrapper?: SxProps<Theme>;
  step?: SxProps<Theme>;
  node: SxProps<Theme>;
  nodeCompleted?: SxProps<Theme>;
  nodeActive?: SxProps<Theme>;
  nodeUpcoming?: SxProps<Theme>;
  label: SxProps<Theme>;
  labelCompleted?: SxProps<Theme>;
  labelActive?: SxProps<Theme>;
  labelUpcoming?: SxProps<Theme>;
  connector: SxProps<Theme>;
  connectorFilled?: SxProps<Theme>;
  connectorPartial?: SxProps<Theme>;
};

type ConnectorVariant = 'filled' | 'partial' | 'none';

type WizardProgressBarProps = {
  id?: string;
  steps: WizardProgressStep[];
  styles: WizardProgressStyles;
  renderNodeContent?: (step: WizardProgressStep, index: number) => ReactNode;
  getConnectorVariant?: (
    currentStep: WizardProgressStep,
    nextStep: WizardProgressStep | undefined,
    index: number,
  ) => ConnectorVariant;
  trailingContent?: ReactNode;
};

const defaultConnectorVariant = (step: WizardProgressStep): ConnectorVariant =>
  step.status === 'completed' || step.status === 'active' ? 'filled' : 'none';

const mergeSx = (
  ...values: Array<SxProps<Theme> | undefined>
): SxProps<Theme> => values.filter(Boolean) as SxProps<Theme>;

const WizardProgressBar = ({
  id,
  steps,
  styles,
  renderNodeContent,
  getConnectorVariant,
  trailingContent,
}: WizardProgressBarProps) => (
  <Box id={id} sx={styles.header}>
    <Box sx={styles.steps}>
      {steps.map((step, index) => {
        const variantNodeSx =
          step.status === 'completed'
            ? styles.nodeCompleted
            : step.status === 'active'
            ? styles.nodeActive
            : styles.nodeUpcoming;

        const variantLabelSx =
          step.status === 'completed'
            ? styles.labelCompleted
            : step.status === 'active'
            ? styles.labelActive
            : styles.labelUpcoming;

        const nodeContent = renderNodeContent ? renderNodeContent(step, index) : step.id;

        const connectorVariant =
          index < steps.length - 1
            ? (getConnectorVariant ?? defaultConnectorVariant)(step, steps[index + 1], index)
            : 'none';

        return (
          <Box key={step.id} sx={mergeSx(styles.stepWrapper)}>
            <Box sx={mergeSx(styles.step)}>
              <Box sx={mergeSx(styles.node, variantNodeSx)}>{nodeContent}</Box>
              <Typography component="span" sx={mergeSx(styles.label, variantLabelSx)}>
                {step.label}
              </Typography>
            </Box>
            {index < steps.length - 1 ? (
              <Box sx={styles.connector}>
                {connectorVariant === 'filled' ? (
                  <Box sx={styles.connectorFilled ?? styles.connectorPartial ?? { width: '100%', height: '100%' }} />
                ) : connectorVariant === 'partial' ? (
                  <Box sx={styles.connectorPartial ?? styles.connectorFilled ?? { width: '50%', height: '100%' }} />
                ) : null}
              </Box>
            ) : null}
          </Box>
        );
      })}
    </Box>
    {trailingContent}
  </Box>
);

export default WizardProgressBar;
