<template>
    <div class="upload-example width-full" >
        <cropper classname="upload-example-cropper" style="width: 100%;" :stencil-props="stencilProps" @change="onChangeCropper" :src="image" />
        <div class="button-wrapper" >
            <v-btn
                style="width: 100%"
                @click.native="$refs['image_'+uniqueId].click()"
                large
                :color="color"
                dark
            >
                <input
                    type="file"
                    :ref="'image_'+uniqueId"
                    :name="'image_' + uniqueId"
                    v-show="false"
                    @change="uploadImage($event)"
                    accept="image/*"
                />
                <v-icon dark>{{icon}}</v-icon>{{name}}
            </v-btn>
        </div>
    </div>
</template>
<script>
    import { Cropper } from "vue-advanced-cropper";
    import 'vue-advanced-cropper/dist/style.css';
    export default {
        name: 'CropperImage',
        props: {
            veeName: {
                type: String,
            },
            veeRules: {
                type: String,
            },
            vid: {
                type: String,
            },
            name: {
                default: 'آپلود عکس'
            },
            icon: {
                default: 'WMi-upload'
            },
            color: {
                default: 'black'
            },
            stencilProps: {
                default: () => ({aspectRatio: 1, checkImageOrigin: false})
            },
            crop_data: {
                default: () => ([])
            },
            value: {
                default: ''
            },
            url: {
                default: ''
            }
        },
        components: {
            Cropper
        },
        data: () => ({
            uniqueId: Math.floor(Math.random() * 10000),
            disabled: false,
        }),
        computed: {
            image: {
                get() {
                    return this.url ? this.url : '';
                },
                set(value) {
                    this.$emit('update:url', value);
                }
            },
            file: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            },
            theme() {
                return this.dark ? 'theme--dark' : 'theme--light';
            }
        },
        methods: {
            async uploadImage(event) {
                // Reference to the DOM input element
                let input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0])
                {
                    //set v-model
                    this.file = input.files[0];

                    // create a new FileReader to read this image and convert to base64 format
                    let reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = e => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.image = e.target.result;
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
            },
            onChangeCropper({coordinates}) {
                this.$emit('update:crop_data', coordinates);
            },
            checkDisable(){
                if (this.url) {
                    this.disabled = true;
                }
            }
        },
        watch: {
            url() {
                this.checkDisable();
            }
        },
        created() {
            this.checkDisable();
        }
    }
</script>
