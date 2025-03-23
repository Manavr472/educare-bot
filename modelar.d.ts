import React from 'react';

// Create proper type definitions for model-viewer
export type ModelViewerAttributes = {
  src?: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'camera-controls'?: boolean;
  'tone-mapping'?: string;
  poster?: string;
  'shadow-intensity'?: string;
};

// Extend HTMLElement with required model-viewer props
export interface ModelViewerElement extends HTMLElement {
  loading: boolean;
}

// Define the progress event interface
export interface ModelViewerProgressEvent extends Event {
  detail: {
    totalProgress: number;
  };
}

// Augment the JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & ModelViewerAttributes,
        HTMLElement
      >;
    }
  }
}