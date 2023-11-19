(function (window) {
  window.__env = window.__env || {};
  //window.__env.API_DOCUMENT = "https://nexum-dev-documents.nexumsign.com"; //8002
  //window.__env.API_WORKFLOW = "https://nexum-dev-workflow.nexumsign.com"; //8003
  //window.__env.API_BLION = "https://simbaengine.nexumsign.com:60060"; //pendiente
  //window.__env.API_AUTH = "https://nexum-dev-auth.nexumsign.com"; //8001
  window.__env.API_DOCUMENT = "http://localhost:8003"; //8002
  window.__env.API_WORKFLOW = "http://localhost:8003"; //8003
  window.__env.API_BLION = "https://simbaengine.nexumsign.com:60060"; //pendiente
  window.__env.API_AUTH = "http://localhost:8001"; //8001
  window.__env.API_STRIPE = "http://localhost:4200";
  window.__env.STIPE_PK = "http://localhost:4200";

  window.__env.GOOGLE_RECAPTCHA_SITEKEY = "6LfGknsnAAAAAL74ewfwxkfVTPGQpgKCEQtBvU8g";

  window.__env.enableDebug = true;
})(this);
