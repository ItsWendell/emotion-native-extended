import React from 'react';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export const IconProvider = (): JSX.Element => (
  <>
    <IconRegistry icons={EvaIconsPack} />
  </>
);
