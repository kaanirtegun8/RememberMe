import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Title, Text } from "react-native-paper";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "@firebase/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {useAuth} from '../providers/authProvider'

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomePage: undefined;
};

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, "Register">;

type Props = {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
};

export const Register = ({ navigation }: Props) => {
  const {login} = useAuth()
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        
        login()

        navigation.navigate("HomePage");
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const buttonDisabled = () => {
    const [watcedFirstname, watcedLastName, watcedEmail, watcedPassword] =
      watch(["firstName", "lastName", "email", "password"]);
    return (
      !!errors.firstName ||
      !!errors.lastName ||
      !!errors.email ||
      !!errors.password ||
      !watcedFirstname ||
      !watcedLastName ||
      !watcedEmail ||
      !watcedPassword
    );
  };

  const autoFillForm = () => {
    setValue("firstName", "Mertkaan");
    setValue("lastName", "Kaya");
    setValue("email", "deneme@gmail.com");
    setValue("password", "123456");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Controller
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            label="Firstname"
            mode="outlined"
            style={styles.inputs}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.firstName}
          />
        )}
        name="firstName"
        control={control}
        rules={{
          required: "Firstname is required",
          minLength: {
            value: 2,
            message: "Firstname must be at least 2 characters long",
          },
          maxLength: {
            value: 50,
            message: "Firstname cannot exceed 50 characters",
          },
        }}
      />

      {errors.firstName && (
        <Text style={[{ color: "red" }, styles.inputs]}>
          {errors.firstName.message}
        </Text>
      )}

      <Controller
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            label="Lastname"
            mode="outlined"
            style={styles.inputs}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.lastName}
          />
        )}
        name="lastName"
        control={control}
        rules={{
          required: "Lastname is required",
          minLength: {
            value: 2,
            message: "Lastname must be at least 2 characters long",
          },
          maxLength: {
            value: 50,
            message: "Lastname cannot exceed 50 characters",
          },
        }}
      />

      {errors.lastName && (
        <Text style={[{ color: "red" }, styles.inputs]}>
          {errors.lastName.message}
        </Text>
      )}

      <Controller
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.inputs}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Enter a valid email.",
          },
          maxLength: {
            value: 50,
            message: "Email cannot exceed 50 characters.",
          },
        }}
      />

      {errors.email && (
        <Text style={[{ color: "red" }, styles.inputs]}>
          {errors.email.message}
        </Text>
      )}

      <Controller
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.inputs}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={!!errors.password}
          />
        )}
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: 6,
          maxLength: 20,
          pattern: {
            value: /\d+/,
            message: "Password must contain at least one digit.",
          },
        }}
      />

      {errors.password && (
        <Text style={[{ color: "red" }, styles.inputs]}>
          {errors.password.message}
        </Text>
      )}

      <Button
        style={styles.inputs}
        disabled={buttonDisabled() || loading}
        mode="elevated"
        onPress={handleSubmit(onSubmit)}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Button
        style={styles.inputs}
        mode="text"
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login
      </Button>

      <Button
        onPress={autoFillForm} >
        Autofill Form
      </Button>
    </View>
  );
};

const styles = {
  inputs: {
    marginBottom: 10,
  },
};