import React, { useEffect } from 'react';
import { Text } from 'react-native';

const ExerciseDataFetcher = ({ selectedMuscle, onFetchComplete }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rapidApiKey = '506fe99ad8mshced1e2411d3aed0p16a5a5jsn6e4ef5008bc7';

        let rapidApiEndpoints = [];

        if (Array.isArray(selectedMuscle)) {
          // If selectedMuscle is an array, iterate over each muscle group
          selectedMuscle.forEach(muscle => {
            switch (muscle) {
              case 'Shoulders':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/bodyPart/shoulders?limit=3');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/traps?limit=3');
                break;
              case 'Chest':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=3');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/triceps?limit=3');
                break;
              case 'Legs':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/bodyPart/upper%20legs?limit=3');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/abs?limit=3');
                break;
              case 'Back':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=3');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/biceps?limit=3');
                break;
              // Add more cases for other muscle groups if needed
              default:
                console.warn('Invalid muscle selection:', muscle);
                break;
            }
          });

          // Fetch exercises for each muscle group using Promise.all
          const fetchPromises = rapidApiEndpoints.map(endpoint => fetch(endpoint, {
            method: 'GET',
            params: { limit: '3' },
            headers: {
              'X-RapidAPI-Key': rapidApiKey,
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            },
          }));
          
          const responses = await Promise.all(fetchPromises);
          const responseData = await Promise.all(responses.map(response => response.json()));
          const exercises = responseData.reduce((acc, current) => acc.concat(current), []);

          onFetchComplete(exercises);
        } else {
          // If selectedMuscle is not an array, fetch exercises for a single muscle group
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
              console.warn('Invalid muscle selection:', selectedMuscle);
              return;
          }

          if (rapidApiEndpoint) {
            const response = await fetch(rapidApiEndpoint, {
              method: 'GET',
              params: { limit: '20' },
              headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
              },
            });

            const data = await response.json();
            onFetchComplete(data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMuscle, onFetchComplete]);

  return null;
};

export default ExerciseDataFetcher;
