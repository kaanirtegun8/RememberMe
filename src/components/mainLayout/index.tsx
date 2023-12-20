import React, { ReactNode } from "react";
import { View } from "react-native";
import BottomBar from "../bottomBar";
import { useAuth } from "../../providers/authProvider";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      {children}
      {isLoggedIn && <BottomBar />}
    </View>
  );
};

export default MainLayout;
