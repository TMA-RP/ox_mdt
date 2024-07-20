import React from 'react';
import { SimpleGrid, Stack } from '@mantine/core';
import ProfileField from './ProfileField';
import { IconCalendar, IconId, IconPhone, IconUser } from '@tabler/icons-react';
import { useProfileState } from '../../../../../../state';
import AvatarWrapper from './AvatarWrapper';
import Editor from '../../../../components/Editor';
import { fetchNui } from '../../../../../../utils/fetchNui';
import locales from '../../../../../../locales';
import dayjs from 'dayjs';

const Profile: React.FC = () => {
    const [profile, setProfile] = useProfileState();

    if (!profile) return <></>;

    return (
        <>
            <AvatarWrapper />
            <ProfileField icon={IconUser} label={locales.name} value={`${profile.firstName} ${profile.lastName}`} />
            <SimpleGrid cols={2} spacing={6}>
                <ProfileField icon={IconId} label={locales.state_id} value={profile.stateId} />
                <ProfileField
                    icon={IconCalendar}
                    label={locales.date_of_birth}
                    value={dayjs(profile.dob).format('DD/MM/YYYY')}
                />
                {profile.deleted &&
                    <ProfileField
                        icon={IconCalendar}
                        label="Date de décès"
                        value={dayjs(profile.deleted).format('DD/MM/YYYY')}
                    />
                }
            </SimpleGrid>
            <Stack spacing="xs" h="100%">
                <Editor
                    placeholder={locales.profile_notes_placeholder}
                    content={profile.notes}
                    permission="edit_profile_notes"
                    onSave={(value) =>
                        setProfile((prev) => {
                            if (!prev) return null;

                            fetchNui('saveProfileNotes', { stateId: prev.stateId, notes: value });

                            return { ...prev, notes: value };
                        })
                    }
                />
            </Stack>
        </>
    );
};

export default Profile;
