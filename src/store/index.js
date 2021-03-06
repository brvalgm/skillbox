import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccessKey: null,
        cartPoductsData: [],
        orderInfo: []
    },
    mutations: { 
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo;
        },
        resetCart(state) {
            state.cartProducts = [];
            state.cartPoductsData = [];
        },       
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(i => i.productId === productId);

            if (item) {
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
        },
        updateAccessKey(state, accessKey) {
            state.userAccessKey = accessKey;
        },
        updateCartProductsData(state, cartProducts) {
            state.cartPoductsData = cartProducts;
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartPoductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                }
            })
        }
    },
    getters: {
        cartDetailProducts(state) { 
            return state.cartProducts.map(item => {
                const product = state.cartPoductsData.find(p => p.product.id === item.productId).product;

                return {
                    ...item,
                    product : {
                       ...product,
                       image: product.image.file.url                                               
                    }
                }
            })
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
        },
        cartTotalAmount(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => item.amount + acc, 0);
        },
        cartOrderInfo(state) {
            return state.orderInfo ;
        }
    },
    actions: {
        loadOrderInfo(context, orderId) {
            return axios
                .get(API_BASE_URL + 'api/orders/' + orderId, {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => 
                    context.commit('updateOrderInfo', response.data)
                )
        },
        loadCart(context) {
            return axios
                .get(API_BASE_URL + 'api/baskets', {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    if (!context.state.userAccessKey) {
                        localStorage.setItem('userAccessKey', response.data.user.accessKey);
                        context.commit('updateAccessKey', response.data.user.accessKey);
                    }
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');
                });
        },
        addProductToCart(context, {productId, amount}) {
            return (new Promise(resolve => setTimeout(resolve, 2000)))
                .then(() => {
                    return axios
                        .post(API_BASE_URL + 'api/baskets/products', {
                            productId: productId,
                            quantity: amount                
                        }, {
                            params: {
                                userAccessKey: context.state.userAccessKey
                            }
                        })
                        .then(response => {
                            context.commit('updateCartProductsData', response.data.items);
                            context.commit('syncCartProducts');
                        })
                    })
        },
        updateCartProductAmount(context, {productId, amount}) {
            context.commit('updateCartProductAmount', {productId, amount});

            return axios
                .put(API_BASE_URL + 'api/baskets/products', {
                    productId: productId,
                    quantity: amount                
                }, {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);                    
                })
                .catch(() => {
                    context.commit('syncCartProducts');
                })
        },
        deleteCartProduct(context, productId) {
            context.commit('deleteCartProduct', productId);

            return axios
                .delete(API_BASE_URL + 'api/baskets/products', {
                    data: {
                        'productId': productId
                    },
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                    
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);                    
                })
                .catch(() => {
                    context.commit('syncCartProducts');
                })      
        }
    }
});