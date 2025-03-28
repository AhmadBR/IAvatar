import React, { useState, useMemo, memo, useRef } from 'react';
import { View, TouchableOpacity, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
import { createAvatar } from "@dicebear/core";
import * as style from '@dicebear/avataaars';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from "@/utils/ThemeContext";

interface AvatarItemsProps {
  corPadrao: string
  parte: string
  nome: string
  muda: (value: string) => void
}

const AvatarItems = memo(function AvatarItems({ corPadrao, parte, nome, muda }: AvatarItemsProps) {
  const { theme } = useTheme();
  const [selecao, setSelecao] = useState<number | null>(null);

  // Memoize the theme color calculation
  const temaInterno = useMemo(() => {
    if (corPadrao === '#FFF') {
      return theme === 'light' ? '#000' : corPadrao;
    } else if (corPadrao === '#000') {
      return theme === 'dark' ? '#FFF' : corPadrao;
    }
    return corPadrao;
  }, [corPadrao, theme]);

  // Memoize the options calculation
  const options = useMemo(() => {
    if (parte === 'Corpo') return [''];

    const dados = style?.schema?.properties?.[parte].items?.enum || [];

    if (nome === 'Chapéus') {
      return dados.slice(0, 7);
    } else if (nome === 'Cabelo') {
      return dados.slice(7);
    }
    return dados;
  }, [parte, nome]);

  // Memoize the avatars generation
  const avatars = useMemo(() => {
    if (!Array.isArray(options)) return [];

    return options.map((option, index) => {
      const avatarOptions = {
        size: 64,
        top: [''],
        eyes: ['default'],
        mouth: ['default'],
        [parte]: [option],
        accessoriesProbability: parte === 'accessories' ? 100 : 0,
        facialHairProbability: parte === 'facialHair' ? 100 : 0,
      };

      return {
        xml: createAvatar(style, avatarOptions).toString(),
        index
      };
    });
  }, [options, parte]);

  const mudarAvatar = (valor: number) => {
    if (valor !== 100) {
      const resultado = options[valor];
      muda(resultado);
    } else {
      muda('');
    }
  };

  const renderItem = ({ item, index }: { item: { xml: string, index: number }, index: number }) => (
    <TouchableOpacity
      onPress={() => {
        setSelecao(index);
        mudarAvatar(nome === 'Cabelo' ? index - 1 : index - 1);
      }}
    >
      <View
        className={`rounded-2xl w-[80] h-[80] m-[6] mx-3 items-center justify-center ${selecao !== index ? "border-[5px]" : ""}`}
        style={{
          borderColor: selecao === index ? 'transparent' : temaInterno,
          backgroundColor: selecao === index ? temaInterno : 'transparent'
        }}
      >
        <SvgXml
          xml={item.xml}
          width="280"
          height="280"
          style={{ transform: [{ scale: 64 / 280 }] }}
        />
      </View>
    </TouchableOpacity>
  );

  if (parte === 'Corpo') return null;


  return (
    <View className="">
      <FlatList className='px-4'
        data={[{ xml: '', index: -1 }, ...avatars]}
        keyExtractor={(item) => item.index.toString()}
        renderItem={({ item, index }) => {
          if (item.index === -1) {
            return (
              <TouchableOpacity onPress={() => { mudarAvatar(100); setSelecao(null) }}>
                <View
                  className="rounded-2xl w-[80] h-[80] mx-2 items-center justify-center"
                  style={{
                    margin: 5,
                    borderColor: temaInterno,
                    borderWidth: 5
                  }}
                >
                  <MaterialIcons name="highlight-remove" size={60} color={temaInterno} />
                </View>
              </TouchableOpacity>
            );
          }
          return renderItem({ item, index });
        }}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center' }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
});

export { AvatarItems };