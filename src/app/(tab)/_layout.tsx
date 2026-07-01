import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="employee"
        options={{

            title: "Employee Information Form",
            tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                 name={focused ? "person" : "person-outline"}
                 size={size}
                 color={color}
                />
            ),
        }}
       />
      <Tabs.Screen 
        name="signin"
        options={{
          title: "Sign-In Form",
          tabBarIcon: ({ color, size, focused, }) => (
            <Ionicons
              name={focused ? "log-in" : "log-in-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Sign-Up Form",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-add" : "person-add-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
       
    </Tabs>
  );
}
