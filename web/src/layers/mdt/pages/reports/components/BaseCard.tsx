import React from 'react';
import { createStyles, Stack } from '@mantine/core';

interface Props {
  children: React.ReactNode;
  h?: number;
  grow?: boolean;
}

const useSyles = createStyles((theme) => ({
  baseCard: {
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  grow: {
    flexGrow: 1,
    height: "100%"
  }
}));

const BaseCard: React.FC<Props> = ({ children, h, grow }) => {
  const { classes, cx } = useSyles();

  return (
    <Stack className={cx(classes.baseCard, { [classes.grow]: grow })} p="md" h={h}>
      {children}
    </Stack>
  );
};

export default BaseCard;
