var app = new Vue({
  el: '#app',
  created() {
     fetch('./data.json')
     .then((res) => { return res.json() })
     .then((res) => {
        this.categories = res.categories;
        this.categoryNames = res.categoryNames;
        this.saveCategories()
        this.getCategoryNames()
        
     })
      
  },
  mounted(){
    if(localStorage.getItem('categories')) {
      try {
        this.categories = JSON.parse(localStorage.getItem('categories'));
      } catch(e) {
        localStorage.removeItem('categories');
      }
    }
  },
  computed: {
    practiceFinished() {
      console.log(this.index);
      if(!this.isPracticeFinished) {
        
        this.index = 0
        this.isPracticeFinished = true
        this.isCategoryChoosed = false
        // console.log(this.index)
        // console.log(this.isPracticeFinished)
        return false
      }
      console.log(this.index);
        return this.categories[this.selectedCategory].length === this.index
    },
  },
  methods: {
    optionChoosed(x) {
      switch (x) {
        case 1:
          this.showSelectionMenu = true
          break;
        case 2:
          this.showAddMenu = true
          break;
        case 3:
          this.showRemoveMenu = true
          break;
        case 4:
          this.showSelectionMenu = false
          this.showAddMenu = false
          this.showRemoveMenu = false
          break;
        case 5:
          this.isPracticeFinished = false
          this.correctAnswer=0;
          break;
      }
      if (this.showMainMenu === true) {
        this.showMainMenu = false
      } else {
        this.showMainMenu = true
      }
    },
    getCategoryNames() {
      this.categoryNames = Object.keys(this.categories)
      this.saveCategoryNames()
    },
    setCategoryName(newCategoryName, index) { 
      this.categoryNames[index] = newCategoryName;
      this.saveCategoryNames()      
    },
    saveCategoryNames() {
      const parsed = JSON.stringify(this.categoryNames);
      localStorage.setItem('categoryNames', parsed); 
    },
    addCategory() {
      if (!this.newCategory) {
        return;
      }
      this.categories.push(this.newCategory);
      this.newCategory = '';
      this.saveCategories();
    },
    removeCategory(x) {
      this.categories.splice(x, 1);
      this.saveCategories();
    },
    saveCategories() {
      const parsed = JSON.stringify(this.categories);
      localStorage.setItem('categories', parsed);
    },
    addNewQuestion() {
      if(!this.newQuestion && !this.newAnswer) { return }
      console.log("Current Questions --> " +this.newQuestionArray)
      console.log("Current Answers --> " +this.newAnswerArray)
      this.newQuestionArray[this.newIndex] = this.newQuestion
      this.newAnswerArray[this.newIndex] = this.newAnswer
      this.newQuestion = ''
      this.newAnswer = ''
      this.newIndex += 1
      this.showFirstRow = false
      console.log("NEW Questions --> " +this.newQuestionArray)
      console.log("NEW Answers --> " +this.newAnswerArray)
    },
    deleteNewQuestion(item) {
      let deletedIndex = this.newQuestionArray.indexOf(item)
      this.newQuestionArray.splice(deletedIndex,1)
      this.newAnswerArray.splice(deletedIndex,1)
      this.newIndex -=1
    },
    reveal() {
      this.isAnswerRevealed = true
    },
    remembered() {
      this.correctAnswer+=1;
      this.nextQuestion()
    },
    notRemembered() {
      this.nextQuestion()
    },
    nextQuestion() {
      this.isAnswerRevealed = false
      this.index += 1;
      console.log(this.index);
    },
    selectedCategorySet(name) {
      this.selectedCategory = name
      this.isCategoryChoosed = true
      this.showSelectionMenu = false
    },
    removeMenuButtonCleanup(n) {
      return this.categoryNames.length-1 === n
    },
    showTable() {
      if (this.isTableShowed) { 
        this.isTableShowed = false
      } else { 
        this.isTableShowed = true
      }
    }
  },
  data() {
    return {
      index: 0,
      newIndex: 0,
      isTableShowed: false,
      isPracticeFinished: true,
      isAnswerRevealed: false,
      isCategoryChoosed: false,
      showFirstRow: true,
      showMainMenu: true,
      showSelectionMenu: false,
      showAddMenu: false,
      showRemoveMenu: false,
      selectedCategory: "",
      categories: {},
      categoryNames:[],
      newCategory: [],
      newQuestionArray: [],
      newAnswerArray: [],
      deletedItem: "",
      newQuestion: null,
      newAnswer: null,
      newCategoryName: null,
      correctAnswer:0
    }
  }
})
