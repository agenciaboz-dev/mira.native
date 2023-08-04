import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import { WebView } from "react-native-webview"
import { Camera } from "expo-camera"
import { BackHandler } from "react-native"

export default function App() {
    const webViewRef = useRef(null)
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)

    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted")
        })()
    }, [])
    useEffect(() => {
        const backAction = () => {
            // @ts-ignore
            webViewRef.current?.goBack()
            return true
        }

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

        return () => backHandler.remove()
    }, [])

    return (
        <>
            <StatusBar style="auto" />
            <WebView
                ref={webViewRef}
                source={{ uri: "https://app.mirasuprimentos.com.br" }}
                style={{ flex: 1 }}
                allowFileAccess
                mediaCapturePermissionGrantType="grant"
                mediaPlaybackRequiresUserAction={false}
            />
        </>
    )
}
