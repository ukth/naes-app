import { colors } from "./colors";

export const styles = {
  borderRadius: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
    full: 100,
  },
  fontSizes: {
    xs: 8,
    sm: 12,
    md: 15,
    lg: 20,
    xl: 27,
    xxl: 30,
  },
  shadow: {
    header: {
      shadowRadius: 15,
      shadowOpacity: 1,
      shadowColor: `rgba(0,0,0,0.5)`,
    },
    md: {
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      shadowColor: `rgba(0,0,0,0.1)`,
      shadowOpacity: 1,
    },
    hard: {
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      shadowColor: `#F00000`,
      shadowOpacity: 0.25,
    },
  },
};

export default styles;
