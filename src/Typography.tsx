interface TypographyProps {
  theme?: 'light' | 'dark';
  children: React.ReactNode;
}

const baseStyles = {
  light: 'text-black',
  dark: 'text-white',
};

export const H1 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h1 className={`text-4xl font-bold ${baseStyles[theme]}`}>
      {children}
    </h1>
  )
}

export const H2 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h2 className={`text-2xl font-bold ${baseStyles[theme]}`}>
      {children}
    </h2>
  )
}

export const H3 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h3 className={`text-xl font-bold ${baseStyles[theme]}`}>
      {children}
    </h3>
  )
}

export const H4 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h4 className={`text-lg font-bold ${baseStyles[theme]}`}>
      {children}
    </h4>
  )
}

export const H5 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h5 className={`text-base font-bold ${baseStyles[theme]}`}>
      {children}
    </h5>
  ) 
}

export const H6 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h6 className={`text-sm font-bold ${baseStyles[theme]}`}>
      {children}
    </h6>
  )
}

export const P = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`text-base ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const P2 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`text-sm ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const P3 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`text-xs ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const Caption = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`text-xs text-gray-500 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}