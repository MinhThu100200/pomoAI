package com.webviewapp.modules


import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.nativemodules.NativeGlobalUtilsModuleSpec


class NativeGlobalUtilsModule(reactContext: ReactApplicationContext) : NativeGlobalUtilsModuleSpec(reactContext) {

    override fun getName() = NAME
    override fun getSystemBarHeight(callback: Callback?) {

    }

    override fun isFoldDevice(callback: Callback?) {

    }

    override fun getInfoFoldableScreen(callback: Callback?) {

    }

    companion object {
        const val NAME = "NativeGlobalUtils"
    }

}