export default {
  functional: true,
  props: {
    index: Number,
    row: Object,
    column: {
      type: Object,
      default: null,
    },
    render: Function,
  },
  render: (h, ctx) => {
    let params = {
      row: ctx.props.row,
      index: ctx.props.index,
    }
    if (ctx.props.column) params.column = ctx.props.column
    if (ctx.props.render) return ctx.props.render(h, params)
  },
}
