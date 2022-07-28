<template>
  <div>
    <Details/>
    <Header @scrollToResults="scrollToResults" />
    <attributs />
    <div ref="searchResults">
      <Search-result v-if="searchResultsVisible" />
    </div>
    <Footer/>
  </div>
</template>

<script>

import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import Details from "../components/CarRent/Details";
import attributs from "../components/Home/Attributes";
import SearchResult from "../components/Home/SearchResult";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "main-home",
  components: { Header, Footer, attributs, SearchResult,Details },
  data() {
    return {
      searchResultsVisible: false,
    };
  },
  methods: {
    ...mapMutations("RentCarsPublic", ["SET_RENT_CARS_FILTERS_PUBLIC"]),
    scrollToResults() {
      this.searchResultsVisible = true;

      let searchResultsContainer = this.$refs.searchResults;
      searchResultsContainer.style.minHeight = "400px";

      searchResultsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
  },
  computed: {
    ...mapGetters("RentCarsPublic", ["getRentCarsPublic"]),
  },
};
</script>

<style scoped>
</style>
