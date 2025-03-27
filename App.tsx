import "./global.css"

import { StatusBar } from 'expo-status-bar';
import { AvatarOpcoes } from "@/app/AvatarOpcoes";
import { AvatarItems } from "@/app/AvatarItems";
import { View } from "react-native";
import { SeletorCores } from "@/app/SeletorCores";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import AvatarPrincipal from "@/app/AvatarPrincipal";
import { ThemeProvider, useTheme } from "@/utils/ThemeContext";
import Index from "@/app/Index";

export default function App() {
  const [corPadrao, setCorPadrao] = useState<string>("#00ABBD")


  function verificarCor(cor:string){
    setCorPadrao(cor)
  }
  
  return (
    <>
    <SafeAreaProvider>
        <ThemeProvider>
          <Index/>
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}