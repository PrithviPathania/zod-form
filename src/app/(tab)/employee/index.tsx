import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Alert, Pressable, ScrollView, TextInput} from "react-native"
import {router} from "expo-router"
import {zodResolver} from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { email, z } from "zod"

const employeeSchema = z.object({
firstName: z.string().trim().min(2, { message: "First name must be at least 2 characters" }),
lastName: z.string().trim().min(2, { message: "Last name must be at least 2 characters" }),
email: email({ message: "Invalid email address" }).trim(),
employeeId: z.string().trim().length(9, { message: "Em ID must be exactly 9 characters" }),
phone: z.string().refine((val) => val.replace(/\D/g, "").length >= 10, { message: "Phone number must be exactly 10 digits" }),




})



type EmployeeForm = z.infer<typeof employeeSchema>;

const onSubmit = (data: EmployeeForm) => {
    Alert.alert("Employee Information Saved", "Your employee information has been saved.", [
      { text: "OK", onPress: ()=> router.back() }
    ]);
    router.back();
  };

const Index = () => {
  const {control,handleSubmit, formState: { errors }} = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      employeeId: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. John"
            placeholderTextColor={'gray'}

            value={value}
            onChangeText={onChange}
            style={styles.input}
            autoCapitalize="words"
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.error}>{errors.firstName.message}</Text>
      )}
      <Text style={styles.label}>Last Name</Text>
      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="eg. Doe"
            placeholderTextColor={'gray'}
            value={value}
            onChangeText={onChange}
            style={styles.input}
            autoCapitalize="words"
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.error}>{errors.lastName.message}</Text>
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
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}
      <Text style={styles.label}>Employee ID</Text>
      <Controller
        name="employeeId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. 123456789"
            placeholderTextColor={'gray'}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            style={styles.input}
            keyboardType="numeric"
          />
        )}
      />
      {errors.employeeId && (
        <Text style={styles.error}>{errors.employeeId.message}</Text>
      )}
        <Text style={styles.label}>Phone Number</Text>
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. 1234567890"
            placeholderTextColor={'gray'}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            style={styles.input}
            autoCapitalize="none"
          />
        )}
      />
      {errors.phone && (
        <Text style={styles.error}>{errors.phone.message}</Text>
      )}

      <Pressable
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Save</Text>
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