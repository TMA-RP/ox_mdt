import React from 'react';
import { Button, Stack, Text } from '@mantine/core';
import SelectedChargeItem from './SelectedChargeItem';
import { useSelectedCharges, useSelectedChargesAtoms } from '../../../../../state';
import { IconReceiptOff } from '@tabler/icons-react';
import { PrimitiveAtom, useAtomValue, useSetAtom } from 'jotai';
import { Criminal } from '../../../../../state';
import ConfirmSelectedCharges from './ConfirmSelectedCharges';
import NotFound from '../../../../../components/NotFound';

const SelectedChargesList: React.FC<{ criminalAtom: PrimitiveAtom<Criminal> }> = ({ criminalAtom }) => {
  const selectedChargesAtoms = useSelectedChargesAtoms();

  return (
    <Stack justify="space-between" h="100%">
      <Stack spacing="xs" sx={{ flex: '1 1 0', overflowY: 'scroll' }}>
        {selectedChargesAtoms.length > 0 ? (
          <Stack spacing="xs">
            {selectedChargesAtoms.map((chargeAtom, index) => (
              <SelectedChargeItem key={chargeAtom.toString()} chargeAtom={chargeAtom} index={index} />
            ))}
          </Stack>
        ) : (
          <NotFound icon={IconReceiptOff} label="No selected charges" />
        )}
      </Stack>
      <ConfirmSelectedCharges criminalAtom={criminalAtom} />
    </Stack>
  );
};

export default SelectedChargesList;

export class SelectedCharge {}
