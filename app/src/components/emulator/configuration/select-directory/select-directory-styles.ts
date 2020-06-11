import { makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: 'none',
    },
    directoryName: {
      width: '30em',
    },
  })
)

export default useStyles
