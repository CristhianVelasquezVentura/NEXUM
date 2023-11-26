export class EnvService {
  // The values that are defined here are the default values overridden by env.js
  public API_DOCUMENT: string = '';
  public API_WORKFLOW: string = '';
  public API_AUTH: string = '';
  public API_ENGINE: string = '';
  public API_BLION: string = '';
  public API_STRIPE: string = '';
  public STIPE_PK: string = '';
  public GOOGLE_RECAPTCHA_SITEKEY: string = '';

  public enableDebug = true;

  constructor() {
  }
}
