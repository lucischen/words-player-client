import React from 'react'
import list from "../books/list"

const template = list.book_list.map((v, k) => {
    return (
        <option key={k} value={k}>{v}</option>
    )
})

export default class Select extends React.Component {
    constructor() {
        super()

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.onChange(event.target.value)
    }

    render() {
        const { selectValue } = this.props

        return (
            <select value={selectValue} onChange={this.handleChange}>
                {template}
            </select>
        )
    }

}