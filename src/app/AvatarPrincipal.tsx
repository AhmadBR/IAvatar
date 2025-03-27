import { View, Text, Image, TouchableOpacity, Pressable, ViewProps, ScrollView } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DropDownNovo, { MenuOption } from "@/components/DropdownNovo";
import { useMemo, useState } from "react";
import { cores } from "@/style/cores"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from "@/utils/ThemeContext";
import * as style from '@dicebear/avataaars';
import { createAvatar } from "@dicebear/core";
import { SvgXml } from "react-native-svg";


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
  avatarAtualColor:{
    accessoriesColor: string[];
    clothesColor: string[];
    hatColor: string[];
    hairColor: string[];
    skinColor: string[];
    facialHairColor: string[];
  };
}


const AvatarPrincipal = ({ AlteraCor, valor, avatarAtual, avatarAtualColor }: AvatarPrincipalProps) => {

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

  return (
    <View className="flex justify-start items-center px-6 pt-10 bg-transparent">
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
            <TouchableOpacity>
              <MaterialIcons name="download" size={30} color={modeCor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AvatarPrincipal