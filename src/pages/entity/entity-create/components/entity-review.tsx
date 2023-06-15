import { Typography } from '@mui/material';

function EntityReview(props: any) {
  const { values } = props;

  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          marginBottom: '1.5em',
          fontSize: '0.9em',
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}
      >
        Melody Entity Create Request
      </Typography>
      {Object.entries(values).map(([key, value]) => (
        <Typography
          key={key}
          gutterBottom
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            marginBottom: '1.5em',
          }}
        >
          {`${key}: ${value}`}
        </Typography>
      ))}
    </div>
  );
}
export default EntityReview;
