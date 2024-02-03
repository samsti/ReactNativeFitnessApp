import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const TrainingsSlider = () => {
  const workouts = [
    { id: 1, title: 'Biceps + Arms', image: require('../../assets/images/workouts.jpg') },
    { id: 2, title: 'Leg Day', image: require('../../assets/images/workouts.jpg') },
    // Add more workouts as needed
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.overlayText}>{item.title}</Text>
      <Image source={item.image} style={styles.backgroundImage} />
    </View>
  );

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
    marginTop: 30,
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure the overlay text appears above the image
  },
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 190,
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
});

export default TrainingsSlider;
