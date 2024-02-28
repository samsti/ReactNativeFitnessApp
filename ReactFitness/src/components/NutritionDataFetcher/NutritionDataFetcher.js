import React, { useEffect } from 'react';
import axios from 'axios';

const NutritionDataFetcher = ({ searchQuery, onFetchComplete }) => {
  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await axios.get('https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition', {
          params: { query: searchQuery },
          headers: {
            'X-RapidAPI-Key': 'd76c99b720msh8522d1583ecab48p15082djsna33ee0a659db',
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
