const app = {
    init(selectors){
        this.items = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })


    },

    renderListItem(input){
        const ul = document.getElementById('itemList')
        const li = this.template.cloneNode(true)
        li.classList.remove('template')
        li.dataset.id = input.id
        li.querySelector('.itemName').textContent = input.name
        //console.log(li.querySelector('.actions').textContent)
        const deleteButton = li.querySelector('.actions').querySelector('.alert')
        deleteButton.addEventListener('click', ev => {
            deleteButton.parentNode.parentNode.textContent = ""
            for (var i = 0, len = this.items.length; i < len; i++) {
                if(Object.is(this.items[i], input)){
                    this.items.splice(i,1)
                }
            }
            console.log(this.items)
            //deleteButton.parentNode.parentNode.removeChild(deleteButton)            
        })

        const favoriteButton = li.querySelector('.actions').querySelector('.warning')
        favoriteButton.addEventListener('click', ev=>{
            li.style.backgroundColor = "#6699ff"
            
            for (var i = 0, len = this.items.length; i < len; i++) {
                if(Object.is(this.items[i], input)){
                    if(this.items[i].fav == true){
                        li.style.backgroundColor = "#ffffff"
                        this.items[i].fav = false
                        break
                    }else{
                        this.items[i].fav = true
                        break
                    }
                }
            }
            console.log(this.items)
        })

        const upButton = li.querySelector('.actions').querySelector('#up')
        upButton.addEventListener('click', ev=>{
            for (var i = 1, len = this.items.length; i < len; i++) {
                if(Object.is(this.items[i], input)){
                    var temp = this.items[i-1]
                    console.log(i)
                    this.items[i-1] = input
                    this.items[i] = temp
                    break
                    //ul.replaceChild(tempUl, ul.childNodes[i])
                }
            }
            this.reprintList()
            console.log(this.items)
        })

        const downButton = li.querySelector('.actions').querySelector('#down')
        downButton.addEventListener('click', ev=>{
            for (var i = 0, len = this.items.length; i < len-1; i++) {
                if(this.items[i]== input){
                    var temp = this.items[i+1]
                    console.log(i)
                    this.items[i] = temp
                    this.items[i+1] = input
                    break
                    //ul.replaceChild(tempUl, ul.childNodes[i])
                }
            }
            this.reprintList()
            console.log(this.items)
        })
        return li
    },

    reprintList(){
        const ul = document.getElementById('itemList')
        ul.innerHTML = ""

        this.items.forEach(function(element) {
            const listItem = this.renderListItem(element)
            this.list.appendChild(listItem)        
        }, this);

    },

    handleSubmit(ev){
        
        const f = ev.target
        const item = {
            id: ++this.max,
            name: f.itemName.value,
            fav: false,
        }

        this.items.unshift(item)

        const listItem = this.renderListItem(item)
        this.list.insertBefore(listItem, this.list.firstChild)
        f.reset()
    },
}

app.init({
    formSelector: '#itemForm',
    listSelector: '#itemList',
    templateSelector: '.item.template',
})