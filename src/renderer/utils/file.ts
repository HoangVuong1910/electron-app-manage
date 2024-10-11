import { v4 as uuidv4 } from 'uuid';

export const generateRandomImageId = (
  extension: 'jpg' | 'png' = 'jpg',
): string => {
  const uuid = uuidv4();
  return `${uuid}.${extension}`;
};
