import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import { WebView } from "react-native-webview"
import { Camera } from "expo-camera"
import { BackHandler } from "react-native"

export default function App() {
    const webViewRef = useRef(null)
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [reRender, setReRender] = useState(0)
    

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
            <StatusBar style="dark" />
            <WebView
                ref={webViewRef}
                source={{ uri: "https://app.mirasuprimentos.com.br" }}
                style={{ flex: 1 }}
                allowFileAccess
                mediaCapturePermissionGrantType="grant"
                mediaPlaybackRequiresUserAction={false}
                textZoom={100}
                onMessage={() => setReRender(reRender + 1)}
            />
        </>
    )
}
