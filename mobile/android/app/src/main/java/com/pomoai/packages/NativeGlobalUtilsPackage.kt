package com.webviewapp.packages

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.webviewapp.modules.NativeGlobalUtilsModule

class NativeGlobalUtilsPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if (name == NativeGlobalUtilsModule.NAME) {
            NativeGlobalUtilsModule(reactContext)
        } else {
            null
        }


    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            NativeGlobalUtilsModule.NAME to ReactModuleInfo(
                name = NativeGlobalUtilsModule.NAME,
                className = NativeGlobalUtilsModule.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            )
        )
    }

}