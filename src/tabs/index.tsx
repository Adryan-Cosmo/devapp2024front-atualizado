import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; 
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; 
import Principal from "./Principal";
import InformacoesNotificacoes from "../telas/informacoes/InformacoesNotificacoes";
import PerfilUsuario from "./PerfilUsuario";
import { Badge, Box, Button, Icon, VStack } from "native-base";

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarStyle:{
        backgroundColor: "#3773b5"
    },
    tabBarActiveTintColor:"#fff",
    tabBarInactiveTintColor:"#0B3B60"
};


const tabs = [
    {
        id: 1,
        name: "Principal",
        component: Principal,
        icon: "home",
        from: Ionicons
    },
    {
        id: 2,
        name: "Notificações",
        component: InformacoesNotificacoes,
        icon: "bell",
        from: MaterialCommunityIcons
    },
    {
        id: 3,
        name: "Perfil de Usuário",
        component: PerfilUsuario,
        icon: "person-circle-outline",
        from: Ionicons
    }
]



export default function Tabs(){
    return(
        <Tab.Navigator screenOptions={screenOptions} >
            {tabs.map((tabs) =>(            
            <Tab.Screen 
                key={tabs.id}
                name={tabs.name}
                component={tabs.component} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size})=>(
                        <Icon as={tabs.from} name={tabs.icon} color={color} size={size}/>
                    )
                }}
            />))}


        </Tab.Navigator>
    )
}