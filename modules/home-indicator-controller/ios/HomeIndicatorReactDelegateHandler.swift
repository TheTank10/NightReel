import ExpoModulesCore
import UIKit

public class HomeIndicatorReactDelegateHandler: ExpoReactDelegateHandler {
  public override func createRootViewController() -> UIViewController? {
    return HomeIndicatorRootViewController()
  }
}

public class HomeIndicatorRootViewController: UIViewController {
  public override var prefersHomeIndicatorAutoHidden: Bool {
    return HomeIndicatorManager.shared.isAutoHidden
  }
  
  public override var childForHomeIndicatorAutoHidden: UIViewController? {
    return presentedViewController
  }
}