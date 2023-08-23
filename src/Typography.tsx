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
    <h1 className={`font-maven-pro text-4xl font-bold text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </h1>
  )
}

export const H2 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h2 className={`font-maven-pro text-2xl font-bold text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </h2>
  )
}

export const H3 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h3 className={`font-maven-pro text-xl font-bold text-cyan-950  ${baseStyles[theme]}`}>
      {children}
    </h3>
  )
}

export const H4 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h4 className={`font-maven-pro text-lg font-bold text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </h4>
  )
}

export const H5 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h5 className={`font-maven-pro text-base font-bold text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </h5>
  ) 
}

export const H6 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <h6 className={`font-maven-pro text-sm font-bold text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </h6>
  )
}

export const P = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`font-maven-pro text-base text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const P2 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`font-maven-pro text-sm text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const P3 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`font-maven-pro text-xs text-cyan-950 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const Caption = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`font-maven-pro text-xs text-cyan-700 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const ButtonText = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`font-maven-pro text-sm font-bold text-cyan-700 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const ButtonText2 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`font-maven-pro text-xs font-bold text-cyan-700 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}

export const ButtonText3 = ({ children, theme='light' }: TypographyProps) => {
  return (
    <p className={`font-maven-pro text-xs text-cyan-700 ${baseStyles[theme]}`}>
      {children}
    </p>
  )
}
