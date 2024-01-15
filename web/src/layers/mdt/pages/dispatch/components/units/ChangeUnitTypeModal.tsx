import React from 'react';
import { Button, Select, Stack } from '@mantine/core';
import { UnitType } from '../../../../../../typings';
import locales from '../../../../../../locales';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { modals } from '@mantine/modals';

interface Props {
  id: number;
  initialValue: string;
}

const ChangeUnitTypeModal: React.FC<Props> = ({ id, initialValue }) => {
  const [value, setValue] = React.useState<string>(initialValue);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await fetchNui('setUnitType', { id, value }, { data: true });
    setIsLoading(false);
    modals.closeAll();
  };

  return (
    <Stack>
      <Select
        value={value}
        onChange={(val: UnitType) => setValue(val)}
        label={locales.unit_vehicle_type}
        withinPortal
        defaultValue="lincoln"
        data={[
          { label: locales.lincoln, value: 'lincoln' },
          { label: locales.adam, value: 'adam' },
          { label: locales.tango, value: 'tango' },
          { label: locales.motor, value: 'motor' },
          { label: locales.heli, value: 'heli' },
          { label: locales.boat, value: 'boat' },
        ]}
      />
      <Button variant="light" onClick={handleConfirm} loading={isLoading}>
        {locales.confirm}
      </Button>
    </Stack>
  );
};

export default ChangeUnitTypeModal;
