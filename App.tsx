import { useEffect, useState , useRef} from 'react';
import MapView,  { Marker } from 'react-native-maps';
import { View,  Image} from 'react-native';
import { requestForegroundPermissionsAsync,
         getCurrentPositionAsync,
         LocationObject,
         watchPositionAsync,
         LocationAccuracy
         } from 'expo-location';

import { styles } from './styles';

export default function App() {
const [location, setLocation] = useState<LocationObject | null>(null);

const mapRef = useRef<MapView>(null);
 
  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      
     // console.log("Local Atual: ", currentPosition);
    }
  }
  useEffect (()=>{
    requestLocationPermissions(); 
  },[])
  useEffect(()=>{
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 30,
    },
    (response)=>{
      alert("NOVA LOCALIZACAO!", response);
      setLocation(response);
    });
  },[])

  return (
    <View style={styles.container}>
      {
        location &&
        <MapView
        ref={mapRef}
       style={styles.map}
       initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
       }}
       >
        <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
       // image={require("./assets/marcador.png")}
        title='Simony Cogoy'
        description='Última atualização'
        >
        <Image source={require('./assets/marcador.jpeg')} style={{height: 50, width:50, justifyContent:'center', borderRadius:80}} />
        </Marker>
        </MapView>

      }
    

    </View>
  );
}

