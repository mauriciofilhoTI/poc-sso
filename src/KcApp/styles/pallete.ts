const PRIMARY = {
    main: '#00297B'
  };
  
  const PRIMARY_DARK = {
    main: '#1679B7'
  };
  
  const SECONDARY = {
    main: '#BD9966'
  };
  
  const SECONDARY_DARK = {
    main: '#C49F6A'
  };
  
  const BACKGROUND = {
    default: '#FFFFFF',
    paper: '#FAFAFA'
  };
  
  const BACKGROUND_DARK = {
    default: '#141515',
    paper: '#1f2021'
  };
  
  const TEXT = {
    primary: '#191919'
  };
  
  const TEXT_DARK = {
    primary: '#FAFAFA'
  };
  
  const INFO = {
    lighter: '#D9EFFD',
    light: '#33ABF5',
    main: '#095C90',
    dark: '#075180',
    darker: '#042B43'
  };
  
  const INFO_DARK = {
    lighter: '#D9EFFD',
    light: '#A7DCFD',
    main: '#6BC6FF',
    dark: '#42B7FF',
    darker: '#3AACF2'
  };
  
  const SUCCESS = {
    lighter: '#CBFFC2',
    light: '#30F20D',
    main: '#1FCC00',
    dark: '#138000',
    darker: '#116D00'
  };
  
  const SUCCESS_DARK = {
    lighter: '#CBFFC2',
    light: '#30F20D',
    main: '#21DB00',
    dark: '#1FCF00',
    darker: '#1DBF00'
  };
  
  const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E'
  };
  
  const ERROR_DARK = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E'
  };
  
  const WARNING = {
    lighter: '#FFEA9F',
    main: '#FFD950',
    light: '#DDB833',
    dark: '#AA8A19',
    darker: '#775F08'
  };
  
  const WARNING_DARK = {
    lighter: '#FFEA9F',
    main: '#FFD950',
    light: '#DDB833',
    dark: '#AA8A19',
    darker: '#775F08'
  };
  
  const GRAY = {
    100: '#F5F5F5',
    200: '#E8E8E8',
    300: '#A3A3A3',
    400: '#636363',
    500: '#666666',
    600: '#737373',
    700: '#292929',
    900: '#191919'
  };
  
  const GRAY_DARK = {
    100: '#191919',
    300: '#292929',
    400: '#737373',
    500: '#E6E6E6',
    600: '#DBDBDB',
    700: '#F5F5F5',
    800: '#E8E8E8',
    900: '#FAFAFA'
  };
  
  const COMMON = {
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY, contrastText: '#fff' },
    secondary: { ...SECONDARY, contrastText: '#14151f' },
    info: { ...INFO, contrastText: '#14151f' },
    success: { ...SUCCESS, contrastText: '#14151f' },
    warning: { ...WARNING, contrastText: '#14151f' },
    error: { ...ERROR, contrastText: '#14151f' },
    grey: GRAY
  };
  
  const COMMON_DARK = {
    common: { black: '#FAFAFA', white: '#141515' },
    primary: { ...PRIMARY_DARK, contrastText: '#fff' },
    secondary: { ...SECONDARY_DARK, contrastText: '#14151f' },
    info: { ...INFO_DARK, contrastText: '#14151f' },
    success: { ...SUCCESS_DARK, contrastText: '#14151f' },
    warning: { ...WARNING_DARK, contrastText: '#14151f' },
    error: { ...ERROR_DARK, contrastText: '#14151f' },
    grey: GRAY_DARK
  };
  
  export const palette = {
    light: {
      mode: 'light',
      ...COMMON,
      text: TEXT,
      background: { ...BACKGROUND }
    },
    dark: {
      mode: 'dark',
      ...COMMON_DARK,
      text: TEXT_DARK,
      background: { ...BACKGROUND_DARK }
    }
  } as const;