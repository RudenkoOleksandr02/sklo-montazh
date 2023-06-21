import axios from "axios";
import {BaseURL} from "../components/common/BaseURL/BaseURL";

const instance = axios.create({
    baseURL: `${BaseURL}/graphql`,
    headers: {'content-type': 'application/json'}
})
const productsQl = (products) => {
    return `query getCatalog {
        ${products}(pagination: {limit: 1000}) {
            data {
                id
                attributes {
                    name
                    price
                    mainImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`
}
const getCatalog = (query, category) => {
    return instance.post('', {query})
        .then(response => response.data.data[category].data.map((product) => {
            return {
                id: product.id,
                ...product.attributes,
                mainImage: product.attributes.mainImage.data.attributes.url
            }
        }))
}

const showersQuery = productsQl('showers');
const mirrorsQuery = productsQl('mirrors');
const doorsQuery = productsQl('doors');
const partitionsQuery = productsQl('partitions');
const photoPrintingsQuery = productsQl('photoPrintings');
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
        return getCatalog(photoPrintingsQuery, 'photoPrintings')
    },
    getRailings() {
        return getCatalog(railingsQuery, 'railings')
    },
    getShelves() {
        return getCatalog(shelvesQuery, 'shelves')
    }

}

const productQl = (product) => {
    return `query getProduct($id: ID) {
        ${product}(id: $id) {
            data {
                attributes {
                    name
                    price
                    mainImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    otherImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    article
                    preDescription
                    description
                    metaDescription
                    metaKeys
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
                const attr = response.data.data[category].data.attributes
                const mainImage = attr.mainImage.data.attributes.url
                let otherImage

                if (Array.isArray(attr.otherImage.data)) {
                    otherImage = attr.otherImage.data.map(el => {
                        return el.attributes.url
                    })
                } else {
                    otherImage = attr.otherImage.data.attributes.url
                }
                return {...attr, mainImage, otherImage}
            })
            .catch(error => {
                return Promise.reject(error)
            })

    }
}

const portfolioQl = () => {
    return `query getPhotos($id: ID) {
        portfolio(id: $id) {
  	        data {
                attributes {
                    title
                    images(pagination: {
                        limit: 1000
                    }) {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        } 
    }
`
}
export const portfolioAPI = {
    getGallery(id) {
        return instance.post('', {query: portfolioQl(), variables: {"id": id}})
            .then(response => {
                const attributes = response.data.data.portfolio.data.attributes
                const title = attributes.title
                const images = attributes.images.data.map(img => {
                    return img.attributes.url
                })

                return {title, images}
            })
    }
}

const orderQl = `
    query getContent {
  orders {
    data {
      attributes {
        content
      }
    }
  }      
}
`
export const orderAPI = {
    getContent() {
        return instance.post('', {query: orderQl})
            .then(response => response.data.data.orders.data[0].attributes.content)
    }
}