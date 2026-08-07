import { TRANSITION_CATALOG } from '@/lib/transition-catalog';

export function TransitionCount() {
  return <span>{TRANSITION_CATALOG.length}+</span>;
}
