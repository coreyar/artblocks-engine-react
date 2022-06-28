import moment from 'moment';
import Box from '@mui/material/Box';
import useToken from 'hooks/useToken';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Loading from './Loading';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import { useWindowSize } from 'hooks/useWindowSize';
import TokenPreview from './TokenPreview';
import TokenTraits from './TokenTraits';

interface Props {
  id: string;
}

const TokenDetails = ({ id }: Props) => {
  const { loading, error, data } = useToken(id);
  const token = data?.token;
  const size = useWindowSize();
  const theme = useTheme();

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading token
      </Alert>
    )
  }

  const width = size.width > theme.breakpoints.values.md
    ? (Math.min(size.width, 1200)- 48)*0.666666
      : size.width > theme.breakpoints.values.sm
        ? size.width - 48
        : size.width - 32;

  let scriptJSON;
  try {
    scriptJSON = JSON.parse(token.project.scriptJSON);
  } catch (e) {
    console.log('Error parsing script JSON');
  }

  return token && (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
        <Link href="/" underline="hover" sx={{ color: '#666' }}>
          Home
        </Link>
        <Link href="/" underline="hover" sx={{ color: '#666' }}>
          { token.project.name }
        </Link>
        <Typography>
          #{ token.invocation }
        </Typography>
      </Breadcrumbs>
      
      <Grid container spacing={2}>
        <Grid item md={8}>
          <TokenPreview
            id={token.id}
            tokenId={token.tokenId}
            projectId={token.project.id}
            owner={token.owner.id}
            width={width}
            aspectRatio={scriptJSON?.aspectRatio}
            showLiveViewLink
            showImageLink
          />
        </Grid>

        <div>uri: { token.uri }</div>

        <Grid item md={4}>
          <Typography fontSize="14px" mb={4}>
            Minted { moment.unix(token.createdAt).format('MMM DD, YYYY') }
          </Typography> 
          <Typography variant="h4">
            { token.project.name } #{ token.invocation }
          </Typography>
          <Typography variant="h6">
            { token.project.artistName }
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={6}>
          <TokenTraits tokenId={token.tokenId} />
        </Grid>

        <Grid item md={6}>
          Etherscan OpenSea
        </Grid>
      </Grid>
    </Box>
  )
}

export default TokenDetails;
