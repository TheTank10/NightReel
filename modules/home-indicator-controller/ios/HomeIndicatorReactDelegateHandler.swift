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
  
  // CRITICAL FIX: Return the actual child that's displaying, not presentedViewController
  public override var childForHomeIndicatorAutoHidden: UIViewController? {
    // Check for presented view controller first (modals, etc.)
    if let presented = presentedViewController {
      return presented
    }
    // Return the first child view controller (where React Native content lives)
    return children.first
  }
  
  // ADDED: Also handle preferredScreenEdgesDeferringSystemGestures for smoother hiding
  public override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge {
    return HomeIndicatorManager.shared.isAutoHidden ? .bottom : []
  }
  
  public override var childForScreenEdgesDeferringSystemGestures: UIViewController? {
    if let presented = presentedViewController {
      return presented
    }
    return children.first
  }
}