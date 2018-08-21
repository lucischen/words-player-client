import list from "../books/list"
  
function newBook(bookName) {
    var b = require(`../books/${bookName}.json`)
    return new Storage(0, 0, bookName, b.words_list)
}

function flush(list) {
    return list.sort( () => Math.random() - 0.5)
}

class Storage {
    constructor(no, word_no, bookName, words_list) {
        this.no = 0
        this.word_no = 0
        this.bookName = bookName
        this.total = words_list.length
        this.words_list = words_list
    }

    Counter() {
        return {
            no: this.word_no, 
            total: this.total
        }
    }

    GetLen() {
        return this.total
    }

    Get() {
        return this.words_list[this.word_no]
    }

    Next() {
        if(this.word_no + 1 > this.total - 1) {
            return this.words_list[this.word_no]
        } 

        this.word_no ++
        return this.words_list[this.word_no]
    }

    Prev() {
        if(this.word_no - 1 < 0) {
            return this.words_list[this.word_no]
        } 

        this.word_no --
        return this.words_list[this.word_no]
    }

    ReStart() {
        this.word_no = 0
        return this.words_list[this.word_no]
    }
}

class StorageContext {
    constructor(list) {
        var storages = []

        list.forEach(bookName => {
            storages.push(newBook(bookName))
        })
      
        this.storages = storages
    }

    Len() {
        return this.storages.length
    }

    Get(no) {
        if(no > this.storages.length){
            console.error(no + ">" + this.storages.length)
            return this.storages[0]
        }

        return this.storages[no]
    }
}

// TODO:
// 1) Change no -> name
// 2) Consider import the redux
// book storage controller
class Books {
    constructor(list) {
        this.storage = new StorageContext(list)
        this.no = 0
    }

    Counter() {
        return this.storage.Get(this.no).Counter()
    }
  
    Get() {
        return this.storage.Get(this.no).Get()
    }

    Next() {
        return this.storage.Get(this.no).Next()
    }

    Prev() {
        return this.storage.Get(this.no).Prev()
    }

    GetBookName() {
        return this.storage.Get(this.no).bookName
    }

    NextBook() {
        if(this.no + 1 > this.storage.Len() - 1) {
            
            return this.storage.Get(this.no).Get()
        }

        this.no ++
        return this.storage.Get(this.no).Get()
    }

    PrevBook() {
        if(this.no - 1 < 0) {
            return this.storage.Get(this.no).Get()
        }

        this.no --
        return this.storage.Get(this.no).Get()
    }

    ReStart() {
        return this.storage.Get(this.no).ReStart()
    }

  }

function newBooks() {
    return new Books(list.book_list)
}

export { newBooks }