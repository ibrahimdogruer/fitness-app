import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ExerciseDetails() {
  const router = useRouter();
  const item = useLocalSearchParams();

  return (
    <View className="flex flex-1">
      <StatusBar style="dark" />

      <View className="shadow-md bg-neutral-200 rounded-[25px]">
        <Image
          source={{ uri: item?.gifUrl }}
          contentFit="cover"
          style={{ width: wp(100), height: wp(100) }}
          className="rounded-b-[40px]"
        />
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute mx-2 rounded-full mt-8 right-2"
      >
        <AntDesign name="closecircle" size={hp(4.5)} color="#f43f5e" />
      </TouchableOpacity>

      {/* details */}
      <ScrollView
        className="mx-4 space-y-2 mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={{ fontSize: hp(3.5) }}
          className="font-semibold text-neutral-800 tracking-wide"
        >
          {item?.name}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          style={{ fontSize: hp(2.25) }}
          className="text-neutral-700 tracking-wide"
        >
          Equipment{" "}
          <Text className="font-bold text-neutral-800">{item?.equipment}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200).duration(300).springify()}
          style={{ fontSize: hp(2.25) }}
          className="text-neutral-700 tracking-wide"
        >
          Secondary Muscles{" "}
          <Text className="font-bold text-neutral-800">
            {item?.secondaryMuscles}
          </Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          style={{ fontSize: hp(2.25) }}
          className="text-neutral-700 tracking-wide"
        >
          Target{" "}
          <Text className="font-bold text-neutral-800">{item?.target}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(300).springify()}
          style={{ fontSize: hp(3.5) }}
          className="font-semibold text-neutral-800 tracking-wide"
        >
          Instructions
        </Animated.Text>

        {item?.instructions.split(",").map((instruction, index) => {
          return (
            <Animated.Text
              entering={FadeInDown.delay((index + 6) * 100)
                .duration(300)
                .springify()}
              key={instruction}
              style={{ fontSize: hp(2.25) }}
              className="text-neutral-800"
            >
              {"\u2022"} {instruction}
            </Animated.Text>
          );
        })}
      </ScrollView>
    </View>
  );
}
