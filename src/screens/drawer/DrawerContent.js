import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
    Drawer
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { default as Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../context/context';




export function DrawerContent({ progress, navigation, ...props }) {


    const { signOut } = React.useContext(AuthContext);


    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView

                showsVerticalScrollIndicator={false} {...props}>
                <Animated.View style={styles.drawerContent}>


                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="home" color="gray" size={20} />
                            )}
                            label="Home"
                            labelStyle={{  fontsize: 11 }}
                            onPress={() => { navigation.navigate('HomeScreen') }}
                        />

                        <DrawerItem

                            icon={({ color, size }) => (
                                <Feather name="plus" color="gray" size={20} />
                            )}
                            label="Add Quiz"
                            labelStyle={{  fontsize: 11 }}
                            onPress={() => { navigation.navigate('InsertForm') }}
                        />

                    </Drawer.Section>

               

                </Animated.View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feather name="log-out" color="gray" size={20} />
                    )}
                    label="Sair"
                    labelStyle={{  }}
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent:
    {
        flex: 1,
    },
    userInfoSection:
    {
        paddingLeft: 20,
    },
    title:
    {
        fontSize: 16,
        marginTop: 3,
    },
    caption:
    {
        fontSize: 14,
        lineHeight: 14,
        
    },
    row:
    {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph:
    {
        
        marginRight: 3,
    },
    drawerSection:
    {
        marginTop: 15,
    }
    , bottomDrawerSection:
    {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }
    , preference:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,

    },
});