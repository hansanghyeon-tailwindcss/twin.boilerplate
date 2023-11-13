import React, { Fragment, createContext, useEffect, useRef, useState } from 'react';
import { Route, RouterProvider, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RouteWithChildrenInterface } from './routing-interface';
import router from './router';
import { useTranslation } from 'react-i18next';
import { getDefaultLanguage } from './router-helper';
import App from 'App';
import { isAuthenticated } from 'constants/helpers';

export const LocaleContext = createContext({
  locale: '',
  // eslint-disable-next-line
  setLocale: (newLocale: string) => {},
});

export const LangRouter = () => {
  const { i18n } = useTranslation()
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const availableLocales = ['en', 'ar']
  const defaultLocale = (
    getDefaultLanguage() === 'en' || getDefaultLanguage() === 'ko' ? getDefaultLanguage() : 'ko'
  ) as string
  const pathnameLocale = pathname.substring(1, 3).toLowerCase()
  const [locale, setLocale] = useState(defaultLocale)
  const loaderTimerRef = useRef<any>()
  const [isLoading, setIsLoading] = useState(true);
  //set body direction
  document.body.dir = i18n.dir(i18n.language);

  useEffect(() => {
    loaderTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(loaderTimerRef.current);
    }, 300);
  }, []);

  useEffect(() => {
    if (availableLocales.includes(pathnameLocale)) {
      updateLocale(pathnameLocale);
    } else if (pathname === '/') {
      updateLocale(defaultLocale);
    }
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    let lang = defaultLocale;

    if (availableLocales.includes(pathnameLocale)) {
      lang = pathnameLocale;
      setLanguageHandler(lang);
    } else if (pathname === '/') {
      setLanguageHandler(lang);
    }
    // eslint-disable-next-line
  }, [locale]);

  const setLanguageHandler = (lang: string) => {
    //set language attribute on HTML element
    document.documentElement.setAttribute('lang', lang);

    if (lang === 'en') {
      i18n.changeLanguage('en-US');
    } else {
      i18n.changeLanguage('ar-SA');
    }
  };

  const updateLocale = (newLocale: string) => {
    const newPath = `/${newLocale}` + pathname.substring(3);

    if (locale !== newLocale) {
      if (newPath === `/${newLocale}/` || newPath === `/${newLocale}` || pathname === '/') {
        navigate(`/${newLocale}/home`);
      } else {
        navigate(`${newPath}${hash}${search}`);
      }
      setLocale(newLocale);
    } else if (newPath === `/${newLocale}/` || newPath === `/${newLocale}` || pathname === '/') {
      if (isAuthenticated()) {
        navigate(`/${newLocale}/home`);
      } else {
        navigate(`/${newLocale}/login`);
      }
    }
  };

  const renderRouteWithChildren = (routes: RouteWithChildrenInterface[]) => {
    return routes.map((route) => (
      // @ts-ignore
      <Route key={route.path(locale) as string} path={route.path(locale)} element={route.element}>
        {route.children && renderRouteWithChildren(route.children)}
      </Route>
    ));
  };

  if (isLoading) {
    return (
      <div>
        loading
      </div>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: updateLocale }}>
      <Routes>
        <Route path={`/${locale}`} element={<App />}>
          {renderRouteWithChildren(router)}
        </Route>
        <Route path="*" element={<div>not found page</div>} />
      </Routes>
    </LocaleContext.Provider>
  );
}
