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
    // Trigger update on the root view controller
    if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
      windowScene.windows.forEach { window in
        window.rootViewController?.setNeedsUpdateOfHomeIndicatorAutoHidden()
      }
    }
  }
  
  public var isAutoHidden: Bool {
    return shouldAutoHide
  }
}