import { getKcContext } from "keycloakify/lib/getKcContext";

export const { kcContext } = getKcContext({
  // Uncomment to test the login page for development.
  mockPageId: "login.ftl",
  mockData: [
    {
      pageId: "login.ftl",
      locale: {
        //When we test the login page we do it in french
        currentLanguageTag: "pt-BR",
      },
      realm: {
        displayName: 'Kingspan Isoeste SSO',
       internationalizationEnabled: true,
       displayNameHtml: '<div style=\"color: #fefefe; font-weight: bold\"><span>Kingspan Isoeste SSO</span></div>' ,
       loginWithEmailAllowed: true,
       name: 'master',
       password: true,
       registrationAllowed: true,
       registrationEmailAsUsername: true,
       rememberMe: true,
       resetPasswordAllowed: true,
      },
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
