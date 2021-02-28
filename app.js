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
    if(localStorage.getItem('categoryNames')) {
      try {
        this.categoryNames = JSON.parse(localStorage.getItem('categoryNames'));
      } catch(e) {
        localStorage.removeItem('categoryNames');
      }
    }
  },
  watch: {
    isEditCurrent() {
      this.categories = JSON.parse(localStorage.getItem('categories'));
    },
    isGetBack() {
      this.categories = JSON.parse(localStorage.getItem('categories'));
    },
  },
  computed: {
    practiceFinished() {
      console.log(this.index);
      if(!this.isPracticeFinished) {
        this.index = 0
        this.isPracticeFinished = true
        this.isCategoryChosen = false
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
        case 4:
          this.showSelectionMenu = false
          this.showAddMenu = false
          break;
        case 5:
          this.isPracticeFinished = false
          this.correctAnswer = 0;
          break;
        case 6:
          this.showAddMenu = false
          this.isEditCurrent = true
          this.isGetBack = false
          this.isEditCategoryChosen = false
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
    saveCategories() {
      const parsed = JSON.stringify(this.categories);
      localStorage.setItem('categories', parsed);
    },
    editMenuOption(chosen) {
      this.isTableShowed = false
      if(chosen === "new") {
        this.showFirstRow = true
        this.isEditCurrent = false
        this.isEditCategoryChosen = false
      } else {
        this.isEditCurrent = true
        this.showFirstRow = false
        this.isTableShowed = true
      }
      this.newQuestion = ''
      this.newAnswer = ''
      this.newCategoryName = ''
    },
    addNewQuestion() {
      if(!this.newQuestion && !this.newAnswer) { return }
      if(this.isEditCategoryChosen) {
        this.categories[this.selectedCategory].push({})
        this.categories[this.selectedCategory][(this.categories[this.selectedCategory].length)-1].q = this.newQuestion
        this.categories[this.selectedCategory][(this.categories[this.selectedCategory].length)-1].a = this.newAnswer
      } else {
        console.log("Current Questions --> " +this.newQuestionPool.q)
        console.log("Current Answers --> " +this.newQuestionPool.a)
        this.newQuestionPool.q.push(this.newQuestion)
        this.newQuestionPool.a.push(this.newAnswer)
        console.log("NEW Questions --> " +this.newQuestionPool.q)
        console.log("NEW Answers --> " +this.newQuestionPool.a)
      }
      this.newQuestion = ''
      this.newAnswer = ''
      this.showFirstRow = false
    },
    deleteCurrentQuestion(item) {
      for (let i = 0; i < this.categories[this.selectedCategory].length; i++) {
        if(this.categories[this.selectedCategory][i] === item)
        var deletedIndex = i
      }
      console.log(deletedIndex)
      this.categories[this.selectedCategory].splice(deletedIndex,1)
      if(this.categories[this.selectedCategory].length === 0) {
        this.showFirstRow = true
      }
    },
    deleteNewQuestion(question, answer) {
      let deletedIndex = this.newQuestionPool.q.indexOf(question)
      if(deletedIndex === this.newQuestionPool.a.indexOf(answer)) {
        this.newQuestionPool.q.splice(deletedIndex,1)
        this.newQuestionPool.a.splice(deletedIndex,1)
        console.log("NEW Questions --> " +this.newQuestionPool.q)
        console.log("NEW Answers --> " +this.newQuestionPool.a)
      }
      if(this.newQuestionPool.q.length === 0) {
        this.showFirstRow = true
      }
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
      if(this.categories[name].length === 0) {
        this.showFirstRow = true
      } else {
        this.showFirstRow = false
      }
      this.selectedCategory = name
      if(this.showAddMenu && this.isEditCurrent) {
        this.isEditCategoryChosen = true
        this.isTableShowed = true
      } else {
        this.isCategoryChosen = true
        this.showSelectionMenu = false
      }
    },
    showTable() {
      if(this.isTableShowed === true) {
        this.isTableShowed = false
      } else {
        this.isTableShowed = true
      }
    }
  },
  data() {
    return {
      index: 0,
      isGetBack: true,
      isTableShowed: false,
      isPracticeFinished: true,
      isAnswerRevealed: false,
      isCategoryChosen: false,
      isEditCategoryChosen: false,
      isEditCurrent: true,
      showMainMenu: true,
      showFirstRow: false,
      showSelectionMenu: false,
      showAddMenu: false,
      selectedCategory: "",
      categories: {},
      categoryNames:[],
      newQuestionPool: {"q":[],"a":[]},
      newAnswerArray: [],
      deletedItem: "",
      newQuestion: null,
      newAnswer: null,
      newCategoryName: null,
      correctAnswer:0
    }
  }
})
