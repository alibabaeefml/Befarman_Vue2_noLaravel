<template>
    <BaseModal
        title="لیست نظرات"
        subtitle="Comment Car"
        width="900"
        name="commentList"
        icon="WMi-car-side"
        @open="setData"
    >
        <v-card-text style="height: 440px;  overflow-y: scroll;">
            <v-row v-for="(comment, i) in comments" :key="i">
                <v-col cols="8">
                    <h3>{{comment.title}}  <span>({{comment.vote}})</span></h3>
                    <p>{{comment.content}}</p>
                </v-col>
                <v-col cols="2">
                    {{ comment.author_name }}
                </v-col>
                <v-col cols="2">
                    {{convertToJalaliDate(comment.created_at)}}
                </v-col>
            </v-row>
        </v-card-text>
    </BaseModal>
</template>

<script>
import Owner from "../Global/Owner-Info/Owner-Info";
import Status from "@/components/CarRent/rentCarStatus/Status";
import Owner1 from "../Global/Owner-Info/Owner";
import {convertToJalali} from "../Global/jalali-date";
let currentUser = JSON.parse(localStorage.getItem("user"));
export default {
    name: "commentList",
    data: () => ({
        isAdmin: currentUser ? !!currentUser.is_admin : false,
        comments: []
    }),
    components: {
        Owner,
        Status,
        Owner1
    },
    methods: {
        convertToJalaliDate(date) {
            if (this.isDate(date)) {
                return convertToJalali(date);
            } else {
                return date;
            }
        },
        isDate(date ) {
            return !!(date && !(+(date)) && Date.parse(date));
        },
        setData() {
            let {comments, type} = this.$_getData("commentList");
            this.comments = comments;
        }
    },
};
</script>

<style scoped>

.Carousel{
    width: 100%;height: 100%
}
.more {
    position: absolute;
    left: 15px;
    top: 21%;
}

</style>
