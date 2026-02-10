import ExpoModulesCore
import UIKit

public class HomeIndicatorControllerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("HomeIndicatorController")
    
    Function("setAutoHidden") { (autoHidden: Bool) in
      DispatchQueue.main.async {
        HomeIndicatorManager.shared.setAutoHidden(autoHidden)
      }
    }
  }
}

public class HomeIndicatorManager {
  public static let shared = HomeIndicatorManager()
  private var shouldAutoHide = false
  
  public func setAutoHidden(_ autoHidden: Bool) {
    shouldAutoHide = autoHidden
    
    // CRITICAL FIX: Update ALL windows and their entire view controller hierarchies
    DispatchQueue.main.async {
      if #available(iOS 13.0, *) {
        UIApplication.shared.connectedScenes
          .compactMap { $0 as? UIWindowScene }
          .flatMap { $0.windows }
          .forEach { window in
            self.updateViewController(window.rootViewController)
          }
      } else {
        UIApplication.shared.windows.forEach { window in
          self.updateViewController(window.rootViewController)
        }
      }
    }
  }
  
  // CRITICAL: Recursively update entire view controller hierarchy
  private func updateViewController(_ viewController: UIViewController?) {
    guard let vc = viewController else { return }
    
    // Update this view controller
    vc.setNeedsUpdateOfHomeIndicatorAutoHidden()
    vc.setNeedsUpdateOfScreenEdgesDeferringSystemGestures()
    
    // Update all children (critical for React Native/Navigation)
    vc.children.forEach { child in
      updateViewController(child)
    }
    
    // Update presented view controllers (modals, etc.)
    if let presented = vc.presentedViewController {
      updateViewController(presented)
    }
  }
  
  public var isAutoHidden: Bool {
    return shouldAutoHide
  }
}