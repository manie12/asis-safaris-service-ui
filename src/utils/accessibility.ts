import type { Ref } from 'react';

export const ariaDescribedBy = (ids: string[]) => ids.filter(Boolean).join(' ') || undefined;

export const mergeRefs =
  <T,>(...refs: Array<Ref<T>>) =>
  (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as { current: T | null }).current = instance;
      }
    });
  };
