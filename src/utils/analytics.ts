export type AnalyticsEvent = {
  name: string;
  payload?: Record<string, unknown>;
};

export const trackEvent = ({ name, payload }: AnalyticsEvent) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${name}`, payload ?? {});
  }
};
