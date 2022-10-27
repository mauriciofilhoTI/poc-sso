import React, { useState, memo } from "react";
import DefaultTemplate from "./Template";
import type { TemplateProps } from "./Template";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import { I18n, KcContextBase, KcProps } from "keycloakify";
import { clsx } from "keycloakify/lib/tools/clsx";
import { TextField, Button, FormGroup, FormControl } from "@mui/material";

export type LoginProps = KcProps & {
  kcContext: KcContextBase.Login;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
  Template?: (props: TemplateProps) => JSX.Element | null;
};

const Login = (props: LoginProps) => {
  const {
    kcContext,
    i18n,
    doFetchDefaultThemeResources = true,
    Template = DefaultTemplate,
    ...kcProps
  } = props;

  const {
    social,
    realm,
    url,
    usernameEditDisabled,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  // NOTE: Override styles from kcProps
  const overrideStyles = {...kcProps};

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  // overrideStyles.styles = undefined;
  overrideStyles.stylesCommon = [];

  return (
    <Template
      {...{ kcContext, i18n, doFetchDefaultThemeResources, ...overrideStyles }}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      // headerNode={msg("doLogIn")}
      headerNode={<h3 style={{textAlign: 'center', margin: '1rem 0'}}>Seja bem vindo</h3>}
      formNode={
        <div id="kc-form">
          <div id="kc-form-wrapper">
            {realm.password && (
              <form
                id="kc-form-login"
                onSubmit={onSubmit}
                action={url.loginAction}
                method="post"
              >
                <FormGroup className='col-12 px-4 m-2'>
                  <div>
                    {(() => {
                      const label = !realm.loginWithEmailAllowed
                        ? "username"
                        : realm.registrationEmailAsUsername
                        ? "email"
                        : "usernameOrEmail";

                      const autoCompleteHelper: typeof label =
                        label === "usernameOrEmail" ? "username" : label;

                      return (
                        <FormControl sx={{marginTop: '.5rem'}} fullWidth>
                          <TextField
                            fullWidth
                            size="medium"
                            tabIndex={1}
                            id={autoCompleteHelper}
                            name={autoCompleteHelper}
                            defaultValue={login.username ?? ""}
                            type="text"
                            autoComplete="off"
                            label={msg(label)}
                            {...(usernameEditDisabled
                              ? { disabled: true }
                              : {
                                  autoFocus: true,
                                  autoComplete: "off",
                                })}
                            variant="outlined"
                          />
                        </FormControl>
                      );
                    })()}
                  </div>

                  <FormControl sx={{marginTop: '.5rem'}} fullWidth>
                    <TextField
                      fullWidth
                      size="medium"
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="off"
                      label={msg("password")}
                      variant="outlined"
                    />
                  </FormControl>
                </FormGroup>
                <div
                  className={clsx(
                    kcProps.kcFormGroupClass,
                    kcProps.kcFormSettingClass
                  )}
                >
                  <div id="kc-form-options">
                    {realm.rememberMe && !usernameEditDisabled && (
                      <div className="checkbox">
                        <label>
                          <input
                            tabIndex={3}
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            {...(login.rememberMe
                              ? {
                                  checked: true,
                                }
                              : {})}
                          />
                          {msg("rememberMe")}
                        </label>
                      </div>
                    )}
                  </div>
                  <div className={clsx(kcProps.kcFormOptionsWrapperClass)}>
                    {realm.resetPasswordAllowed && (
                      <span>
                        <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                          {msg("doForgotPassword")}
                        </a>
                      </span>
                    )}
                  </div>
                </div>
                <div
                  id="kc-form-buttons"
                  className={clsx(kcProps.kcFormGroupClass)}
                >
                  <input
                    type="hidden"
                    id="id-hidden-input"
                    name="credentialId"
                    {...(auth?.selectedCredential !== undefined
                      ? {
                          value: auth.selectedCredential,
                        }
                      : {})}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ fontSize: "16px" }}
                    fullWidth
                    name="login"
                    id="kc-login"
                    type="submit"
                    tabIndex={4}
                    disabled={isLoginButtonDisabled}
                  >
                    {msgStr("doLogIn")}
                  </Button>
                </div>
              </form>
            )}
          </div>
          {realm.password && social.providers !== undefined && (
            <div
              id="kc-social-providers"
              className={clsx(
                kcProps.kcFormSocialAccountContentClass,
                kcProps.kcFormSocialAccountClass
              )}
            >
              <ul
                className={clsx(
                  kcProps.kcFormSocialAccountListClass,
                  social.providers.length > 4 &&
                    kcProps.kcFormSocialAccountDoubleListClass
                )}
              >
                {social.providers.map((p) => (
                  <li
                    key={p.providerId}
                    className={clsx(kcProps.kcFormSocialAccountListLinkClass)}
                  >
                    <a
                      href={p.loginUrl}
                      id={`zocial-${p.alias}`}
                      className={clsx("zocial", p.providerId)}
                    >
                      <span>{p.displayName}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }
      infoNode={
        realm.password &&
        realm.registrationAllowed &&
        !registrationDisabled && (
          <div id="kc-registration">
            <span>
              {msg("noAccount")}
              <a tabIndex={6} href={url.registrationUrl}>
                {msg("doRegister")}
              </a>
            </span>
          </div>
        )
      }
    />
  );
};

export default memo(Login);
