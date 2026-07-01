import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { email, z } from "zod"
const signUpSchema = z.object({
fullName: z.string().trim().min(2, { message: "Full name must be at least 2 characters" }),
email: email({ message: "Invalid email address" }).trim(),
password: z.string().min(8, { message: "Password must be at least 8 characters" }),
confirmPassword: z.string(),}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type SignUpForm = z.infer<typeof signUpSchema>;

const onSubmit = (data: SignUpForm) => {
    Alert.alert("Sign Up Information Saved", "Your sign-up information has been saved.", [
      { text: "OK", onPress: ()=> router.back() }
    ]);
    router.back();
  };

const Index = () => {
  const {control,handleSubmit, formState: { errors }} = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",  
    },
    mode: "onSubmit",
  });

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <Controller
        name="fullName"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. John Doe"
            placeholderTextColor={'gray'}

            value={value}
            onChangeText={onChange}
            style={styles.input}
            autoCapitalize="words"
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}
      <Text style={styles.label}>Email</Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. john.doe@example.com"
            placeholderTextColor={'gray'}

            value={value}
            onChangeText={onChange}
            style={styles.input}
            autoCapitalize="words"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}
      <Text style={styles.label}>Password</Text>

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Should be at least 8 characters."
            placeholderTextColor={'gray'}
            value={value}
            onChangeText={onChange}
            style={styles.input}
            autoCapitalize="words"
            secureTextEntry
          />
        )}
           
        
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      <Text style={styles.label}>Confirm Password</Text>

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Confirm your password."
            placeholderTextColor={'gray'}
            value={value}
            onChangeText={onChange}
            style={styles.input}
            autoCapitalize="words"
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

     

      <Pressable
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
   
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6b7280",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  }, 
    label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 16,
  }
});