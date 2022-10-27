
import React, { useReducer, useEffect, memo } from "react";
import type { ReactNode } from "react";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { useConstCallback } from "powerhooks/useConstCallback";
import { I18n, KcContextBase, KcTemplateProps } from "keycloakify";
import { pathJoin } from "keycloakify/bin/tools/pathJoin";
import { headInsert } from "keycloakify/lib/tools/headInsert";
import { clsx } from "keycloakify/lib/tools/clsx";
import { assert } from "keycloakify/lib/tools/assert";
import { Box } from '@mui/material';

export type TemplateProps = {
  displayInfo?: boolean;
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  displayWide?: boolean;
  showAnotherWayIfPresent?: boolean;
  headerNode: ReactNode;
  showUsernameNode?: ReactNode;
  formNode: ReactNode;
  infoNode?: ReactNode;
  /** If you write your own page you probably want
   * to avoid pulling the default theme assets.
   */
  doFetchDefaultThemeResources: boolean;
} & { kcContext: KcContextBase; i18n: I18n } & KcTemplateProps;

const Template = (props: TemplateProps) => {
  const {
    displayInfo = false,
    displayMessage = false,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    formNode,
    infoNode = null,
    kcContext,
    i18n,
    doFetchDefaultThemeResources,
  } = props;

  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n;

  const onChangeLanguageClickFactory = useCallbackFactory(
    ([kcLanguageTag]: [string]) => changeLocale(kcLanguageTag)
  );

  const onTryAnotherWayClick = useConstCallback(
    () => (
      document.forms["kc-select-try-another-way-form" as never].submit(), false
    )
  );

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  const [isExtraCssLoaded, setExtraCssLoaded] = useReducer(() => true, false);

  useEffect(() => {console.log(formNode)
    if (!doFetchDefaultThemeResources) {
      setExtraCssLoaded();
      return;
    }

    let isUnmounted = false;
    const cleanups: (() => void)[] = [];

    const toArr = (x: string | readonly string[] | undefined) =>
      typeof x === "string" ? x.split(" ") : x ?? [];

    Promise.all(
      [
        ...toArr(props.stylesCommon).map((relativePath) =>
          pathJoin(url.resourcesCommonPath, relativePath)
        ),
        ...toArr(props.styles).map((relativePath) =>
          pathJoin(url.resourcesPath, relativePath)
        ),
      ]
        .reverse()
        .map((href) =>
          headInsert({
            type: "css",
            href,
            position: "prepend",
          })
        )
    ).then(() => {
      if (isUnmounted) {
        return;
      }

      setExtraCssLoaded();
    });

    toArr(props.scripts).forEach((relativePath) =>
      headInsert({
        type: "javascript",
        src: pathJoin(url.resourcesPath, relativePath),
      })
    );

    if (props.kcHtmlClass !== undefined) {
      const htmlClassList = document.getElementsByTagName("html")[0].classList;

      const tokens = clsx(props.kcHtmlClass).split(" ");

      htmlClassList.add(...tokens);

      cleanups.push(() => htmlClassList.remove(...tokens));
    }

    return () => {
      isUnmounted = true;

      cleanups.forEach((f) => f());
    };
  }, [props.kcHtmlClass]);

  if (!isExtraCssLoaded) {
    return null;
  }

  return (
    <div className={clsx(props.kcLoginClass)}>
      <div id="kc-header" className={clsx(props.kcHeaderClass)}>
        <div
          id="kc-header-wrapper"
          className={clsx(props.kcHeaderWrapperClass)}
        >
          {msg("loginTitleHtml", realm.displayNameHtml)}
        </div>
      </div>

      {/* CARD */}
      <div style={{borderRadius: '16px', boxShadow: '-4px 4px 16.0742px rgba(0, 41, 123, 0.3)', padding: '1.5rem'}}
        className={clsx(
          props.kcFormCardClass,
          displayWide && props.kcFormCardAccountClass
        )}
      >
        <header className={clsx(props.kcFormHeaderClass)}>
          {realm.internationalizationEnabled &&
            (assert(locale !== undefined), true) &&
            locale.supported.length > 1 && (
              <div id="kc-locale">
                <div
                  id="kc-locale-wrapper"
                  className={clsx(props.kcLocaleWrapperClass)}
                >
                  <div className="kc-dropdown" id="kc-locale-dropdown">
                    <a href="#" id="kc-current-locale-link">
                      {labelBySupportedLanguageTag[currentLanguageTag]}
                    </a>
                    <ul>
                      {locale.supported.map(({ languageTag }) => (
                        <li key={languageTag} className="kc-dropdown-item">
                          <a
                            href="#"
                            onClick={onChangeLanguageClickFactory(languageTag)}
                          >
                            {labelBySupportedLanguageTag[languageTag]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          {!(
            auth !== undefined &&
            auth.showUsername &&
            !auth.showResetCredentials
          ) ? (
            displayRequiredFields ? (
              <div className={clsx(props.kcContentWrapperClass)}>
                <div className={clsx(props.kcLabelWrapperClass, "subtitle")}>
                  <span className="subtitle">
                    <span className="required">*</span>
                    {msg("requiredFields")}
                  </span>
                </div>
                <div className="col-md-10">
                  <h1 id="kc-page-title">{headerNode}</h1>
                </div>
              </div>
            ) : (
              <h1 id="kc-page-title">{headerNode}</h1>
            )
          ) : displayRequiredFields ? (
            <div className={clsx(props.kcContentWrapperClass)}>
              <div className={clsx(props.kcLabelWrapperClass, "subtitle")}>
                <span className="subtitle">
                  <span className="required">*</span> 
                  {msg("requiredFields")}
                </span>
              </div>
              <div className="col-md-10">
                {showUsernameNode}
                <div className={clsx(props.kcFormGroupClass)}>
                  <div id="kc-username">
                    <label id="kc-attempted-username">
                      {auth?.attemptedUsername}
                    </label>
                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                      <div className="kc-login-tooltip">
                        <i className={clsx(props.kcResetFlowIcon)}></i>
                        <span className="kc-tooltip-text">
                          {msg("restartLoginTooltip")}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {showUsernameNode}
              <div className={clsx(props.kcFormGroupClass)}>
                <div id="kc-username">
                  <label id="kc-attempted-username">
                    {auth?.attemptedUsername}
                  </label>
                  <a id="reset-login" href={url.loginRestartFlowUrl}>
                    <div className="kc-login-tooltip">
                      <i className={clsx(props.kcResetFlowIcon)}></i>
                      <span className="kc-tooltip-text">
                        {msg("restartLoginTooltip")}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </header>
        <div id="kc-content">
          <div id="kc-content-wrapper">
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) && (
                <div className={clsx("alert", `alert-${message.type}`)}>
                  {message.type === "success" && (
                    <span className={clsx(props.kcFeedbackSuccessIcon)}></span>
                  )}
                  {message.type === "warning" && (
                    <span className={clsx(props.kcFeedbackWarningIcon)}></span>
                  )}
                  {message.type === "error" && (
                    <span className={clsx(props.kcFeedbackErrorIcon)}></span>
                  )}
                  {message.type === "info" && (
                    <span className={clsx(props.kcFeedbackInfoIcon)}></span>
                  )}
                  <span
                    className="kc-feedback-text"
                    dangerouslySetInnerHTML={{
                      __html: message.summary,
                    }}
                  />
                </div>
              )}
            {formNode}
            {auth !== undefined &&
              auth.showTryAnotherWayLink &&
              showAnotherWayIfPresent && (
                <form
                  id="kc-select-try-another-way-form"
                  action={url.loginAction}
                  method="post"
                  className={clsx(displayWide && props.kcContentWrapperClass)}
                >
                  <div
                    className={clsx(
                      displayWide && [
                        props.kcFormSocialAccountContentClass,
                        props.kcFormSocialAccountClass,
                      ]
                    )}
                  >
                    <div className={clsx(props.kcFormGroupClass)}>
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      <a
                        href="#"
                        id="try-another-way"
                        onClick={onTryAnotherWayClick}
                      >
                        {msg("doTryAnotherWay")}
                      </a>
                    </div>
                  </div>
                </form>
              )}
            {displayInfo && (
              <div id="kc-info" className={clsx(props.kcSignUpClass)}>
                <div
                  id="kc-info-wrapper"
                  className={clsx(props.kcInfoAreaWrapperClass)}
                >
                  {infoNode}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Template);
