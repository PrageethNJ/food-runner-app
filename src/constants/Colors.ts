const tintColorLight = '#ff6347'; // Tomato Red
const tintColorDark = '#B22222'; // Firebrick (Dark Red)

export default {
  light: {
    text: '#333', // Dark Gray
    background: '#f5f5f5', // Light Gray
    tint: tintColorLight,
    tabIconDefault: '#8a8a8a', // Medium Gray
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FAFAFA', // Very Light Gray for high contrast
    background: '#1A1A1A', // Very Dark Gray, almost black
    tint: tintColorDark,
    tabIconDefault: '#777777', // Medium Gray for unselected icons
    tabIconSelected: tintColorDark, // Dark Red for selected icons
  },
  }



/*
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
*/
