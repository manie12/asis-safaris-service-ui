import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SvgIconComponent } from '@mui/icons-material';
import type { SxProps, Theme } from '@mui/material/styles';

export type WizardHeroHighlight = {
  id: string;
  label: ReactNode;
  icon: SvgIconComponent;
  iconProps?: Record<string, unknown>;
};

export type WizardHeroStyles = {
  heroSection: SxProps<Theme>;
  heroMediaWrap: SxProps<Theme>;
  heroImage: SxProps<Theme>;
  heroOverlay: SxProps<Theme>;
  heroContentWrap: SxProps<Theme>;
  heroCopy: SxProps<Theme>;
  heroTitle: SxProps<Theme>;
  heroDescription: SxProps<Theme>;
  heroHighlights: SxProps<Theme>;
  heroHighlight: SxProps<Theme>;
  heroHighlightLabel?: SxProps<Theme>;
};

type HeroCopyProps = {
  sx?: SxProps<Theme>;
  [key: string]: unknown;
};

type WizardHeroSectionProps = {
  id: string;
  image: { src: string; alt: string };
  title: ReactNode;
  description: ReactNode;
  highlights: WizardHeroHighlight[];
  styles: WizardHeroStyles;
  copyComponent?: ElementType;
  copyComponentProps?: HeroCopyProps;
  renderHighlight?: (highlight: WizardHeroHighlight) => ReactNode;
};

const WizardHeroSection = ({
  id,
  image,
  title,
  description,
  highlights,
  styles,
  copyComponent: CopyComponent = Box,
  copyComponentProps,
  renderHighlight,
}: WizardHeroSectionProps) => {
  const { sx: copySx, ...restCopyProps } = copyComponentProps ?? {};

  const defaultRenderHighlight = (highlight: WizardHeroHighlight) => {
    const Icon = highlight.icon;
    return (
      <Box key={highlight.id} sx={styles.heroHighlight}>
        <Icon {...highlight.iconProps} />
        <Typography component="span" sx={styles.heroHighlightLabel}>
          {highlight.label}
        </Typography>
      </Box>
    );
  };

  return (
    <Box component="section" id={id} sx={styles.heroSection}>
      <Box sx={styles.heroMediaWrap}>
        <Box component="img" src={image.src} alt={image.alt} sx={styles.heroImage} />
        <Box sx={styles.heroOverlay} />
      </Box>
      <Box sx={styles.heroContentWrap}>
        <CopyComponent {...restCopyProps} sx={{ ...(styles.heroCopy ?? {}), ...copySx }}>
          <Typography component="h1" sx={styles.heroTitle}>
            {title}
          </Typography>
          <Typography sx={styles.heroDescription}>{description}</Typography>
          <Box sx={styles.heroHighlights}>
            {highlights.map((highlight) =>
              renderHighlight ? renderHighlight(highlight) : defaultRenderHighlight(highlight),
            )}
          </Box>
        </CopyComponent>
      </Box>
    </Box>
  );
};

export default WizardHeroSection;
