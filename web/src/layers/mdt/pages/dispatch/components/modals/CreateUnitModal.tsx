import React from 'react';
import { Button, Select, Stack } from '@mantine/core';
import { IconCar } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useSetCharacter } from '../../../../../../state';
import { UnitType } from '../../../../../../typings';
import { fetchNui } from '../../../../../../utils/fetchNui';
import locales from '../../../../../../locales';

const CreateUnitModal: React.FC = () => {
  const setCharacter = useSetCharacter();
  const [value, setValue] = React.useState<UnitType>('lincoln');

  const handleConfirm = async () => {
    modals.closeAll();
    const resp = await fetchNui<{ id: number; name: string }>('createUnit', value, {
      data: { id: 1, name: `Unit 1` },
    });
    setCharacter((prev) => ({ ...prev, unit: resp.id }));
  };

  return (
    <Stack>
      <Select
        value={value}
        onChange={(val: UnitType) => setValue(val)}
        label={locales.unit_vehicle_type}
        withinPortal
        icon={<IconCar size={20} />}
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
      <Button variant="light" onClick={handleConfirm}>
        {locales.confirm}
      </Button>
    </Stack>
  );
};

export default CreateUnitModal;
