export function formatTitle(currentCell) {
  currentCell.render = (h, obj) => {
    const [_row, _column] = [obj.row, obj.column]

    return h('span', {
      domProps: {
        innerHTML: _row[_column['property']],
      },
    })
  }
}

export function formatTitleColor(currentCell) {
  currentCell.render = (h, obj) => {
    const [_row, _column] = [obj.row, obj.column]
    let _color = ''
    switch (_row[_column['property']]['color']) {
      case 'red':
        _color = 'color:#E50000'
        break
      case 'green':
        _color = 'color:#00D675'
        break
      default:
        _color = 'color:#333'
        break
    }

    return h('span', {
      domProps: {
        innerHTML: _row[_column['property']]['value'],
      },
      attrs: {
        style: _color,
      },
    })
  }
}

export function formatLink(currentCell) {
  currentCell.render = (h, obj) => {
    const [_row, _column] = [obj.row, obj.column]
    return h('a', {
      domProps: {
        innerHTML: _row[_column['property']]['value'],
      },
      attrs: {
        style: 'color:#42C0FB;cursor:pointer',
        href: _row[_column['property']]['url'],
        target: '_blank',
      },
    })
  }
}
