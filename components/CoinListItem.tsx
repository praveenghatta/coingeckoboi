import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView, StyleSheet,
    Text, View
} from "react-native";
import React, {useEffect, useState} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function CoinListItem(props:any){

    //Used for showing whether data is loaded or loading
    const [loading, setLoading] = useState(false);

    //Function to load the coin call ...
    const loadDetail = async() => {
        setLoading(true);
        await Image.prefetch(props.data.image);
        setLoading(false);
    }

    //Default load of the data
    useEffect(()=>{
        loadDetail();
    },[]);

    //Display preloader, till Image is loaded.
    if(loading) return <ActivityIndicator size="small" />;

    //Break the code visually into two parts assuming as 1:3 column panels.
    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={loading} onRefresh={loadDetail} />}>
            <View style={styles.eachItem}>
                <Image
                    style={styles.img}
                    source={{ uri: props.data.image}}
                />
                <View style={styles.otherContent}>
                    <Text style={styles.paragraph}>{props.data.name}{" "}
                        (<Text style={styles.symbol} >{props.data.symbol}</Text>)
                    </Text>
                    <Text style={styles.paragraph}>Current Price : {props.data.current_price} <MaterialCommunityIcons name="currency-eur" size={14} color="black" /></Text>
                    <Text style={styles.paragraph}>High 24 hour Price : {props.data.high_24h} <MaterialCommunityIcons name="currency-eur" size={14} color="black" /></Text>
                    <Text style={styles.paragraph}>Low 24 hour Price : {props.data.low_24h} <MaterialCommunityIcons name="currency-eur" size={14} color="black" /></Text>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 20,
    },
    eachItem : {
        flexDirection:"row",
        borderBottomColor: '#fd7000',
        paddingTop: 10,
        borderBottomWidth: 2,
        paddingBottom: 10,
        backgroundColor: "#eaeffd",
        borderRadius: 5,
        marginBottom: 10
    },
    otherContent:{
        flex: 4
    },
    id: {
        textTransform:"capitalize",
        color: "#0074cc"
    },
    symbol:{
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    externalUrl: {
        color: '#E91E63',
        textDecorationLine: 'underline'
    },
    img : {
        resizeMode: 'contain',
        alignSelf: 'center',
        width:57,
        height: 50,
        flex: 1
    },
    description:{
        padding: 10
    },
    paragraph: {

    },
});