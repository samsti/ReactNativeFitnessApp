import React, { useEffect } from 'react';

const ExerciseDataFetcher = ({ selectedMuscle, onFetchComplete }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rapidApiKey = '506fe99ad8mshced1e2411d3aed0p16a5a5jsn6e4ef5008bc7';

        let rapidApiEndpoint = '';

        switch (selectedMuscle) {
          case 'Shoulders':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/shoulders';
            break;

          case 'Chest':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest';
            break;

          case 'Traps':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/traps';
            break;

          case 'Biceps':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/biceps';
            break;

          case 'Forearms':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/forearms';
            break;

          case 'Lats':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/lats';
            break;

          case 'Abs':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/abs';
            break;

          case 'Quads':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/quads';
            break;

          case 'Calves':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/calves';
            break;

          default:
            console.warn('Invalid muscle selection');
            return;
        }

        const response = await fetch(rapidApiEndpoint, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        });

        const data = await response.json();

        onFetchComplete(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMuscle, onFetchComplete]);

  return null;
};

export default ExerciseDataFetcher;
