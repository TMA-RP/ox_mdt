import React from 'react';
import { useVisibilityState } from '../../state/visibility';
import { useSetCharacter } from '../../state';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { default as locales, setLocale } from '../../locales';
import { Character, Charge, CustomProfileData } from '../../typings';
import { fetchNui } from '../../utils/fetchNui';
import { AppShell, Box, createStyles, Transition } from '@mantine/core';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Profiles from './pages/profiles/Profiles';
import Reports from './pages/reports/Reports';
import Dispatch from './pages/dispatch/Dispatch';
import LoaderModal from './components/LoaderModal';
import { ModalsProvider } from '@mantine/modals';
import { useSetProfileCards } from '../../state/profiles/profileCards';
import { useSetCharges } from '../../state/charges';
import Roster from './pages/roster/Roster';
import dayjs from 'dayjs';
import Charges from './pages/charges/Charges';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    width: "150vh",
    height: "90vh",
    overflow: "hidden",
    borderRadius: "6.5vh",
    zIndex: 1,
  },
  body: {
    width: 'inherit',
    height: 'inherit',
    backgroundColor: theme.colors.durple[7],
    borderRadius: "6.5vh",
    border: "6vh solid black",
    '&::after': {
        content: '""',
        width: "100%",
        height: "200%",
        background: "linear-gradient(257deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "rotate(20deg)",
        pointerEvents: "none",
        zIndex: 1000,
    },
    '&::before': {
        content: '""',
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: "6.5vh",
        border: ".4vh solid rgb(78, 78, 78)",
        pointerEvents: "none",
    }
  },
  main: {
    padding: theme.spacing.xs,
  },
}));

const MDT: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useVisibilityState();
  const setCharacter = useSetCharacter();
  const setProfileCards = useSetProfileCards();
  const setCategoryCharges = useSetCharges();

  useNuiEvent(
    'setInitData',
    async (data: {
      locale: string;
      locales: typeof locales;
      profileCards: CustomProfileData[];
      charges: { [category: string]: Charge[] };
    }) => {
      setLocale(data.locales);
      setProfileCards(data.profileCards);
      setCategoryCharges(data.charges);
      await import(`../../../node_modules/dayjs/locale/${data.locale}.js`);
      dayjs.locale(data.locale);
    }
  );

  useNuiEvent('setVisible', (data?: Character) => {
    setVisible(!!data);
    data && setCharacter(data);
  });

  const handleESC = (e: KeyboardEvent) => {
    if (visible && e.key === 'Escape') {
      setVisible(false);
      fetchNui('hideMDT');
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleESC);

    return () => window.removeEventListener('keydown', handleESC);
  }, [visible]);

  return (
    <>
      <Box className={classes.container}>
        <Transition transition="slide-up" mounted={visible}>
          {(style) => (
            <AppShell
              style={style}
              navbar={<Navbar />}
              fixed={false}
              className="modal-container"
              classNames={{ root: classes.root, body: classes.body, main: classes.main }}
            >
              <ModalsProvider modalProps={{ target: '.modal-container' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/dispatch" element={<Dispatch />} />
                  <Route path="/charges" element={<Charges />} />
                  <Route path="/roster" element={<Roster />} />
                </Routes>
                <LoaderModal />
              </ModalsProvider>
            </AppShell>
          )}
        </Transition>
      </Box>
    </>
  );
};

export default MDT;
