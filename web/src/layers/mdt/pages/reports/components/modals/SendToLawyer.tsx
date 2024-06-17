import React from 'react';
import { Button, Stack, Select } from '@mantine/core';
import { useReportId } from '../../../../../../state';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { modals } from '@mantine/modals';

interface Lawyer {
    label: string;
    value: string;
}

interface DbLawyer {
    charId: string;
    firstName: string;
    lastName: string;
}

const SendToLawyer: React.FC = () => {
    const id = useReportId();
    const [isLoading, setIsLoading] = React.useState(false);
    const [lawyers, setLawyers] = React.useState<Lawyer[]>([]);
    const [value, setValue] = React.useState<string | null>('');
    const loadLawyers = async () => {
        setIsLoading(true);
        const resp: DbLawyer[] = await fetchNui('getLawyers');
        if (!resp) setLawyers([]);
        const lawyersFormated: Lawyer[] = [];
        resp.forEach((data) => {
            lawyersFormated.push({
                label: `${data.firstName} ${data.lastName}`,
                value: data.charId,
            });
        });
        setLawyers(lawyersFormated);
        setIsLoading(false);
    };

    React.useEffect(() => {
        loadLawyers();
    }, []);

    const submitForm = async () => {
        if (!value || value === "") return;
        setIsLoading(true);
        await fetchNui('sendToLawyer', { charId: value, reportId: id });
        setIsLoading(false);
        modals.closeAll();
    };

    return (
        <form>
            <Stack>
                {lawyers.length === 0 ? "Aucun avocat disponible" : (
                    <Select
                        label="Liste des avocats"
                        placeholder="Choisissez un avocat"
                        data={lawyers}
                        value={value}
                        onChange={setValue}
                    />
                )}
                <Button disabled={lawyers.length === 0 || !value || value === ""} fullWidth variant="light" loading={isLoading} onClick={submitForm}>
                    Envoyer
                </Button>
            </Stack>
        </form>
    );
};

export default SendToLawyer;
