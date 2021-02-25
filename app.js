var app = new Vue({
  el: '#app',
  created() {
  },
  computed: {
    finished() {
      return this.questions.length === this.index
    },
  },
  methods: {
    reveal() {
      this.isRevealed = true
    },
    remembered() {
      this.nextQuestion()
    },
    notRemembered() {
      this.nextQuestion()
    },
    nextQuestion() {
      this.isRevealed = false
      this.index += 1;
    }
  },
  data() {
    return {
      index: 0,
      isRevealed: false,
      questions: [{
        q: "Turkiye'nin baskenti neresidir?",
        a: "Ankara",
      }, {
        q: "En kalabalik ilimiz hangisidir?",
        a: "Istanbul",
      }, {
        q: "En az nufusa sahip ilimiz hangisidir?",
        a: "Bayburt",
      }]
    }
  }
})
