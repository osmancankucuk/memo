<template>
  <div class="home">
    <div class="container">
    <h4>Choose category</h4>
    <select name="" id="" v-model="curCategory">
      <option value="">Choose</option>
      <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
        {{ option.text }}
      </option>
    </select>
      <div class="row" v-if="!finished && curCategory">
        <h2>Gunluk pratik</h2>
        <div class="col-4">
          <div class="card mb-3">
            <div class="card-body">
              <p class="card-text">{{ questions[curCategory][index[curCategory]].q }}</p>
              <p v-if="isRevealed">{{ questions[curCategory][index[curCategory]].a }}</p>
              <button class="btn btn-primary" @click="reveal" v-if="!isRevealed">Goster</button>
              <button class="btn btn-success" v-show="isRevealed"
              @click="remembered">Hatirladim</button>
              <button class="btn btn-danger" v-show="isRevealed"
              @click="notRemembered">Hatirlayamadim</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body" v-if="finished">
        Gunluk pratigini tamamladin
      </div>
      <div class="card-body" v-if="allDone">
        Butun kategorileri tamamladin
      </div>
    </div>

        <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  // components: {
  //   HelloWorld,
  // },
  created() {
    this.getDefaultOptions();
  },
  computed: {
    finished() {
      if (this.curCategory === '') {
        return false;
      }

      return this.questions[this.curCategory].length === this.index[this.curCategory];
    },
    allDone() {
      let finishedCategoryCount = 0;
      Object.keys(this.index).forEach((key) => {
        if (this.questions[key].length === this.index[key]) {
          finishedCategoryCount += 1;
        }
      });

      return finishedCategoryCount === Object.keys(this.questions).length;
    },
  },
  watch: {
    curCategory() {
      this.isRevealed = false;
    },
  },
  methods: {
    getDefaultOptions() {
      const defaultOptions = [
        {
          text: 'Geography',
          value: 'geography',
        },
        {
          text: 'History',
          value: 'history',
        },
        {
          text: 'Science',
          value: 'science',
        },
        {
          text: 'Technology',
          value: 'tech',
        },
      ];

      if (localStorage.getItem('categories')) {
        this.options = JSON.parse(localStorage.getItem('categories'));
      } else {
        this.options = defaultOptions;
      }
    },
    reveal() {
      this.isRevealed = true;
    },
    remembered() {
      this.nextQuestion();
    },
    notRemembered() {
      this.nextQuestion();
    },
    nextQuestion() {
      this.isRevealed = false;
      this.index[this.curCategory] += 1;
    },
  },
  data() {
    return {
      index: {
        geography: 0,
        history: 0,
        science: 0,
      },
      isRevealed: false,
      curCategory: '',
      options: [],
      questions: {
        geography: [{
          q: 'Turkiye\'nin baskenti neresidir?',
          a: 'Ankara',
        }, {
          q: 'En kalabalik ilimiz hangisidir?',
          a: 'Istanbul',
        }, {
          q: 'En az nufusa sahip ilimiz hangisidir?',
          a: 'Bayburt',
        }],
        history: [{
          q: 'HS: En az nufusa sahip ilimiz hangisidir?',
          a: 'Bayburt',
        }],
        science: [{
          q: 'SC: En az nufusa sahip ilimiz hangisidir?',
          a: 'Bayburt',
        }],
      },
    };
  },
};
</script>

<style>

</style>
