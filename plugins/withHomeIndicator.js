const { withAppDelegate } = require('@expo/config-plugins');

const withHomeIndicator = (config) => {
  return withAppDelegate(config, (config) => {
    const { modResults } = config;
    let contents = modResults.contents;

    if (!contents.includes('prefersHomeIndicatorAutoHidden')) {
      const lastBraceIndex = contents.lastIndexOf('}');
      
      const homeIndicatorCode = `
  override var prefersHomeIndicatorAutoHidden: Bool {
    return true
  }
  
  override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge {
    return .all
  }
`;
      
      contents = contents.slice(0, lastBraceIndex) + homeIndicatorCode + contents.slice(lastBraceIndex);
    }

    modResults.contents = contents;
    return config;
  });
};

module.exports = withHomeIndicator;