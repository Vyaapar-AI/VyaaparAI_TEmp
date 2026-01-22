'use client';

import { useMemo } from 'react';

type ThemeConfig = {
  fonts: {
    google: {
      families: Record<string, { wght?: string | string[] }>;
      display: string;
    };
  };
  cssVariables: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

function buildGoogleFontUrl(config: ThemeConfig['fonts']): string {
  const GFONT_API_URL = 'https://fonts.googleapis.com/css2';
  const { families, display } = config.google;

  const familyStrings = Object.entries(families).map(([name, styles]) => {
    let familyString = `family=${name.replace(/\s/g, '+')}`;
    if (styles.wght) {
      familyString += `:wght@${Array.isArray(styles.wght) ? styles.wght.join(';') : styles.wght}`;
    }
    return familyString;
  });

  return `${GFONT_API_URL}?${familyStrings.join('&')}&display=${display}`;
}

function createCssVars(vars: Record<string, string>): string {
    return Object.entries(vars).map(([key, value]) => `${key}:${value};`).join('');
}

export function ThemeStyle({ theme }: { theme: ThemeConfig }) {
  const fontUrl = useMemo(() => buildGoogleFontUrl(theme.fonts), [theme.fonts]);

  const css = useMemo(() => {
    const lightVars = createCssVars(theme.cssVariables.light);
    const darkVars = createCssVars(theme.cssVariables.dark);

    return `
      :root { ${lightVars} }
      .dark { ${darkVars} }
    `;
  }, [theme.cssVariables]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={fontUrl} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}
