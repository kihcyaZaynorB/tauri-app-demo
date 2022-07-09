enum WindowState {
  Minimized = 'Minimized',
  Normal = 'Normal',
  Maximized = 'Maximized'
}

const getWindowState = (key: string) => {
  switch (key) {
    case 'Maximized':
      return WindowState.Maximized;
    default:
      return WindowState.Normal;
  }
};

export { getWindowState };

export default WindowState;
