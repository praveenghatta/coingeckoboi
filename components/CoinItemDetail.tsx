import {
    ActivityIndicator,
    Image, Linking,
    RefreshControl,
    SafeAreaView,
    ScrollView, StyleSheet,
    Text,
    useWindowDimensions, View
} from "react-native";
import React, {useEffect, useState} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import HTML from "react-native-render-html";

export default function CoinItemDetail(props:any){

    //Used for fitting the image
    const contentWidth = useWindowDimensions().width;

    //Used for showing whether data is loaded or loading
    const [loading, setLoading] = useState(false);

    //Main holder for data
    const [detail, setDetail] = useState<any>();

    //Function to load the coin call ...
    const loadDetail = async() => {
        setLoading(true);
        let selectedCoin = props.route.params.coinId;
        let url = "https://api.coingecko.com/api/v3/coins/" + selectedCoin;
        const res = await fetch(url);
        const data = await res.json();
        await Image.prefetch(data.image.small);
        setDetail(data);
        setLoading(false);
    }

    //Default load of the data
    useEffect(()=>{
        loadDetail();
    },[]);

    //Display preloader, till data is loaded.
    if(!detail) return <ActivityIndicator size="large" />;

    const description = detail.description.en;

    function algoText(algo:string){
        if(algo != null){
            return <Text style={styles.paragraph}>Algorithm: {detail.hashing_algorithm}</Text>
        }
    }

    return (<SafeAreaView style={styles.container}>
        <ScrollView
            refreshControl={<RefreshControl refreshing={loading} onRefresh={loadDetail} />}>
            <Image
                style={styles.largeImg}
                source={{ uri: detail.image.large}}
            />

            <View style={styles.otherContent}>
                <Text style={styles.id} onPress={ ()=> Linking.openURL(detail.links.homepage) }>{detail.id}{" "}
                    (<Text style={styles.symbol} >{detail.symbol}</Text>)
                </Text>
                {algoText(detail.hashing_algorithm)}
                <Text style={styles.paragraph}>Market Cap: {detail.market_data.current_price.eur}
                    <MaterialCommunityIcons name="currency-eur" size={14} color="black" />
                </Text>
            </View>
            <View style={styles.description}>
                <HTML source={{html : description}} contentWidth={contentWidth} />
            </View>


        </ScrollView>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 20,
    },
    otherContent:{
        margin: 10,
        paddingTop: 10,
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10
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
    largeImg : {
        resizeMode: 'contain',
        alignSelf: 'center',
        width:250,
        height: 219
    },
    description:{
        padding: 10
    },
    paragraph: {

    },
});