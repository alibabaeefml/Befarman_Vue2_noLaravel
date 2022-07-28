<template>
    <div class="tab-container">
        <div @click="inputClick()" :class="inputClass()">
            <i class="WMi-plus  input-item-icon"></i>
            <h2 class="input-item-text">تراکنش ورودی</h2>
            <h3 class="input-item-type">INGOING</h3>
        </div>

        <div @click="outputClick()" :class="outputClass()">
            <i class="WMi-minus  input-item-icon"></i>
            <h2 class="output-item-text">تراکنش خروجی</h2>
            <h3 class="output-item-type">OUTGOING</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "addTransactionTab",
    data(){
        return{
            type : null
        }
    },
    props: {
        itemClass: {
            required: false,
            default:"tab-item"
        },
        itemtype:{default:'input'}
    },
    mounted() {
        this.type = this.itemtype
        this.$emit('changeTab',this.type)

    },
    methods: {
        inputClass(){
            if (this.type == 'input'){
                return 'input-item'
            }
            else{
                return 'deactive-input-item'

            }
        },
        outputClass(){
            if (this.type == 'output'){
                return 'output-item'
            }
            else{
                return 'deactive-output-item'
            }
        },
        outputClick(){
            this.type = 'output'
            this.$emit('changeTab',this.type)
        },
        inputClick(){
            this.type = 'input'
            this.$emit('changeTab',this.type)

        }
    },
};

</script>

<style scoped>
.tab-container {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-grow: 1;
}
.output-item{
    margin: 10px 20px;
    position: relative;
    background-color: #ee3552;
    border-radius: 30px;
    border-top-right-radius: 0px;
    width: 60%;
    height: 100px;
    box-shadow: 2px 5px 5px #ee3552;
    color: #fff;
    cursor: pointer;
}
.deactive-output-item{
    margin: 10px 20px;
    position: relative;
    border-radius: 30px;
    border: 2px solid #ee3552;
    color: #ee3552 !important;
    border-top-right-radius: 0px;
    width: 60%;
    height: 100px;
}
.deactive-input-item{
    margin: 10px 20px;
    position: relative;
    border: 2px solid #32CAD5;
    color: #32CAD5 !important;
    border-radius: 30px;
    border-top-right-radius: 0px;
    width: 60%;
    height: 100px;
}
.input-item-icon{
    position: absolute;
    top:14%;
    font-size: 50px;
}
.input-item{
    margin: 10px 20px;
    position: relative;
    color: #fff;
    background-color: #32CAD5;
    border-radius: 30px;
    border-top-right-radius: 0px;
    box-shadow: 2px 5px 5px #32CAD5;
    width: 60%;
    height: 100px;
}
.input-item-text{
    font-family: 'yekan_light';
    position: absolute;
    top:27%;
    right: 19%;
}
.input-item-type{
    font-family: 'monserat_medium';
    position: absolute;
    top:48%;
    letter-spacing: 15px;
    right: 19%;
}
.output-item-text{
    font-family: 'yekan_light';
    position: absolute;
    top:27%;
    right: 19%;
}
.output-item-type{
    font-family: 'monserat_medium';
    position: absolute;
    top:48%;
    letter-spacing: 15px;
    right: 19%;
}
.notificationsClass{
    margin-left:auto;
    margin-right:auto;
    color:gray;
    width: 100%;
    position: relative;
    padding: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.tab-border-bottom {
    position: absolute;
    width: 0px;
    height: 2px;
    bottom: 0px;
    transition: all 300ms ease-in-out;
}
.tab-border-bottom-selected {
    width: 100%;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .tab-container {
        padding: 0;
        margin: 0 -10px;
    }
    .tab-item {
        flex-grow: 1;
    }
}
</style>
