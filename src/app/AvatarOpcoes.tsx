import { Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { cores } from "@/style/cores";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { partes } from "@/utils/partes";
import { useTheme } from "@/utils/ThemeContext";

interface AvatarOpcoesProps{
  corPadrao:string
  parteAtiva:(parte: string, nome:string, color:string ,tipoCor:string) => void
}

const { branco, preto, cores: cor } = cores;

export function AvatarOpcoes({corPadrao, parteAtiva}:AvatarOpcoesProps) {

  const { theme } = useTheme();

  let temaInterno

  if(corPadrao === '#FFF'){
    if(theme == 'light'){
      temaInterno = '#000'
    }else{
      temaInterno = corPadrao
    }
  }else if(corPadrao === '#000'){
    if(theme == 'dark'){
      temaInterno = '#FFF'
    }else{
      temaInterno = corPadrao
    }
  }else{
    temaInterno = corPadrao
  }

  const [ativo, setAtivo] = useState<string | null>("Cabelo")

  return (
      <View>
        <ScrollView horizontal className="pl-2s mx-6" showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-7 items-center">
            {partes.map((parte) => (
              <TouchableOpacity key={parte.nome} onPress={() => {setAtivo(parte.nome); parteAtiva(parte.tipo, parte.nome, parte.cor, parte.tipoCor)}}>
                <View key={parte.nome} className="items-center justify-end pr-6">
                  <Text className={`${ativo == parte.nome ? "text-lg" : "text-base"} font-bold`} style={{color: temaInterno }}>{parte.nome}</Text>
                  {ativo === parte.nome && <FontAwesome name="circle" size={5} color={temaInterno} />}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => {setAtivo('Corpo'); parteAtiva('Corpo', 'Corpo', 'skinColor', 'pele')}}>
              <View className="items-center justify-end pr-6">
                <Text className={`${ativo == 'Corpo' ? "text-lg" : "text-base"} font-bold`} style={{color: temaInterno}}>Corpo</Text>
                {ativo === 'Corpo' && <FontAwesome name="circle" size={5} color={temaInterno} />}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
  )
}