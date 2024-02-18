import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Navigation from "../../navigation";
import { useNavigation } from '@react-navigation/native';



const TrainingsSlider = () => {
  const workouts = [
    { id: 1, title: 'Chest \n' + '&' + 'Triceps', image: require('../../assets/images/workouts.jpg') },
    { id: 2, title: 'Back \n' + '&' + 'Biceps', image: require('../../assets/images/workouts.jpg') },
    { id: 3, title: 'Shoulders \n' + '&' + 'Traps', image: require('../../assets/images/workouts.jpg') },
    { id: 4, title: 'Legs \n' + '&' + 'Abs', image: require('../../assets/images/workouts.jpg') },
    // Add more workouts as needed
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);

  const navigation = useNavigation();


  const renderItem = ({ item, index }) => (
    <TouchableOpacity
    style={styles.slide}
    onPress={() => handleSlidePress(index)}
    >
       <Text style={styles.heading}>our trainings</Text>
      <Text style={styles.overlayText}>{item.title}</Text>
      <Image source={item.image} style={styles.backgroundImage} />
    </TouchableOpacity>
  );

  const handleSlidePress = (index) => {
    navigation.navigate('Body');
  };

  return (
    <View>
      <Carousel
        data={workouts}
        renderItem={renderItem}
        sliderWidth={380}
        itemWidth={380}
        layout={'default'}
        loop
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={workouts.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.inactivePaginationDot}
        inactiveDotOpacity={0.7}
        inactiveDotScale={0.9}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  slide: {
    width: 380,
    height: 150,
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    position: 'relative', // Ensure the overlayText respects the position relative to this container
  },
  backgroundImage: {
    flex: 1,
    borderRadius: 15,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayText: {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontFamily: "Rajdhani-Bold",
    textAlign: 'center',
    bottom: 60,
    left: 230,
    right: 0,
    zIndex: 1, // Ensure the overlay text appears above the image
    textShadowColor: 'rgba(0, 0, 0, 1)', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius
  },
  
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 165,
  },
  paginationDot: {
    width: 15,
    height: 15,
    borderRadius: 4,
    marginHorizontal: 0,
    backgroundColor: '#FF5E00',
  },
  inactivePaginationDot: {
    width: 15,
    height: 15,
    marginHorizontal: 0,
    backgroundColor: 'white',
  },
  heading :{
    fontSize: 15,
    color: '#FF5E00',
    fontFamily: "Rajdhani-SemiBold",
    letterSpacing: 2.1,

  }
});

export default TrainingsSlider;
