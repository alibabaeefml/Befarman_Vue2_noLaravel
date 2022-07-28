
<template>
    <div :class="`we-icon-tile ${theme}`">
        <div class="static-content WM-Block WM-Align-C Relative"
            :style="'background-image: linear-gradient(' + GradientDirection + ', #' + GradientBegin + ' , #' + GradientEnd + '); height: ' + height + 'px; border:' + border + ''">
            <div class="Content">
                <v-icon :style="'color:' + Iconcolor" class="ic">WMi-{{ icon }}</v-icon>
                <div class="info">
                    <div :style="'color:' + Fa_title_color" class="Fa medium"> {{ TitleFa }} </div>
                    <div :style="'color:' + Fa_title_color" class="En"> {{ TitleEn }} </div>
                    <div class="desc Fa Thin" v-if="Desc != ''" v-html="Desc"></div>
                </div>
            </div>

        </div>
        <div class="numberic">
            <h1 :style="'color:' + Fa_title_color" class="number">{{ numberic }}</h1>
            <h4 :style="'color:' + Fa_title_color" class="DES">{{ DES }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // Tile:TileData,
        height: { default: "180px" },
        theme: { default: "theme-black" },
        Iconcolor: { default: "#686868" },
        // --------------------------------------------
        TitleFa: { default: " عنوان بخش " },
        TitleEn: { default: " Section Title " },
        Desc: { default: "" },
        // --------------------------------------------
        GradientDirection: { default: "to right" },
        GradientBegin: { default: "eeeeee" },
        GradientEnd: { default: "dadada" },
        border: { default: "" },
        // --------------------------------------------
        icon: { default: "" },
        iconColor: { default: "black" },
        // --------------------------------------------
        Quantity: { default: "" },
        QuantitySize: { default: "100" },
        QuantityClass: { default: "quantity" },
        QuantityColor: { default: "#9e9e9e" },
        QuantityTopLabel: { default: "#" },
        QuantityBottomLabel: { default: "" },
        //--------------------------------------------
        numberic: { default: "" },
        DES: { default: "" },
        Fa_title_color: { default: "" },
    },
}
</script>

<style scoped lang="scss">
* {
    text-decoration: none;
}

.numberic {
    position: absolute;
    top: 10%;
    left: 105px;
    font-family: 'monserat_bold';
}

.number {
    font-size: 80px;
    float: left;
}

@media only screen and (max-width:700px) {
    .numberic {
        position: absolute;
        top: 3%;
        left: 86px;
        font-family: "monserat_bold";
    }

    .number {
        font-size: 35px;
    }
}

.medium {
    font-family: 'yekan_medium';
}

.DES {
    width: 10px;
    position: absolute;
    top: 20%;
    left: -20px;
    font-family: 'yekan_medium';
    direction: rtl;
}


.we-icon-tile {
    width: 100%;
    padding: 5px;
    transition: 0.5s;
    border: 1px solid transparent;
    position: relative;
}

.ic {
    float: right;
}

.info {
    width: 403px;
}

.we-icon-tile.no-background .static-content {
    background: none !important;
}

.we-icon-tile:hover {
    border: 1px solid #6d6d6d;
    border-radius: 5px;
}

.we-icon-tile .static-content {
    transition: 0.5s;
    direction: rtl;
}

.we-icon-tile:hover .static-content {
    filter: grayscale(100%);
}

.we-icon-tile.Shadowed {
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, .5);
    border-radius: 5px;
}

.we-dark .we-icon-tile.Shadowed {
    box-shadow: none;
}

.we-icon-tile .WM-Block {
    border-radius: 5px;
}

.static-content {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 150px;
}

.we-icon-tile.content-right .static-content {
    justify-content: right;
    padding-right: 50px;
}

.Content {
    padding-top: 10px;
    margin-right: 10%;
}

.Content .v-icon {
    font-size: 80px;
}

.we-icon-tile.icon-60 .Content .v-icon {
    font-size: 60px;
}

.we-icon-tile.icon-50 .Content .v-icon {
    font-size: 50px;
}

.we-icon-tile.icon-ml-10 .Content .v-icon {
    margin-left: 10px;
    margin-right: -10px;
}

.we-icon-tile.icon-ml-5 .Content .v-icon {
    margin-left: 5px;
    margin-right: -5px;
}

.Inline .info .Fa {
    margin-right: 15px;
}

.Inline .Content {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 0px;
}

.Inline .Content .info {
    text-align: right;
}

.we-icon-tile .info .Fa:not(.desc) {
    font-size: 26px;
}

.we-icon-tile .info .En {
    font-size: 15px;
    letter-spacing: 15px;
    text-transform: uppercase;
    opacity: 0.7;
    font-family: 'monserat_medium';

}

.we-icon-tile .info .desc {
    display: block;
    font-size: 14px;
    direction: rtl;
    overflow: hidden;
    clear: both;
    max-height: 0px;
    transition: max-height .4s cubic-bezier(1, 0, .2, 1);
}

.RTL.we-icon-tile img {
    margin-right: 30px;
}





.we-icon-tile:hover {
    width: 100%;
}

.we-icon-tile:hover {
    opacity: 1;
}

.we-icon-tile:hover .info .desc {
    max-height: 90px;
}

.we-icon-tile:hover .quantity .number {
    transition-delay: 0s;
}

.we-icon-tile:hover {
    transition-delay: 0.28s;
}

.we-icon-tile:hover {
    transition-delay: 0.58s;
}


.we-icon-tile.sm .info .En {
    font-size: 10px;
    letter-spacing: 10px;
    margin-right: -10px;
    margin-top: -3px;
}

.we-icon-tile.sm .info .Fa {
    font-size: 26px;
}

.v-application .info {

    background-color: transparent !important;
    border-color: transparent !important;
}
</style>
