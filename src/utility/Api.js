import axios from 'axios';

const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

const ApiConsume = async({pageNumber, pageSize, sortBy}) => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                'page[number]': pageNumber,
                'page[size]': pageSize,
                append: ['small_image', 'medium_image'],
                sort: sortBy,
            }
        });

        return response.data.data;

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
  
export {ApiConsume};