import { platformSelect } from 'nativewind/dist/theme';
import React, {Children, ReactNode, useEffect, useRef, useState} from 'react'
import { Modal, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

export const MenuTrigger = ({children} : {children: ReactNode}) => {
    return <>{children}</>;
}

export const MenuOption = ({
    onSelect,
    children,
}:{
    onSelect: () => void;
    children: ReactNode;
}) => {
    return(
        <TouchableOpacity onPress={onSelect} className='flex items-center p-2 '>
            {children}
        </TouchableOpacity>
    )
}

interface DropDownNovoProps{
    visible: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    trigger: ReactNode;
    children: ReactNode;
    dropdownWidth?: number;
}

const DropDownNovo: React.FC<DropDownNovoProps> = ({
    visible,
    handleOpen,
    handleClose,
    trigger,
    children,
    dropdownWidth = 50,
}) => {

    const triggerRef = useRef<View>(null);
    const [position, setPosition] = useState({x:0, y:0 ,width:0});

    useEffect(()=> {
        if(triggerRef.current && visible){
            triggerRef.current.measure((fx, fy, width, height, px, py) =>{
                setPosition({
                    x: px,
                    y: py + height,
                    width: width,
                });
            });
        }
    },[visible]);

    return(
        <View>
            <TouchableOpacity onPress={handleOpen}>
                    <View ref={triggerRef}>
                        {trigger}
                    </View>
            </TouchableOpacity>
            {visible && (
                <Modal
                transparent={true}
                visible={visible}
                animationType='fade'
                onRequestClose={handleClose}>
                    <TouchableWithoutFeedback onPress={handleClose}>
                        <View className='flex-1  justify-start items-start bg-transparent '>
                            <View 
                                className='w-4 absolute' 
                                style={{...Platform.select({
                                    ios:{
                                        top: position.y + 10
                                    },
                                    android:{
                                        top:position.y - 15
                                    }

                                }),
                                    left: position.x + position.width / 2 - dropdownWidth / 2,
                                    width:dropdownWidth,
                                }}
                            >
                                {children}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
};

export default DropDownNovo;
