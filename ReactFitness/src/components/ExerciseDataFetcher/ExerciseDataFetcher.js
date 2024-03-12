import React, { useEffect } from 'react';


const ExerciseDataFetcher = ({ selectedMuscle, onFetchComplete }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rapidApiKey = 'd76c99b720msh8522d1583ecab48p15082djsna33ee0a659db';

        let rapidApiEndpoints = [];

        if (Array.isArray(selectedMuscle)) {
          selectedMuscle.forEach(muscle => {
            switch (muscle) {
              case 'Shoulders':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/bodyPart/shoulders?limit=3');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/traps?limit=3');
                break;
              case 'Chest':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/incline%20barbell%20bench%20press?limit=1');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/lever%20chest%20press?limit=1');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/cable%20seated%20chest%20press?limit=1');

                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/barbell%20lying%20triceps%20extension%20skull%20crusher?limit=1');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/cable%20triceps%20pushdown%20(v-bar)?limit=1');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/weighted%20tricep%20dips?limit=1');
           
                break;
              case 'Legs':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/bodyPart/upper%20legs?limit=3');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/abs?limit=3');

                break;
              case 'Back':
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/cable%20bar%20lateral%20pulldown?limit=1');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/name/cable%20straight%20back%20seated%20row?limit=3');
                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/back?limit=1');

                rapidApiEndpoints.push('https://exercisedb.p.rapidapi.com/exercises/target/biceps?limit=3');

                break;
              default:
                console.warn('Invalid muscle selection:', muscle);
                break;
            }
          });

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
