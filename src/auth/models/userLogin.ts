export interface UserLogin {
  user: string;
  attributes: {
    aplicacionWeb: string[];
    uid: string[];
    mail: string[];
    sn: string[];
    authenticationDate: string[];
    isFromNewLogin: string[];
    givenName: string[];
    longTermAuthenticationRequestTokenUsed: string[];
    displayName: string[];
  };
}
