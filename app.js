var app = new Vue({
  el: "#app",
  created() {},
  computed: {
    finished() {
      if (this.curCategory === "") {
        return false;
      }

      return (
        this.questions[this.curCategory].length === this.index[this.curCategory]
      );
    },
    allDone() {
      console.log("triggered");
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
      curCategory: "",
      questions: {
        geography: [
          {
            q: "Turkiye'nin baskenti neresidir?",
            a: "Ankara",
          },
          {
            q: "En kalabalik ilimiz hangisidir?",
            a: "Istanbul",
          },
          {
            q: "En az nufusa sahip ilimiz hangisidir?",
            a: "Bayburt",
          },
        ],
        history: [
          {
            q: "HS: En az nufusa sahip ilimiz hangisidir?",
            a: "Bayburt",
          },
        ],
        science: [
          {
            q: "SC: En az nufusa sahip ilimiz hangisidir?",
            a: "Bayburt",
          },
          {
            q: "SC: En az nufusa sahip ilimiz hangisidir?",
            a: "Bayburt",
          },
        ],
      },
    };
  },
});
