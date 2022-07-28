<template>
  <vue2BaseDropzone
    :id="'dropzone' +  + uniqueId"
    :options="dropzoneOptions"
    :destroy-dropzone="false"
    @vdropzone-sending="sendParams"
    @vdropzone-removed-file="deleteImage"
    @vdropzone-mounted="mounted"
    :ref="'myVueBaseDropzone' + uniqueId"
  ></vue2BaseDropzone>
</template>

<script>
import { axios } from "we-axios";
import vue2BaseDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "BaseDropzone",
  data: () => ({
      uniqueId: Math.floor(Math.random() * 300)
  }),
  components: {
      vue2BaseDropzone
  },
  props: {
    batchId: String,
    collection: {
        type: String,
        default: "thumbnail"
    },
    images: {
      type: Array,
      default: null,
    },
    placeholder: {
        type: String,
        default: "عکس مورد نظر را اینجا بیندازید."
    }
  },
  computed: {
      dropzoneOptions(){
          return {
      url: "/api/v1/file",
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      headers: {
        "My-Awesome-Header": "header value",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      addRemoveLinks: true,
      dictDefaultMessage:this.placeholder,
      dictCancelUpload: "لغو",
      dictRemoveFile: "حذف",
    }
      }
  },
  methods: {
    sendParams(file, xhr, formData) {
      formData.append("batch_id", this.batchId);
      formData.append("collection", this.collection);
    },
    deleteImage(file) {
      if (file.status === "success") {
        if (file["xhr"]) {
          let xmlObj = JSON.parse(file["xhr"].response);
          axios.delete(`/v1/file/${xmlObj.data.id}`);
        } else {
          axios.delete(`/v1/file/${file.id}`);
        }
      }
    },
    mounted() {
        if (this.images) {
            for (let image of this.images) {
            if (typeof image == 'object') {
                let file = {
                    size: image.size.replace(' KB', ''),
                    name: image.file_name,
                    type: image.mime_type,
                    status: 'success',
                    id: image.id,
                };
                let url = image.thumbnail;
                this.$refs['myVueBaseDropzone' + this.uniqueId].manuallyAddFile(file, url);
            }
        }
      }
    },
  },
};
</script>

<style>
.vue-dropzone {
  border: #ffffff !important;
  width: 100%;
  background-color: #f4e8d3;
  min-height: 200px;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
}

.dz-filename {
  display: none;
}

.dz-size {
  display: none;
}

.dz-image-preview * {
  z-index: 1 !important;
}

.vue-dropzone > .dz-preview .dz-remove {
  margin-left: 0 !important;
  left: 50%;
  transform: translateX(-50%);
}

.vue-dropzone > .dz-preview .dz-details {
  background-color: #d3d3d3ba;
}

.dz-image img {
  object-fit: cover !important;
}
</style>
