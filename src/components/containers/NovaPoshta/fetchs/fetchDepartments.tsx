import axios from 'axios';

export const fetchDepartments = async (cityRef: any, searchText: string = '') => {
    const data = {
        apiKey: 'fb0ed5b5e43f0e640528be421a9b7650',
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
            SettlementRef: cityRef,
            FindByString: searchText,
            Limit: '50',
        },
    };

    try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data.map((item: any) => item.Description);
    } catch (error) {
        console.error(error);
        return [];
    }
};