import axios from "axios";
import {BaseURL} from "../components/common/BaseURL/BaseURL";

const instance = axios.create({
    baseURL: `${BaseURL}/graphql`,
    headers: {'content-type': 'application/json'}
})
const productsQl = (products) => {
    return `query getCatalog {
        ${products} {
            id
            name
            article
            price
            mainImage {
              id
            }
        }
    }
`
}
const getCatalog = (query, category) => {
    return instance.post('', {query})
        .then(response => {
            const data = response.data.data[category].map(product => {
                return {
                    id: product.id,
                    ...product,
                    mainImage: product.mainImage.id
                }
            })

            return data
        })
}

const showersQuery = productsQl('showers');
const mirrorsQuery = productsQl('mirrors');
const doorsQuery = productsQl('doors');
const partitionsQuery = productsQl('partitions');
const photoPrintingsQuery = productsQl('photo_printings');
const railingsQuery = productsQl('railings');
const shelvesQuery = productsQl('shelves');

export const categoryAPI = {
    getShowers() {
        return getCatalog(showersQuery, 'showers')
    },
    getMirrors() {
        return getCatalog(mirrorsQuery, 'mirrors')
    },
    getDoors() {
        return getCatalog(doorsQuery, 'doors')
    },
    getPartitions() {
        return getCatalog(partitionsQuery, 'partitions')
    },
    getPhotoPrintings() {
        return getCatalog(photoPrintingsQuery, 'photo_printings')
    },
    getRailings() {
        return getCatalog(railingsQuery, 'railings')
    },
    getShelves() {
        return getCatalog(shelvesQuery, 'shelves')
    }

}

const productQl = (product) => {
    return `query getProduct($id: ID!) {
      ${product}(id: $id) {
        name
        price
        article
        pre_description
        description
        meta_description
        meta_keys
        mainImage {
          id
        }
        otherImage {
          directus_files_id {
            id
          }
        }
      }
    }
`
}

export const productAPI = {
    getProduct(id, category) {
        let productQuery = productQl(category)
        return instance.post('', {query: productQuery, variables: {"id": id}})
            .then(response => {
                const attr = response.data.data[category]
                const mainImage = attr.mainImage.id
                let otherImage

                if (Array.isArray(attr.otherImage)) {
                    otherImage = attr.otherImage.map(el => {
                        return el['directus_files_id']
                    })
                } else {
                    otherImage = attr.otherImage['directus_files_id']
                }
                return {...attr, mainImage, otherImage}
            })
            .catch(error => {
                return Promise.reject(error)
            })

    }
}

const portfolioQl = (limit, page) => {
    return `
    query getPhotos($id: ID!) {
      portfolios_by_id(id: $id) {
        title
        images(limit: ${limit}, page: ${page}) {
          directus_files_id {
            id
          }
        }
        images_func {
            count
        }
      }
    }
  `;
};

export const portfolioAPI = {
    getGallery(id, limit, page) {
        return instance
            .post('', { query: portfolioQl(limit, page), variables: { id } })
            .then((response) => {
                const attributes = response.data.data['portfolios_by_id'];
                const title = attributes.title;
                const images = attributes.images.map((img) => img['directus_files_id'].id);
                const count = attributes["images_func"].count
                return { title, images, count };
            });
    },
};

const orderQl = `
    query getContent {
      orders {
        content
      }      
    }
`
export const orderAPI = {
    getContent() {
        return instance.post('', {query: orderQl})
            .then(response => {
                return response.data.data.orders[0].content
            })
    }
}



const furnitureQl = (type) => {
    return `query getFurniture {
      ${type} {
        id
        name
        article
        description
        in_stock
        price_dollars
        images {
          directus_files_id {
            id
          }
        }
      }
    }`
}
export const getFurnitureAPI = (type) => {
    let furnitureQuery = furnitureQl(type);
    return instance.post('', {query: furnitureQuery})
        .then(response => response.data.data[type].map(furniture => {
            return {
                ...furniture,
                price: Number(furniture.price),
                id: furniture.id,
                images: furniture.images.map(image => {
                    return image["directus_files_id"].id
                })
            }
        }))
}


const getExchangeRateAPI = `
    query getProduct {
      dollar_exchange_rate {
        hryvnia 
      }
    }
`
export const getDollarExchangeRate = () => {
    return instance.post('', {query: getExchangeRateAPI})
        .then(response => response.data.data["dollar_exchange_rate"][0].hryvnia)
}


