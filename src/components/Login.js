import React, {useState, useEffect} from "react";
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import SQLite from "react-native-sqlite-storage";
import {useSelector, useDispatch} from "react-redux";
import {setName, setAge} from "../redux/actions";

const db = SQLite.openDatabase(
  {
    name: "MainDB",
    location: "default",
  },
  () => {},
  error => {
    console.log(error);
  },
);

const Login = ({navigation}) => {
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "Users " +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);",
      );
    });
  };

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql("SELECT Name, Age FROM Users", [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate("Home");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert("Warning!", "Please fill out all fields.");
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        await db.transaction(async tx => {
          await tx.executeSql("INSERT INTO Users (Name, Age) VALUES(?,?)", [
            name,
            age,
          ]);
        });
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.input}
        onChangeText={value => dispatch(setName(value))}
        placeholder={"Enter your name"}
      />

      <TextInput
        style={styles.input}
        onChangeText={value => dispatch(setAge(value))}
        placeholder={"Enter your age"}
      />
      <CustomButton onPressFunction={setData} title="Login" color="#1eb900" />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0080ff",
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: "#ffffff",
    marginBottom: 100,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Login;
