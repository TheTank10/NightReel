const { withAppDelegate } = require('@expo/config-plugins');

function withHiddenHomeIndicator(expoConfig) {
  return withAppDelegate(expoConfig, (config) => {
    const { modResults } = config;
    const { contents } = modResults;
    const lines = contents.split('\n');

    const importIndex = lines.findIndex((line) => /^#import "AppDelegate.h"/.test(line));

    modResults.contents = [
      '#import <objc/runtime.h>',
      ...lines.slice(0, importIndex + 1),
      ...lines.slice(importIndex + 1),
      '@implementation UIViewController (Swizzling)',
      '+ (void)load',
      '{',
      '    static dispatch_once_t onceToken;',
      '    dispatch_once(&onceToken, ^{',
      '        Class classVC = [self class];',
      '        SEL originalSelector = @selector(prefersHomeIndicatorAutoHidden);',
      '        SEL swizzledSelector = @selector(swizzledPrefersHomeIndicatorAutoHidden);',
      '        Method originalMethod = class_getInstanceMethod(classVC, originalSelector);',
      '        Method swizzledMethod = class_getInstanceMethod(classVC, swizzledSelector);',
      '        const BOOL didAdd = class_addMethod(classVC, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));',
      '        if (didAdd)',
      '            class_replaceMethod(classVC, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));',
      '        else',
      '            method_exchangeImplementations(originalMethod, swizzledMethod);',
      '    });',
      '}',
      '- (BOOL)prefersHomeIndicatorAutoHidden {',
      '    return YES;',
      '}',
      '- (BOOL)swizzledPrefersHomeIndicatorAutoHidden {',
      '    return YES;',
      '}',
      '@end',
    ].join('\n');

    return config;
  });
}

module.exports = withHiddenHomeIndicator;