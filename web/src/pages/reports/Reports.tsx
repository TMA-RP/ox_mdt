import React from 'react';
import { Box, Button, createStyles, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { IconFileImport, IconReceipt, IconSearch } from '@tabler/icons-react';
import ReportsList from './components/ReportsList';
import ActiveReport from './components/ActiveReport';
import OfficersInvolved from './components/OfficersInvolved';
import ReportEvidence from './components/ReportEvidence';
import ReportCriminals from './components/ReportCriminals';
import BaseCard from './components/BaseCard';
import { useActiveReport, useIsReportActive } from '../../state';
import { modals } from '@mantine/modals';
import CreateReportModal from './components/modals/CreateReportModal';

const useStyles = createStyles((theme) => ({
  container: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: theme.colors.durple[6],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));

const Reports: React.FC = () => {
  const { classes } = useStyles();
  const isReportActive = useIsReportActive();

  return (
    <SimpleGrid h="100%" cols={3} sx={{ overflow: 'hidden' }}>
      <Stack className={classes.container} p="md">
        <Group position="apart">
          <Text size="xl">Reports</Text>
          <IconReceipt />
        </Group>
        <TextInput icon={<IconSearch size={20} />} placeholder="Search anything..." />
        <Box>
          <Button
            fullWidth
            variant="light"
            leftIcon={<IconFileImport size={20} />}
            onClick={() => modals.open({ title: 'Create report', size: 'sm', children: <CreateReportModal /> })}
          >
            Create report
          </Button>
        </Box>
        <ReportsList />
      </Stack>
      {isReportActive && (
        <>
          <Box sx={{ overflowY: 'scroll' }}>
            <Stack>
              <BaseCard h={500}>
                <ActiveReport />
              </BaseCard>
              <BaseCard>
                <OfficersInvolved />
              </BaseCard>
              <BaseCard>
                <ReportEvidence />
              </BaseCard>
            </Stack>
          </Box>
          <ReportCriminals />
        </>
      )}
    </SimpleGrid>
  );
};

export default Reports;
