import React, { useEffect } from 'react';

const ExerciseDataFetcher = ({ selectedMuscle, onFetchComplete }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rapidApiKey = '506fe99ad8mshced1e2411d3aed0p16a5a5jsn6e4ef5008bc7';

        let rapidApiEndpoint = '';

        switch (selectedMuscle) {
          case 'Shoulders':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/shoulders?limit=20';
            break;

          case 'Chest':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=20';
            break;

          case 'Traps':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/traps?limit=20';
            break;

          case 'Biceps':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/biceps?limit=20';
            break;

          case 'Forearms':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/forearms?limit=20';
            break;

          case 'FrontLats':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/serratus%20anterior?limit=20';
            break;

          case 'Abs':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/abs?limit=20';
            break;

          case 'Quads':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/quads?limit=20';
            break;

          case 'Calves':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/calves?limit=20';
            break;

          case 'Triceps':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/triceps?limit=20';
            break;

          case 'Delts':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/delts?limit=20';
            break;

          case 'UpperBack':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/upper%20back?limit=20';
            break;

          case 'Lats':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/lats?limit=20';
            break;

          case 'Glutes':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/glutes?limit=20';
            break;

          case 'Adductors':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/adductors?limit=20';
            break;

          case 'Hamstrings':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/hamstrings?limit=20';
            break;

          case 'Spine':
            rapidApiEndpoint = 'https://exercisedb.p.rapidapi.com/exercises/target/spine?limit=20';
            break;

          default:
            console.warn('Invalid muscle selection');
            return;
        }

        const response = await fetch(rapidApiEndpoint, {
          method: 'GET',
          params: {limit: '50'},
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

