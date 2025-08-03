import { Pane } from 'tweakpane';

declare global {
  interface Window {
    Pane: typeof Pane;
  }
}