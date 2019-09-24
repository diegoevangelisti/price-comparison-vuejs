<template>
    <div class="container-fluid">
        <div class="row w3-opacity nav">
            <div class="col-xs-12">
                <p class="title">Countdown vs New World</p>
            <p class="sub-title">Search the product you like and check the difference</p>
            </div>
        </div>
        <div class="row" style="margin: 30px 0px 0px 0px">
            <div class="col-12">
                <input class="form-control mr-sm-2 search" type="text" v-model="search" v-on:click="seen=true"
                    @click="fetchData()" placeholder="Search products">
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <div v-if="seen">
                    <ul>
                        <p class="countdown">Countdown (<span>{{filteredProductsCountdown.length}}</span>)</p>
                        <li class="list-group-item" v-for="(p, index) in filteredProductsCountdown" :key="index">
                            {{ p.product_name}} <span
                                v-bind:style="{fontWeight: 700,fontSize: '14px',marginLeft: '8px'}">{{p.product_price.normal_price}}
                                NZD</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-6">
                <div v-if="seen">
                    <ul v-if="seen">
                        <p class="nw">New World (<span>{{filteredProductsNW.length}}</span>)</p>
                        <li class="list-group-item" v-for="(p, index) in filteredProductsNW" :key="index">
                            {{ p.product_name}} <span
                                v-bind:style="{fontWeight: 700,fontSize: '14px',marginLeft: '8px'}">{{p.product_price.normal_price}}
                                NZD</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var link = 'https://smart-shopping-application.herokuapp.com/products/json/countdown';
    var link1 = 'https://smart-shopping-application.herokuapp.com/products/json/nwm';
    import backgroundUrl from './assets/img/banner.jpeg'
    export default {
        data() {
            return {
                countdown: [],
                new_world: [],
                seen: false,
                search: '',
                prices: [],
                word: '',
                backgroundUrl
            };
        },
        filters: {
            productSearch(value) {
                return value.toUpperCase();
            }
        },
        methods: {
            fetchData() {
                this.$http.get(link)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        for (let key in data) {
                            this.countdown.push(data[key]);
                        }
                        let list = this.countdown[0];
                        for (key in list)
                            this.prices.push(list[key].product_price.normal_price)
                    }),
                    this.$http.get(link1)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        for (let key in data) {
                            this.new_world.push(data[key]);
                        }

                    })
            }
        },
        computed: {
            filteredProductsCountdown() {
                return this.countdown[0].filter((p) => {
                    return p.product_name.toLowerCase().match(this.search);
                })
            },
            filteredProductsNW() {
                return this.new_world[0].filter((p) => {
                    return p.product_name.toLowerCase().match(this.search);
                })
            },
        }
    }
</script>