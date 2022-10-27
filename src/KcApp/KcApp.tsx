import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import KcAppBase, { defaultKcProps, getKcContext } from "keycloakify";
import { useI18n } from "./i18n";
import { ThemeContextProvider } from "./ThemeProvider";

import './global.css';

const Register = lazy(() => import("./Register"));
const Terms = lazy(() => import("./Terms"));
const Login = lazy(() => import("./Login"));

export type Props = {
  kcContext: KcContext;
};

export default function KcApp({ kcContext }: Props) {
  const i18n = useI18n({ kcContext });

  //NOTE: Locales not yet downloaded
  if (i18n === null) {
    return null;
  }

  const props = {
    i18n,
    ...defaultKcProps,
    // NOTE: The classes are defined in ./KcApp.css
    kcHeaderWrapperClass: "my-color my-font",
  };

  console.log(defaultKcProps)
  return (
    <ThemeContextProvider>
      <Suspense>
        {(() => {
            console.log(kcContext.realm)
          switch (kcContext.pageId) {
            case "login.ftl":
              return kcContext.realm.name === 'master' ? <Login {...{ kcContext, ...props }} /> : <div> HELLO WORLD </div>;
            case "register.ftl":
              return <Register {...{ kcContext, ...props }} />;
            case "terms.ftl":
              return <Terms {...{ kcContext, ...props }} />;
            // case "login-reset-password.ftl":
            //   return 
            default:
              return <KcAppBase {...{ kcContext, ...props }} />;
          }
        })()}
      </Suspense>
    </ThemeContextProvider>
  );
}
