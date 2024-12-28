import axios from "axios";

export const fetchCities = async (searchText: string) => {
    const data = {
        apiKey: 'fb0ed5b5e43f0e640528be421a9b7650',
        modelName: 'Address',
        calledMethod: 'getSettlements',
        methodProperties: {
            FindByString: searchText,
            Warehouse: '1',
            Limit: '20',
        },
    };

    try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data.map((item: any) => ({
            id: item.Ref,
            name: `${item.Description}, ${item.AreaDescription}`,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};