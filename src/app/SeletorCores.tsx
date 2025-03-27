import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { cores } from "@/style/cores"
import { useState } from "react";
import { useTheme } from "@/utils/ThemeContext";
import { CoresSelecao } from "@/utils/CoresSelecao";

const { branco, preto, cores: cor } = cores;

interface SeletorCoresProps {
  corPadrao: string
  mudarCor: (value: string) => void
  tipoCor: string
}

type TipoCor = keyof typeof CoresSelecao

export function SeletorCores({ corPadrao, mudarCor, tipoCor }: SeletorCoresProps & { tipoCor: TipoCor }) {

  const [alterar, setAlterar] = useState<string>("#00ABBD")

  const { theme } = useTheme();

  let temaInterno

  if (corPadrao === '#FFF') {
    if (theme == 'light') {
      temaInterno = '#000'
    } else {
      temaInterno = corPadrao
    }
  } else if (corPadrao === '#000') {
    if (theme == 'dark') {
      temaInterno = '#FFF'
    } else {
      temaInterno = corPadrao
    }
  } else {
    temaInterno = corPadrao
  }

  function bordaCor(cor: string) {
    if (cor === '#FFF' && theme === 'light') {
      return '#000'
    } else if (cor === '#000' && theme === 'dark') {
      return '#FFF'
    } else {
      return 'transparent'
    }
  }


  return (
    <View className="">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row p-1 pl-2 pr-10 ml-6 mr-6"
      pointerEvents={tipoCor === "inativo" ? "none" : "auto"}
      style={{ opacity: tipoCor === "inativo" ? 0.5 : 1 }}>
      {CoresSelecao[tipoCor].map((cor, index) => (
            <TouchableOpacity key={index} className={`p-1`}
              onPress={() => { setAlterar(cor); mudarCor(cor) }} disabled={tipoCor === "inativo"}>
              <View className=" mr-2 p-4 rounded-full w-[45px] h-[45px] items-center justify-center"
                style={{
                  borderWidth: cor === alterar ? 2 : 0,
                  borderColor: temaInterno
                }}>
                <View key={index} className="w-10 h-10 rounded-full" style={{
                  backgroundColor: cor,
                  borderColor: bordaCor(cor),
                  borderWidth: cor === '#000' || cor === '#FFF' ? 2 : 0
                }}>
                </View>
              </View>
            </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  )
}