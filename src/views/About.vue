<template>
  <div class="about">
    <h1>This is an about page</h1>
    <pre><code>{{ categories }}</code></pre>
    <input type="text" v-model="newCategoryName">
    <button @click="addCategory">Add category</button>
  </div>
</template>

<script>

export default {
  name: 'About',
  created() {
    this.getDefaultCategories();
  },
  methods: {
    getDefaultCategories() {
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
        this.categories = JSON.parse(localStorage.getItem('categories'));
      } else {
        this.categories = defaultOptions;
      }
    },
    addCategory() {
      this.categories.push({
        text: this.newCategoryName,
        value: this.newCategoryName.trim().toLowerCase(),
      });

      localStorage.setItem('categories', JSON.stringify(this.categories));
    },
  },
  data() {
    return {
      newCategoryName: '',
      categories: [],
    };
  },
};
</script>
