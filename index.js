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
        const li = this.template.cloneNode(true)
        li.classList.remove('template')
        li.dataset.id = input.id
        li.querySelector('.itemName').textContent = input.name
        return li
    },

    handleSubmit(ev){
        
        const f = ev.target
        const item = {
            id: ++this.max,
            name: f.itemName.value,
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