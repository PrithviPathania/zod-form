import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Alert, Pressable, ScrollView, TextInput} from "react-native"
import {router} from "expo-router"
import {zodResolver} from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { email, z } from "zod"
import { Link } from "expo-router";
const signInSchema = z.object({
email: email({ message: "Invalid email address" }).trim(),
password: z.string().min(8, { message: "Password must be at least 8 characters" }),





})




type SignInForm = z.infer<typeof signInSchema>;

const onSubmit = (data: SignInForm) => {
    Alert.alert("Sign In Information Saved", `Email: ${data.email}\nPassword: ${data.password}`);
    router.back();
  };

const Index = () => {
  const {control,handleSubmit, formState: { errors }} = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
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

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
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

     

      <Pressable
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Link style={styles.link} href="/signup" >
        Dont Have an Account? Sign Up
      </Link>
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
  link: {
    color: "#003874",
    marginTop: 15,
    textAlign: "center",
  }
});