declare global {
  interface Window {
    gapi: any;
    FB: any;
    fbAsyncInit: () => void;
  }
}

export {};
