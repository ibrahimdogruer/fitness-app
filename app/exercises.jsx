import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchExercisesByBodyPart } from "../api/exerciseDB";
import { dummyExercises } from "../constants";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ExerciseList from "../components/ExerciseList";
import { ScrollView } from "react-native-virtualized-view";

export default function Exercises() {
  const router = useRouter();
  const item = useLocalSearchParams();

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (item) getExercises(item.name);
  }, []);

  const getExercises = async (bodyPart) => {
    let data = await fetchExercisesByBodyPart(bodyPart);
    setExercises(data);
  };

  return (
    <ScrollView>
      <StatusBar style="light" />

      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[40px]"
      />

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-rose-500 mx-4 absolute justify-center items-center pr-1 rounded-full"
        style={{ width: hp(5.5), height: hp(5.5), marginTop: hp(7) }}
      >
        <Ionicons name="chevron-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>

      {/* exercises */}
      <View className="mx-4 space-y-3 mt-4">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          {item.name} exercises
        </Text>

        <View className="mb-10">
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}