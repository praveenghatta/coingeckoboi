import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, StyleSheet, TouchableHighlight} from "react-native";
import CoinListItem from "./CoinListItem";

export default function CoinList(props:any){
    //Used for showing whether data is loaded or loading
    const [loading, setLoading] = useState(false);

    //Main holder for data
    const [coins, setCoins] = useState<any>([]);

    //Function to load the coin call ...
    const loadCoins = async() => {
        setLoading(true);
        let selectedCurrency = "eur";
        let perPage = "10";
        let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + selectedCurrency +
            "&order=market_cap_desc&per_page=" + perPage+ "&page=1&sparkline=false";
        const res = await fetch(url);
        const data = await res.json();
        setCoins(data);
        setLoading(false);
    }

    //Default load of the data
    useEffect(()=>{
        loadCoins();
    },[]);

    //Display preloader, till data is loaded.
    if(!coins) return <ActivityIndicator size="small" />;

    return (
        <FlatList style={styles.container} data={coins} renderItem={ ({item}) => {
            return (
                // <CoinListItem data={item}
                //               onPress={() => props.navigation.navigate("Details", {coinId: item.id})} />
                <TouchableHighlight onPress={() => props.navigation.navigate("Details", {coinId: item.id})} underlayColor='#f1c40f'>
                    <CoinListItem data={item} />
                </TouchableHighlight>
            );
        }}>
        </FlatList>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});