import { Stack } from "expo-router";

export default function SigninLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sign-In Form" }} />
      <Stack.Screen name="signup" options={{ title: "Sign-Up Form" }} />
    </Stack>
  );
}
