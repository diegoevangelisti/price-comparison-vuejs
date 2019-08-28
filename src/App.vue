<template>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 style="display: block; margin: auto; text-align: center">Price comparison</h2>
                <h3 style="display: block; margin: auto; text-align: center">Countdown - New World</h3>
                <button id="button" class="btn btn-primary" v-on:click="seen = true" @click="fetchData()">Get
                    data</button>
                <button class="btn btn-primary" v-on:click="seen = !seen">Show/hide</button>
                <input type="text" class="form-control mr-sm-2" v-model="search" placeholder="Search products">
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <div v-if="seen">

                    <ul>
                        <h1>Countdown</h1>
                        <li class="list-group-item" v-for="(p, index) in filteredProductsCountdown" :key="index"
                            v-bind:style="p.product_price.normal_price == minimal? {fontWeight: 700}:{fontWeight: 100}">
                            {{index+1}} - {{ p.product_name}} - {{p.product_price.normal_price}} NZD
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-6">
                <div v-if="seen">
                    <ul v-if="seen">
                        <h1>New World</h1>
                        <li class="list-group-item" v-for="(p, index) in filteredProductsNW" :key="index"
                            v-bind:style="p.product_price.normal_price ?  { fontWeight: bold} : {fontWeight: bold}">
                            {{index+1}} - {{ p.product_name}} - {{p.product_price.normal_price}} NZD
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
    export default {
        data() {
            return {
                countdown: [],
                new_world: [],
                seen: false,
                search: '',
                prices: [],
                word: ''
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
                    return p.product_name.match(this.search);
                })
            },
            filteredProductsNW() {

                return this.new_world[0].filter((p) => {
                    return p.product_name.match(this.search);
                })
            },
            minPrice() {
                return this.countdown[0].filter((p) => {

                    if (p.product_name.match(this.search) != this.word) {
                        console.log(p.product_price.normal_price)
                        console.log(this.word)
                        this.minimal = p.product_price.normal_price;
                        return p.product_name.match(this.search);
                    }
                    if (p.product_price.normal_price < this.minimal) {
                        this.minimal = p.product_price.normal_price;
                        this.word = p.product_name.match(this.search);
                    }
                    return p.product_name.match(this.search);
                })
            }
        }
    }
</script>