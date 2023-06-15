import { useDispatch, useSelector } from 'react-redux';
import { signInSelector } from '@redux/slices/auth/sign-in/sign-in.selector';
import { entityCreateActions } from '@redux/slices/entity/entity-create/entity-create.slice';
import {
  AttributeCreateRequest,
  EntityCreateRequest,
  PathCreateRequest,
} from '@services/entity/entity.service.type';
import { Button } from '@mui/material';

const generateRandomTitle = () => {
  const words = [
    'Lorem',
    'Ipsum',
    'Dolor',
    'Sit',
    'Amet',
    'Consectetur',
    'Adipiscing',
    'Elit',
    'Sed',
    'Eiusmod',
    'Tempor',
    'Incididunt',
    'Labore',
    'Dolore',
    'Magna',
    'Aliqua',
  ];

  const numberOfWords = Math.floor(Math.random() * 3) + 2; // Randomly select 2 to 4 words
  let title = '';

  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    title += word + ' ';
  }

  return title;
};

export const GenerateManyEntities = () => {
  const dispatch = useDispatch();
  const organization = useSelector(signInSelector.user)?.organization || '';
  const randomTitle = generateRandomTitle();

  let tuneValue = Math.floor(100000 + Math.random() * 900000); // Generates a random 6 digit number
  let noteValue =
    Math.random() < 0.5
      ? Math.floor(1000000 + Math.random() * 9000000)
      : Math.floor(10000000 + Math.random() * 90000000); // Generates a random 7 or 8 digit number

  const generateExample = () => {
    for (let i = 0; i < 10; i++) {
      const entityCreate = new EntityCreateRequest();

      if (i % 2) {
        entityCreate.type = 'TUNE';
        entityCreate.melodyId = '/A/' + tuneValue++;
      } else {
        entityCreate.type = 'NOTE';
        entityCreate.melodyId = '/B/' + noteValue++;
      }

      entityCreate.organization = organization;
      entityCreate.title = `${randomTitle} ${i + 1}`;

      const attribute = new AttributeCreateRequest();
      attribute.mainSound = '/';
      attribute.paths = new Array<PathCreateRequest>();

      const path = new PathCreateRequest();
      path.soundType = `Sound ${i + 1}`;
      path.audioPath = `Audio ${i + 1}`;
      path.experimentName = `Experiment ${i + 1}`;
      path.chordType = `Chord ${i + 1}`;
      path.description = `Experimental Sound ${i + 1}`;
      path.isDefault = true;
      attribute.paths.push(path);
      entityCreate.attributes.push(attribute);

      const entityCreateAction = entityCreateActions.createEntity(
        entityCreate // Pass the entityCreate object directly as the payload
      );

      dispatch(entityCreateAction);
      dispatch(entityCreateActions.resetEntityCreateState());
    }
  };

  return (
    <Button
      sx={{ m: 1, height: 50, width: 280 }}
      variant="outlined"
      onClick={generateExample}
    >
      Generate 10 Examples
    </Button>
  );
};
