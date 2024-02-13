import React, { useEffect } from 'react';
import axios from 'axios';

const NutritionDataFetcher = ({ searchQuery, onFetchComplete }) => {
  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await axios.get('https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition', {
          params: { query: searchQuery },
          headers: {
            'X-RapidAPI-Key': '506fe99ad8mshced1e2411d3aed0p16a5a5jsn6e4ef5008bc7',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com',
          },
        });

        if (response.data.length > 0) {
          onFetchComplete(response.data[0]); // Assuming the first item contains the relevant nutrition data
        } else {
          onFetchComplete(null); // If no data is found
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        onFetchComplete(null); // In case of error, pass null to indicate no data
      }
    };

    // Fetch data only if search query is provided
    if (searchQuery) {
      fetchNutritionData();
    }
  }, [searchQuery, onFetchComplete]);

  return null;
};

export default NutritionDataFetcher;
