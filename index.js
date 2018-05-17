const app = {
    init(selectors){
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(input){
        const li = document.createElement('li')
        li.textContent = input.name
        return li
    },

    handleSubmit(ev){
        
        const f = ev.target
        const item = {
            id: ++this.max,
            name: f.itemName.value,
        }
        const listItem = this.renderListItem(item)
        this.list.appendChild(listItem)
        f.reset()
    },
}

app.init({
    formSelector: '#itemForm',
    listSelector: '#itemList',
})