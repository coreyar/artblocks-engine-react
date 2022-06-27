import useProjects from 'hooks/useProjects';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';
import { Project } from 'utils/types';
import { useWindowSize } from 'hooks/useWindowSize';
import useTheme from '@mui/material/styles/useTheme';
import ProjectSummary from './ProjectSummary';
import Loading from './Loading';

interface Props {
  skip?: number;
  first?: number;
}

const ProjectList = ({
  skip=0,
  first=8
}: Props) => {
  const { loading, error, data } = useProjects({ skip, first });
  const size = useWindowSize();
  const theme = useTheme();

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading projects
      </Alert>
    )
  }

  let width = 280;
  const maxColumns = 2;
  if (size && !isNaN(size.width)) {
    width = size.width > theme.breakpoints.values.md
      ? (Math.min(size.width, 1200)- 96)*1/maxColumns
        : size.width > theme.breakpoints.values.sm
          ? size.width - 64
          : size.width - 48
  }

  return (
    <Box>
      <Typography variant="h4" p="0 1rem">
        All Projects
      </Typography>
      <Masonry columns={[1, 1, 2]} spacing={3} sx={{ margin: '32px 0 48px' }}>
        {
          data?.projects && (
            data.projects.map((project: Project) => (
              <ProjectSummary
                key={project.id}
                project={project}
                width={width}
                showDescription
                showMoreLink
              />
            ))
          )
        }
      </Masonry>
    </Box>
  )
}

export default ProjectList;
