import {JwtHelperService} from '@auth0/angular-jwt';
export const onlyNumbers = (value: any) => {
  const key = value.charCode;
  return key >= 48 && key <= 57;
};

const helper = new JwtHelperService();

export const getTokenUser = (token: string) => {
  let user: any;
  if (token) {
    user = helper.decodeToken(token);
  }
  return user;
}

export const isInvalidToken = (token: string) => {
  if (token) {
      return helper.isTokenExpired(token);
  } else {
    return true;
  }
}

export const getTokenExpirationDate = (token: string) => {
  let expirationDate: any;
  if (token) {
    expirationDate = helper.getTokenExpirationDate(token);
  }
  return expirationDate;
}

export const GetExtensionOfBase64 = (base64: string): string => {
  const signatures = {
    pdf: "application/pdf",
    gif: "image/gif",
    gif2: "image/gif",
    png: "image/png",
    jpg: "image/jpg"
  };
  if (base64.indexOf('JVBERi0') !== -1) return signatures.pdf;
  if (base64.indexOf('R0lGODdh') !== -1) return signatures.gif;
  if (base64.indexOf('R0lGODlh') !== -1) return signatures.gif2;
  if (base64.indexOf('iVBORw0KGgo') !== -1) return signatures.png;
  if (base64.indexOf('/9j/') !== -1) return signatures.jpg;
  return 'image/jpg';
}
