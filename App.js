import * as React from 'react';
import { useState } from 'react';
import { ImageBackground,StyleSheet,TouchableOpacity, View, Text, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import background from './assets/background.png'
import homeScreen from './assets/homescreen.png'
import tag from './assets/tag.png'

SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  function ListDetailsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>List detail of shopper!</Text>
        <Text>Amazon</Text>
        <Text>Target</Text>
        <Text>Walmart</Text>
      </View>
    );
  }
  function HomeDetailsScreen() {
    const [input, setInput] = useState(0);
    const [input2, setInput2] = useState(0);
    const [price, setPrice] = useState(0);
  
    const calculate = () => {
      var price = (parseFloat((input * (100 - input2)) * 0.01)).toFixed(2);
      setPrice(price);
      return price;
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={tag} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Instant Discount Price</Text>
        <TextInput 
          style={styles.input}
          type="number"
          placeholder="Enter the Original Price"
          value={input}
          onChangeText = {newText => setInput(newText)}
        
        />
        <TextInput 
          style={styles.input}
          type="number"
          placeholder="Enter the Discount Percentage"
          value={input2}
          onChangeText = {newText => setInput2(newText)}
        
        />

        <TouchableOpacity onPress={()=> calculate()} style={styles.button}>
          <Text style={styles.buttonText}>Get Price</Text>
        </TouchableOpacity>
        <Text>Your final price is  ${price}</Text>
      </ImageBackground>
    </View>
  );
  }
  
  function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Welcome to Instant Discount Price </Text>
        <Text style={styles.title}>Tired of Calculating!  </Text>
        

        <Image source={homeScreen} style={styles.homeScreen} />
        <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('HomeDetails')}>
        <Text style={styles.blinkingText}>TRY ME!!!</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    );
  }
  
  function AboutUsScreen({ navigation }) {
    const [ showText, setshowText] = useState(true)
    React.useEffect(()=>{
      const interval = setInterval(()=>{
        setshowText((showText)=> !showText)
      }, 1500)
      return ()=>{
        clearInterval(interval)
      }
    })

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Instant Discount Price </Text>
        <Text>Tired of Where to Shop</Text>
        <Text>Simply click the button below to see the list of top 5 popular shopping website!</Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('List')}>
          <Text style={[styles.blinkingText, {display: showText ? 'none' : 'flex'}]}>SHOW ME</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const HomeStack = createNativeStackNavigator();
  
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="HomeDetails" component={HomeDetailsScreen} />
      </HomeStack.Navigator>
    );
  }
  
  const SettingsStack = createNativeStackNavigator();
  
  function AboutUsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="About Us" component={AboutUsScreen} />
        <SettingsStack.Screen name="List" component={ListDetailsScreen} />
      </SettingsStack.Navigator>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="About Us" component={AboutUsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center", 
  },
  homeScreen:{
    width: 400, 
    height: 300, 
    marginTop:10,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    height: 40,
    padding: 10,
    color: 'gray',
    marginBottom: 10,
    marginTop: 10,
  },
  button:{
    height: 50,
    width: 150,
    alignItems: "center",
    backgroundColor:'gray',
    margin: 20,
  },
  button1:{
    height: 50,
    width: 150,
    backgroundColor:'tomato',
    margin: 20,
    alignItems: "center",
  },
  buttonText: {
    color: 'ffffff',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  heading:{
    marginTop: 20,
    fontSize: 30,
    paddingLeft: 20,
    alignSelf: "flex-start",
  },
  text:{
    fontSize: 24,
    paddingLeft: 45,
    alignSelf: "flex-start",
    
  },
  blinkingText:{
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
  },
});