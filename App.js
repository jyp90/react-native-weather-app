import React from 'react';
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "f8c97486460bc7bf47772aa38536addc";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude, longitude) => {
    console.log(latitude, longitude)
    const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);

  };
  getLocation = async () => {
    try {
      await Location.getForegroundPermissionsAsync();
      const { coords : { latitude, longitude }} = await Location.getCurrentPositionAsync();
      this.setState({isLoading: false})
      this.getWeather(latitude, longitude);
    } catch (err) {
      Alert.alert("Cannot find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading/> : null;
  }
}