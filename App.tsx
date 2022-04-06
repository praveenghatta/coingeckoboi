import React, {useState, useEffect} from 'react';
import CoinList from "./components/CoinList";
import CoinItemDetail from './components/CoinItemDetail';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

const {Navigator, Screen} = createStackNavigator();

export default function App() {
    return(
        <NavigationContainer>
            <Navigator>
                <Screen name="Markets" options={{ title:"Markets"}} component={CoinList} />
                <Screen name="Details" options={{ title:"Coin Details"}} component={CoinItemDetail} />
            </Navigator>
        </NavigationContainer>
    );
}
