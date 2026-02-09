import ExpoModulesCore
import UIKit

public class HomeIndicatorModule: Module {
  public func definition() -> ModuleDefinition {
    Name("HomeIndicator")
    
    OnCreate {
      DispatchQueue.main.async {
        self.swizzleViewController()
      }
    }
  }
  
  private func swizzleViewController() {
    guard let originalMethod = class_getInstanceMethod(
      UIViewController.self,
      #selector(getter: UIViewController.prefersHomeIndicatorAutoHidden)
    ),
    let swizzledMethod = class_getInstanceMethod(
      UIViewController.self,
      #selector(UIViewController.swizzled_prefersHomeIndicatorAutoHidden)
    ) else {
      return
    }
    
    method_exchangeImplementations(originalMethod, swizzledMethod)
  }
}

extension UIViewController {
  @objc dynamic var swizzled_prefersHomeIndicatorAutoHidden: Bool {
    return true
  }
}