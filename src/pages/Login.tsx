import React, { useState } from "react";
import { Alert, View } from "react-native";
import { TextInput, Button, Title, Text } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigator/appNavigator";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../providers/authProvider";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;

type LoginFormInputs = {
  email: string;
  password: string;
};

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

export const Login = ({ navigation, route }: Props) => {
  const {login} = useAuth()
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [watchedEmail, watchedPassword] = watch(["email", "password"]);
  const buttonDisabled = () =>
    !!errors.email || !!errors.password || !watchedEmail || !watchedPassword;

  const onSubmit = (data: LoginFormInputs) => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
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

  const autoFillForm = () => {
    setValue("email", "mertkaan255@gmail.com");
    setValue("password", "12300321mk");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Controller
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.inputs}
            autoCapitalize="none"
            label={"Email"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
        name="email"
        rules={{
          required: "Email is required.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Enter a valid email.",
          },
          maxLength: {
            value: 50,
            message: "Email cannot exceed 50 characters.",
          },
        }}
        control={control}
      />

      {errors.email && (
        <Text style={[{ color: "red" }, styles.inputs]}>
          {errors.email.message}
        </Text>
      )}

      <Controller
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.inputs}
            autoCapitalize="none"
            label={"Password"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
            secureTextEntry
          />
        )}
        name="password"
        rules={{
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long.",
          },
          maxLength: {
            value: 20,
            message: "Password cannot exceed 20 characters.",
          },
          pattern: {
            value: /\d+/,
            message: "Password must contain at least one digit.",
          },
        }}
        control={control}
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
        mode="text"
        textColor="blue"
        onPress={() => navigation.navigate("Register")}
      >
       Need an account? Register
      </Button>

      <Button onPress={autoFillForm}>Autofill Form</Button>
    </View>
  );
};

const styles = {
  inputs: {
    marginBottom: 16,
  },
};