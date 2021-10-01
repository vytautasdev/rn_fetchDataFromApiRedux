import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import GlobalStyle from "../../utils/GlobalStyle";
import SQLite from "react-native-sqlite-storage";

import {useSelector, useDispatch} from "react-redux";
import {setName, setAge, getCities} from "../redux/actions";

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

const Home = ({navigation, route}) => {
  const {name, age, cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    dispatch(getCities());
  }, []);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql("SELECT Name, Age FROM Users", [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            dispatch(setName(userName));
            dispatch(setAge(userAge));
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Welcome back, {name}.
      </Text>
      <FlatList
        data={cities}
        renderItem={({item}) => (
          <View style={styles.list}>
            <Text style={styles.title}>{item.country}</Text>
            <Text style={styles.subtitle}>{item.city}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  list: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#cccccc",
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: "#999999",
  },
});

export default Home;
