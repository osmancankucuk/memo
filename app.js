var app = new Vue({
  el: '#app',
  created() {
  },
  computed: {
    finished() {
      if(this.curCategory === ''){
        return false
      }
      return this.questions[this.curCategory].length === this.index[this.curCategory]         
    },
    allDone() {
      let finishedCategoryCount = 0;
      Object.keys(this.index).forEach((key) => {
        if (this.questions[key].length === this.index[key]) {
          finishedCategoryCount += 1
        }
      })

      return finishedCategoryCount === Object.keys(this.questions).length
    }
  },
  watch: {
    curCategory() {
      this.isRevealed = false
    }
  },
  methods: {
    selectCategory(category){
      this.curCategory = category;
    },  
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
      this.index[this.curCategory] += 1;
    },
    openFieldsMenu(){
      this.curCategory = '';
    },
  },
  data() {
    return {
      curCategory: '',
      isRevealed: false,
      index: {
        geography: 0,
        history: 0,
        english: 0,
        philosophy: 0,
      },
      questions: {
        geography: [
            { q: "Türkiye kaçıncı saat dilimindedir?",
              a: "+3",
            }, {
              q: "Yüz ölçümü en büyük ilimiz hangisidir?",
              a: "Konya",
            }, {
              q: "En az nüfusa sahip ilimiz hangisidir?",
              a: "Bayburt",
            }
        ],
        history: [
            {
              q: "İstanbul'un fethi ne zamandır?",
              a: "29 Mayıs 1453",
            }, {
              q: "Hz. İsa'nın doğumu kaç yılındadır?",
              a: "0",
            }, {
              q: "Roma İmparatorluğu kuruluş yılı ne zamandır?",
              a: "MÖ 27",
            }
        ],
        english: [
            {
              q: "What does 'simultaneous' mean?",
              a: "Eş Zamanlı",
            }, {
              q: "What does 'scarab' mean?",
              a: "Bok böceği",
            }, {
              q: "What does 'success' mean??",
              a: "Başarı",
            }
        ],
        philosophy: [
          {
            q: "Düşünüyorum o halde varım sözü kime aittir?",
            a: "Descartes",
          }, {
            q: "Platon veya Eflatun olarak tanınan felsefecinin asıl ismi nedir?",
            a: "Aristocles",
          }
        ],
      }           
    }
  },

})

