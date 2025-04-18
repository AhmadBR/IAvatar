import { View, Text, Image, TouchableOpacity, Pressable, ViewProps, ScrollView, Button, SafeAreaView, Share, findNodeHandle, Platform } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DropDownNovo, { MenuOption } from "@/components/DropdownNovo";
import { useMemo, useRef, useState } from "react";
import { cores } from "@/style/cores"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from "@/utils/ThemeContext";
import * as style from '@dicebear/avataaars';
import { createAvatar } from "@dicebear/core";
import { SvgXml } from "react-native-svg";
import Dialog from "react-native-dialog";
import { captureRef } from "react-native-view-shot";
import * as Sharing from 'expo-sharing'; //


interface AvatarPrincipalProps {
  AlteraCor: (value: string) => void;
  avatarAtual: {
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
  avatarAtualColor: {
    accessoriesColor: string[];
    clothesColor: string[];
    hatColor: string[];
    hairColor: string[];
    skinColor: string[];
    facialHairColor: string[];
  };
}


const AvatarPrincipal = ({ AlteraCor, valor, avatarAtual, avatarAtualColor }: AvatarPrincipalProps) => {

  const baixarRef = useRef<View>(null)

  async function baixar() {
    try {
      // 1. Verifica se a referência existe
      if (!baixarRef.current) {
        throw new Error("Referência da view não encontrada");
      }

      // 2. Força renderização (opcional, mas recomendado)
      await new Promise(resolve => requestAnimationFrame(resolve));

      // 3. Captura a view como URI temporária
      const uri = await captureRef(baixarRef, {
        format: 'jpg',
        quality: 1,
      });

      console.log("Arquivo temporário gerado:", uri);

      // 4. Compartilha diretamente (sem verificação de arquivo)
      await Sharing.shareAsync(uri); // Usando expo-sharing
      // OU com Share do React Native:
      // await Share.share({ url: uri });

    } catch (error) {
      console.error("Erro ao baixar:", error);
      Alert.alert("Erro", "Não foi possível gerar a imagem");
    }
  }


  const options = style?.schema?.properties?.top.items?.enum[1];


  const avatars = useMemo(() =>
    createAvatar(style, {
      size: 64,
      ...avatarAtual,
      ...avatarAtualColor,
    }).toString(),
    [avatarAtual, avatarAtualColor]
  );

  const { theme, toggleTheme } = useTheme();

  const { branco, preto, cores: cor } = cores;
  const [visible, setVisible] = useState<boolean>(false)

  const [corInterna, setCorInterna] = useState<string>('#00ABBD')


  const modeCor = corInterna === '#FFF' ? '#000' : '#fff'
  const modeFundo = theme === 'dark' ? 'dark-mode' : 'light-mode'

  const atualizarCor = (novaCor: string) => {
    setCorInterna(novaCor)
    AlteraCor(novaCor)
  }

  const [visible1, setVisible1] = useState(false);

  const abrirDialog = () => {
    setVisible1(true);
  };
  const fecharDialog = () => {
    setVisible1(false);
  };

  return (
    <View className="flex justify-start items-center px-6 pt-10 bg-transparent">
      <SafeAreaView className="flex items-center justify-center">
        <View className=" justify-center items-center">
          <Dialog.Container visible={visible1} 
          contentStyle={{ 
              borderRadius: 24, margin: 10, ...Platform.select({
                ios:{
                  width:380
                }
              })
            }}>
            <Dialog.Title style={{color:'black'}} className="p-3 text-center text-black">Baixar avatar</Dialog.Title>
            <Dialog.Description className="flex items-center justify-center p-auto bg-black" 
            style={{
              ...Platform.select({
                android:{
                  margin: -18
                }
              })

            }}>
              <View ref={baixarRef} className="flex justify-center items-center bg-black w-full h-[400]" 
              style={{ 
                  backgroundColor: corInterna,
                    ...Platform.select({
                      ios:{
                        paddingVertical:0
                      },

                    })
                  }} 
                  collapsable={false}>
                <View className="items-center self-center justify-center">
                  <View className="">
                    <SvgXml
                      xml={avatars}
                      width="280"
                      height="280"
                      style={{
                        transform: [{ scale: 280 / 280 }], // Escala para 64x64
                      }}
                    />
                  </View>

                </View>
              </View>
            </Dialog.Description>
            <View className="flex flex-row justify-center items-center gap-3 p-4" >
              <TouchableOpacity className="flex-1 p-2 rounded-lg bg-slate-300" onPress={fecharDialog}>
                <Text className="font-semibold text-center ">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 p-2  rounded-lg" style={{ backgroundColor: corInterna }} onPress={baixar}>
                <Text className="text-white font-semibold text-center">Baixar</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Container>
        </View>
      </SafeAreaView>

      <View className="flex h-[380] w-full rounded-2xl" style={{ backgroundColor: corInterna }}>
        <View className="flex-col justify-center items-center">
          <View className="flex-row justify-between px-4 pt-4 w-full">
            <TouchableOpacity onPress={toggleTheme}>
              <MaterialIcons name={modeFundo} size={30} color={modeCor} />
            </TouchableOpacity>

            <View className="">
              <DropDownNovo
                visible={visible}
                handleOpen={() => setVisible(true)}
                handleClose={() => setVisible(false)}
                trigger={
                  <View className="">
                    <MaterialCommunityIcons name="palette-swatch" size={30} color={modeCor} />
                  </View>
                }>
                <View className=" bg-white rounded-xl items-center py-3">
                  <ScrollView className="h-64" showsVerticalScrollIndicator={false}>
                    {Object.entries(cor).map(([key, cor]) => (
                      <TouchableOpacity key={key} className={`p-1`}
                        onPress={() => { atualizarCor(cor); setVisible(false) }}>
                        <View key={key} className="w-8 h-8  rounded-full" style={{
                          backgroundColor: cor,  // Define a cor diretamente
                          borderWidth: cor === "#FFF" || cor === corInterna ? 2 : 0,
                          borderColor: cor === "#000" ? corInterna : 'Black'
                        }}>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

              </DropDownNovo>

            </View>
          </View>

          <View className="">
            <SvgXml
              xml={avatars}
              width="280"
              height="280"
              style={{
                transform: [{ scale: 280 / 280 }], // Escala para 64x64
              }}
            />
          </View>

          <View className="flex-row w-full justify-end px-4 pt-4">
            <TouchableOpacity onPress={abrirDialog}>
              <MaterialIcons name="download" size={30} color={modeCor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AvatarPrincipal