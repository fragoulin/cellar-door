import { makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
  })
)

export default useStyles
