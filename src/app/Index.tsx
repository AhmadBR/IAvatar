import { SafeAreaProvider } from "react-native-safe-area-context";
import AvatarPrincipal from "./AvatarPrincipal";
import { AvatarOpcoes } from "./AvatarOpcoes";
import { SeletorCores } from "./SeletorCores";
import { AvatarItems } from "./AvatarItems";
import { FlatList, ScrollView, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/ThemeContext";


type AvatarConfig = {
  top: [string];
  accessories: [string];
  clothing: [string];
  eyebrows: [string];
  facialHairProbability: number;
  accessoriesProbability: number;
  facialHair: [string];
  mouth: [string];
  eyes: [string];
};

type AvatarConfigColor = {
  accessoriesColor: string[];
  clothesColor: string[];
  hatColor: string[];
  hairColor: string[];
  skinColor: string[];
  facialHairColor: string[];
}

export default function Index() {
  const [corPadrao, setCorPadrao] = useState<string>("#00ABBD")

  const [parte, setParte] = useState<string>('top')

  const [cor, setCor] = useState<string>('hairColor')

  const [nome, setNome] = useState<string>('Cabelo')

  const [tipoCor, setTipoCor] = useState<string>('cabelo')


  const { theme } = useTheme();

  function verificarCor(cor: string) {
    setCorPadrao(cor)
  }

  function verificarParte(tipo: string, nome: string, cor: string, tipoCor: string) {
    setParte(tipo)
    setNome(nome)
    setCor(cor)
    setTipoCor(tipoCor)
  }


  const [avatarConfigColor, setAvatarConfigColor] = useState<AvatarConfigColor>({
    accessoriesColor: ['000000'],
    clothesColor: ['343332'],
    hatColor: ['000000'],
    hairColor: ['2D1B18'],
    skinColor: ['EDB989'],
    facialHairColor: ['2D1B18']
  });

  // // Sempre que hairColor mudar, hatColor será atualizado
  // useEffect(() => {
  //   setAvatarConfigColor(prev => ({
  //     ...prev,
  //     hatColor: [...hairColor] // Copia o array corretamente
  //   }));
  // }, [hairColor]);

  const updateColor = (value: String) => {

    const resultado: string = value.split('#').join('');

    setAvatarConfigColor(prev => ({
      ...prev,
      [cor]: [resultado]
    }))
  }



  const updatePart = (part: string, value: string) => {
    setAvatarConfig(prev => ({
      ...prev,
      [part]: [value] // Garante que o valor seja um array
    }));
  };

  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    top: ['dreads01'],
    accessories: ['prescription01'],
    clothing: ['blazerAndSweater'],
    eyebrows: ['default'],
    facialHairProbability: 90,
    accessoriesProbability: 90,
    facialHair: ['beardMajestic'],
    mouth: ['default'],
    eyes: ['default'],
  });

  return (
    <>
      <SafeAreaProvider>
        <View className={`flex-1 flex-col gap-4 ${theme === 'dark' ? "bg-black" : "bg-white"} `}>
          <AvatarPrincipal AlteraCor={verificarCor} avatarAtual={avatarConfig} avatarAtualColor={avatarConfigColor} />
          <AvatarOpcoes corPadrao={corPadrao} parteAtiva={verificarParte} />
          <FlatList
            data={[{ id: 'colors', component: 'SeletorCores' }, { id: 'avatars', component: 'AvatarItems' }]}
            renderItem={({ item }) => (
              item.component === 'SeletorCores'
                ? <SeletorCores corPadrao={corPadrao} mudarCor={updateColor} tipoCor={tipoCor} />
                : <AvatarItems corPadrao={corPadrao} parte={parte} nome={nome} muda={(valor) => updatePart(parte, valor)} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <StatusBar style={theme === 'dark' ? "light" : "dark"} />
      </SafeAreaProvider>
    </>
  );
}