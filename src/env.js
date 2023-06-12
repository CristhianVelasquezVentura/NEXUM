(function (window) {
  window.__env = window.__env || {};
  // window.__env.API_AUTH = 'https://auth.nexumsign.com:50060';
  // window.__env.API_DOCUMENT = 'https://documents.nexumsign.com:50051';
  // window.__env.API_WORKFLOW = 'https://workflow.nexumsign.com:50052';
  window.__env.API_BLION = 'https://simbaengine.nexumsign.com:60060';

  //Local
  window.__env.API_AUTH = 'http://127.0.0.1:3051';
  window.__env.API_DOCUMENT = 'http://127.0.0.1:3052';
  window.__env.API_WORKFLOW = 'http://127.0.0.1:3053';

  // QA
  // window.__env.API_AUTH = 'http://172.174.77.149:3051';
  // window.__env.API_DOCUMENT = 'http://172.174.77.149:3052';
  // window.__env.API_WORKFLOW = 'http://172.174.77.149:3053';

  window.__env.API_STRIPE = 'http://localhost:4200';
  window.__env.STIPE_PK = 'http://localhost:4200';

  window.__env.enableDebug = true;
})(this);

