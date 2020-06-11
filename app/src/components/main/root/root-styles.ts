import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
  })
)

export default useStyles
