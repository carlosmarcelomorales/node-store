const {faker} = require("@faker-js/faker");
const boom = require('@hapi/boom');

class ProductService {

    constructor() {
        this.products = [];
        this.generate()
    }

    generate() {
        const limit = 100;
        for (let i = 1; i <= limit; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
                isBlock: faker.datatype.boolean()
            })
        }
    }

    async create(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const newProduct = {
                    id: faker.string.uuid(),
                    ...data
                }
                this.products.push(newProduct);
                resolve(newProduct);
            }, 1000)
        })

    }

    async find() {
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 3000)
        })
    }

    async findOne(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const product = this.products.find(item => item.id === id)
                if (!product) {
                    reject(boom.notFound('product not found'))
                }
                if ( product.isBlock) {
                    reject(boom.conflict('product is block'))
                }
                resolve(product);
            }, 1000)
        })
    }

    async update(id, changes) {
        console.log('entro update')
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.products.findIndex(item => item.id === id);
                if (index === -1) {
                    // throw boom.notFound(`Product with id ${id} not found`);
                    reject(boom.notFound('product not found'));
                }
                const product = this.products[index]
                this.products[index] = {
                    ...product,
                    ...changes
                }
                resolve(this.products[index]);
            }, 1000)
        })

    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.products.findIndex(item => item.id === id);
                if (index === -1) {
                    throw boom.notFound("Product not found");
                }

                this.products.splice(index, 1);
                resolve({ message: true});
            }, 1000)
        })

    }
}

module.exports = ProductService;